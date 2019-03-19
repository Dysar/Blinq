using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    public class MonitoringDatasController : Controller
    {

        private static List<MonitoringData> datas = new List<MonitoringData>
        {
            new MonitoringData{ OS = "MacOS", Computer = "Drake-PC", User = "Drake", Title = "The corner guy", 
            Executable = "Google Chrome", URL = "https://www.facebook.com"}
        
        };

        [HttpGet]
        public ActionResult<IEnumerable<MonitoringData>> MonitoringDatas()
        {
            datas.Add(new MonitoringData{ OS = "MacOS", Computer = "Drake-PC", User = "Drake", Title = "The corner guy", 
            Executable = "Google Chrome", URL = "https://www.facebook.com"});
            return datas;
        }

     
    }
    
    public class MonitoringData {
        public string OS {get;set;} 
        public string Computer {get;set;}
        public string User {get;set;}
        public string Title {get;set;}
        public string Executable {get;set;}
        public string URL {get;set;}
    }
}
