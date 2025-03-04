using LightInject;
using Spider.Shared.Helpers;
using Spider.Shared.Extensions;
using PlayertyLoyals.WebAPI.DI;
using PlayertyLoyals.Infrastructure;
using Quartz;
using PlayertyLoyals.Business.BackroundJobs;

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

        PlayertyLoyals.WebAPI.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<PlayertyLoyals.WebAPI.Settings>(_jsonConfigurationFile);
        PlayertyLoyals.Business.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<PlayertyLoyals.Business.Settings>(_jsonConfigurationFile);
        Spider.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Infrastructure.Settings>(_jsonConfigurationFile);
        Spider.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Security.Settings>(_jsonConfigurationFile);
        Spider.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spider.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SpiderConfigureServices<PlayertyApplicationDbContext>();

        //services.AddQuartz();

        //services.AddQuartzHostedService(options =>
        //{
        //    options.WaitForJobsToComplete = true; // FT: If the application is turning off while the job is running, it will not turn off till the job is done.
        //});

        //services.AddHostedService<UpdatePointsHostedService>(); // TBD
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        container.RegisterInstance(container);

        container.RegisterFrom<CompositionRoot>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.SpiderConfigure(env);

        app.UseEndpoints(endpoints =>
        {
            endpoints
                .MapControllers();
        });
    }
}
