using Nucleus.Core.Util;

namespace Playerty.Loyals.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            LogUtils.InitLog4Net("log4net.config");

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseLightInject()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}