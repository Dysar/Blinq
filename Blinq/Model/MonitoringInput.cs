using System.ComponentModel.DataAnnotations;

namespace Blinq.Model {
public class MonitoringInput {
        public double Time {get;set;}
        public string Email {get;set;}
        public string Title {get;set;}
        public string URL {get;set;}
        public string ScreenShotBase64 {get;set;}
    }

}