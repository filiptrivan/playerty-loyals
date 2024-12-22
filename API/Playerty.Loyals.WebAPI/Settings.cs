namespace Playerty.Loyals.WebAPI
{
    public static class SettingsProvider
    {
        public static Settings Current { internal get; set; } = new Settings();
    }

    public class Settings
    {
        public string GoogleClientId { get; set; }

        public string ExcelContentType { get; set; }

    }
}