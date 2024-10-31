using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LightInject;
using Soft.Generator.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Soft.Generator.Shared.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using Soft.Generator.Shared.Terms;
using Soft.Generator.Shared.SoftExceptions;
using System.Data.SqlClient;
using FluentValidation;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Extensions;
using Playerty.Loyals.WebAPI.DI;
using Playerty.Loyals.Infrastructure;
using System.Reflection;
using Playerty.Loyals.Business.Entities;
using Soft.Generator.Security.Interface;
using Playerty.Loyals.Business.DataMappers;
using System.ComponentModel;
using Microsoft.Extensions.Azure;
using Azure.Identity;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

public class Startup
{
    public static string _jsonConfigurationFile = "appsettings.json";
    private readonly IHostEnvironment _hostEnvironment;

    public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment)
    {
        Configuration = configuration;
        _hostEnvironment = hostEnvironment;

        if (_hostEnvironment.IsStaging())
            _jsonConfigurationFile = "appsettings.Staging.json";
        else if (_hostEnvironment.IsProduction())
            _jsonConfigurationFile = "appsettings.Production.json";

        Playerty.Loyals.WebAPI.SettingsProvider.Current = ReadAssemblyConfiguration<Playerty.Loyals.WebAPI.Settings>();
        Playerty.Loyals.Business.SettingsProvider.Current = ReadAssemblyConfiguration<Playerty.Loyals.Business.Settings>();
        Soft.Generator.Infrastructure.SettingsProvider.Current = ReadAssemblyConfiguration<Soft.Generator.Infrastructure.Settings>();
        Soft.Generator.Security.SettingsProvider.Current = ReadAssemblyConfiguration<Soft.Generator.Security.Settings>();
        Soft.Generator.Shared.SettingsProvider.Current = ReadAssemblyConfiguration<Soft.Generator.Shared.Settings>();
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMemoryCache();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Playerty.Loyals.WebAPI.SettingsProvider.Current.JwtIssuer,
                    ValidAudience = Playerty.Loyals.WebAPI.SettingsProvider.Current.JwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Playerty.Loyals.WebAPI.SettingsProvider.Current.JwtKey)),
                    ClockSkew = TimeSpan.FromMinutes(Playerty.Loyals.WebAPI.SettingsProvider.Current.ClockSkewMinutes),
                };
            });
        services.AddAuthorization();

        services.AddHttpContextAccessor();
        services.AddCors();

        services.Configure<RequestLocalizationOptions>(options => // FT: It's mandatory to be before AddControllers
        {
            CultureInfo[] supportedCultures = new[]
            {
                new CultureInfo("sr-Latn-RS")
            };

            options.DefaultRequestCulture = new RequestCulture("sr-Latn-RS");
            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
        });

        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
            options.JsonSerializerOptions.Converters.Add(new JsonDateTimeConverter());
        });

        services.AddDbContext<IApplicationDbContext, PLApplicationDbContext>( // https://youtu.be/bN57EDYD6M0?si=CVztRqlj0hBSrFXb
            options =>
            {
                options
                    .UseLazyLoadingProxies()
                    .UseSqlServer(Playerty.Loyals.WebAPI.SettingsProvider.Current.ConnectionString);
                    //.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
            });

        services.AddAzureClients(clientBuilder =>
        {
            clientBuilder.AddBlobServiceClient(Playerty.Loyals.WebAPI.SettingsProvider.Current.BlobStorageConnectionString);

            clientBuilder.AddClient<BlobContainerClient, BlobClientOptions>((options, provider) => // https://stackoverflow.com/questions/78430531/registering-blobcontainerclient-and-injecting-into-isolated-function
            {
                string storageContainerName = Playerty.Loyals.WebAPI.SettingsProvider.Current.BlobStorageContainerName;

                BlobServiceClient blobServiceClient = provider.GetRequiredService<BlobServiceClient>();
                
                BlobContainerClient blobContainerClient = blobServiceClient.GetBlobContainerClient(storageContainerName);

                return blobContainerClient;
            });
        });

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Playerty.Loyals.WebAPI",
                Version = "v1"
            });
        });
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        // Register container (AntiPattern)
        container.RegisterInstance(typeof(IServiceContainer), container);

        // Init WebAPI
        container.RegisterFrom<CompositionRoot>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //app . nesto su sve middleware-i

        if (env.IsDevelopment())
        {
            GenerateAngularCode();
            app.UseDeveloperExceptionPage();
        }

        RequestLocalizationOptions localizationOptions = app.ApplicationServices
            .GetRequiredService<IOptions<RequestLocalizationOptions>>().Value;

        app.UseRequestLocalization(localizationOptions);

        // Allow CORS to connect with the Angular frontend
        app.UseCors(builder =>
        {
            builder.WithOrigins(new[] { Playerty.Loyals.WebAPI.SettingsProvider.Current.FrontendUrl })
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition"); // da bi znao kako da parsiram naziv Excel fajla na frontu
            //.AllowCredentials();//if we don't send this frontend will not get our jwt token
        });

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
        });

        if (env.IsProduction())
        {
            app.UseHttpsRedirection();
        }
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                context.Response.ContentType = "application/json";

                IExceptionHandlerFeature contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                if (contextFeature != null)
                {
                    // TODO FT: log here
                    Guid guid = Guid.NewGuid();
                    Exception exception = contextFeature.Error;
                    string exceptionString = "";

                    if (env.IsDevelopment())
                        exceptionString = exception.ToString();

                    string message;
                    if (exception is BusinessException bussinessEx)
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        message = bussinessEx.Message;
                    }
                    else if (exception is UnauthorizedException unauthorizedEx)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        message = unauthorizedEx.Message;
                    }
                    else if (exception is SecurityTokenException securityTokenEx)
                    {
                        context.Response.StatusCode = StatusCodes.Status419AuthenticationTimeout;
                        message = securityTokenEx.Message;
                    }
                    else if (exception is ExpiredVerificationException expiredVerificationEx)
                    {
                        context.Response.StatusCode = StatusCodes.Status419AuthenticationTimeout;
                        message = expiredVerificationEx.Message;
                    }
                    else if (exception is SqlException sqlEx && sqlEx.Number == 2627)
                    {
                        message = sqlEx.Message;
                    }
                    else if (exception is ValidationException fluentEx)
                    {
                        message = fluentEx.Message;
                    }
                    else
                    {
                        message = $"{SharedTerms.GlobalError} {guid}";
                    }

                    await context.Response.WriteAsJsonAsync(new
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = message,
                        Exception = exceptionString
                    });
                }
            });
        });
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Hello from C# backend!");
            });
        });
    }

    public static T ReadAssemblyConfiguration<T>()
    {
        string name = typeof(T).Assembly.GetName().Name;
        string propertyName = "AppSettings";
        string text = ReadConfigFile();
        if (string.IsNullOrEmpty(text))
        {
            return default(T);
        }

        foreach (JProperty item in JObject.Parse(text)[propertyName]!.Children().OfType<JProperty>())
        {
            if (item.Name == name)
            {
                return item.Value.ToObject<T>();
            }
        }

        return default(T);
    }

    private static string ReadConfigFile()
    {
        using StreamReader streamReader = new StreamReader(_jsonConfigurationFile);
        return streamReader.ReadToEnd();
    }

    #region Angular

    /// <summary>
    /// This method generates only two methods, which combine individual methods for validation and for translates, because the source generator generates a new file for each project in .NET
    /// </summary>
    private static void GenerateAngularCode()
    {
        string baseServicePath = @"E:\Projects\Playerty.Loyals\Angular\src\app\business\services";
        List<string> translationProjectNames = new List<string> { "Business", "Security" };
        List<string> validationProjectNames = new List<string> { "Business", "Security" };
        GenerateMergeMethodForTranslates(baseServicePath, translationProjectNames);
        GenerateMergeMethodForValidation(baseServicePath, validationProjectNames);
        //AppendImportsForTheController(); // FT: Got it work with source generator but this code is valuable if we switch to the reflection
    }

    private static void GenerateMergeMethodForTranslates(string baseServicePath, List<string> projectNames)
    {
        if (baseServicePath == null) return;

        List<string> dataClassNamesHelper = new List<string>();
        List<string> servicesClassNamesHelper = new List<string>();
        List<string> importClassNamesHelper = new List<string>();

        List<string> dataLabelsHelper = new List<string>();
        List<string> servicesLabelsHelper = new List<string>();
        List<string> importLabelsHelper = new List<string>();

        foreach (string projectName in projectNames)
        {
            importClassNamesHelper.Add($$"""
import { TranslateClassNames{{projectName}}Service } from './generated/{{projectName.FromPascalToKebabCase()}}-class-names.generated';
""");
            servicesClassNamesHelper.Add($$"""
        private translateClassNames{{projectName}}Service: TranslateClassNames{{projectName}}Service
""");
            dataClassNamesHelper.Add($$"""
        result = this.translateClassNames{{projectName}}Service.translate(name);
        if (result != null)
            return result;
""");

            importLabelsHelper.Add($$"""
import { TranslateLabels{{projectName}}Service } from './generated/{{projectName.FromPascalToKebabCase()}}-labels.generated';
""");
            servicesLabelsHelper.Add($$"""
        private translateLabels{{projectName}}Service: TranslateLabels{{projectName}}Service
""");
            dataLabelsHelper.Add($$"""
        result = this.translateLabels{{projectName}}Service.translate(name);
        if (result != null)
            return result;
""");

        }

        string classNamesData = $$"""
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
{{string.Join("\n", importClassNamesHelper)}}

@Injectable({
    providedIn: 'root',
})
export class TranslateClassNamesService {

    constructor(
{{string.Join(",\n", servicesClassNamesHelper)}}
    ) {
    }

    translate(name: string){
        let result = null;

{{string.Join("\n\n", dataClassNamesHelper)}}

        return name;
    }
}
""";

        string labelsData = $$"""
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
{{string.Join("\n", importLabelsHelper)}}

@Injectable({
    providedIn: 'root',
})
export class TranslateLabelsService {

    constructor(
{{string.Join(",\n", servicesLabelsHelper)}}
    ) {
    }

    translate(name: string){
        let result = null;

{{string.Join("\n\n", dataLabelsHelper)}}

        return name;
    }
}
""";

        Helper.WriteToTheFile(classNamesData, $"{baseServicePath}\\translates\\translated-class-names.generated.ts");
        Helper.WriteToTheFile(labelsData, $"{baseServicePath}\\translates\\translated-labels.generated.ts");
    }

    private static void GenerateMergeMethodForValidation(string baseServicePath, List<string> projectNames)
    {
        if (baseServicePath == null) return;

        List<string> dataHelper = new List<string>();
        List<string> importHelper = new List<string>();
        List<string> servicesValidatorHelper = new List<string>();

        foreach (string projectName in projectNames)
        {
            importHelper.Add($$"""
import { Validator{{projectName}}Service } from './generated/{{projectName.FromPascalToKebabCase()}}-validation-rules.generated';
""");
            servicesValidatorHelper.Add($$"""
        protected validator{{projectName}}Service: Validator{{projectName}}Service
""");
            dataHelper.Add($$"""
        result = this.validator{{projectName}}Service.getValidator(formControl, className);
        if (result != null)
            return result;
""");
        }

        string data = $$"""
import { SoftFormControl, SoftValidatorFn } from 'src/app/core/components/soft-form-control/soft-form-control';
import { Injectable } from "@angular/core";
{{string.Join("\n", importHelper)}}

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
{{string.Join(",\n", servicesValidatorHelper)}}
    ) {
    }

    getValidator(formControl: SoftFormControl, className: string): SoftValidatorFn {
        let result: SoftValidatorFn = null;

{{string.Join("\n\n", dataHelper)}}

        return result;
    }
}
""";
        Helper.WriteToTheFile(data, $"{baseServicePath}\\validation\\validation-rules.generated.ts");
    }

    private static void AppendImportsForTheController()
    {
        var assembly = Assembly.GetExecutingAssembly();

        // Find all DTO types in the assembly
        HashSet<Type> dtoTypes = FindAllDtoTypesInSolution(assembly);
        List<string> importLines = new List<string>(); 
        foreach (Type dtoType in dtoTypes)
        {
            string[] splitHelper = dtoType.Namespace.Split('.');
            string projectName = splitHelper[splitHelper.Length - 2];
            string ngType = dtoType.Name.Replace("DTO", "");

            if (projectName == "Business")
            {
                importLines.Add($"import {{ {ngType} }} from '../../entities/generated/{projectName.FromPascalToKebabCase()}-entities.generated';");
            }
        }

        string apiPath = @"E:\Projects\Playerty.Loyals\Angular\src\app\business\services\api\api.service.generated.ts";

        string[] lines = File.ReadAllLines(apiPath);
        File.WriteAllLines(apiPath, new string[] { string.Join("\n", importLines) }.Concat(lines));
    }

    public static HashSet<Type> FindAllDtoTypesInSolution(Assembly rootAssembly)
    {
        var visitedAssemblies = new HashSet<Assembly>();
        var dtoTypes = new HashSet<Type>();

        // Recursively search through all referenced assemblies
        FindAllDtoTypesInAssemblies(rootAssembly, visitedAssemblies, dtoTypes);

        return dtoTypes;
    }

    private static void FindAllDtoTypesInAssemblies(Assembly assembly, HashSet<Assembly> visitedAssemblies, HashSet<Type> dtoTypes)
    {
        if (visitedAssemblies.Contains(assembly)) return;

        visitedAssemblies.Add(assembly);

        // Process the current assembly for DTOs
        foreach (var type in assembly.GetTypes())
        {
            if (IsDtoType(type) && !dtoTypes.Contains(type))
            {
                dtoTypes.Add(type);
                FindDtoReferences(type, dtoTypes);
            }
        }

        // Recursively process all referenced assemblies
        foreach (var referencedAssemblyName in assembly.GetReferencedAssemblies())
        {
            try
            {
                var referencedAssembly = Assembly.Load(referencedAssemblyName);
                FindAllDtoTypesInAssemblies(referencedAssembly, visitedAssemblies, dtoTypes);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Could not load assembly: {referencedAssemblyName.FullName}. Error: {ex.Message}");
            }
        }
    }

    private static void FindDtoReferences(Type type, HashSet<Type> dtoTypes)
    {
        var properties = type.GetProperties();
        var fields = type.GetFields();

        foreach (var property in properties)
        {
            var propertyType = property.PropertyType;
            if (IsDtoType(propertyType) && !dtoTypes.Contains(propertyType))
            {
                dtoTypes.Add(propertyType);
                FindDtoReferences(propertyType, dtoTypes); // Recursion for nested DTOs
            }
        }

        foreach (var field in fields)
        {
            var fieldType = field.FieldType;
            if (IsDtoType(fieldType) && !dtoTypes.Contains(fieldType))
            {
                dtoTypes.Add(fieldType);
                FindDtoReferences(fieldType, dtoTypes); // Recursion for nested DTOs
            }
        }
    }

    private static bool IsDtoType(Type type)
    {
        // Example: You can customize this condition based on your DTO naming or base class
        return type.IsClass && type.Name.EndsWith("DTO");
    }

    #endregion
}
