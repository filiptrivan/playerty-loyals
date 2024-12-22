using LightInject;
using Soft.Generator.Shared.Helpers;
using Soft.Generator.Shared.Extensions;
using Playerty.Loyals.WebAPI.DI;
using Playerty.Loyals.Infrastructure;
using Quartz;
using Playerty.Loyals.Business.BackroundJobs;

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

        Playerty.Loyals.WebAPI.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Playerty.Loyals.WebAPI.Settings>(_jsonConfigurationFile);
        Playerty.Loyals.Business.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Playerty.Loyals.Business.Settings>(_jsonConfigurationFile);
        Soft.Generator.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Infrastructure.Settings>(_jsonConfigurationFile);
        Soft.Generator.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Security.Settings>(_jsonConfigurationFile);
        Soft.Generator.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Soft.Generator.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SoftConfigureServices<PlayertyApplicationDbContext>();

        services.AddQuartz();

        services.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true; // FT: If the application is turning off while the job is running, it will not turn off till the job is done.
        });

        services.AddHostedService<UpdatePointsHostedService>();
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
        app.SoftConfigure(env);
    }
}
