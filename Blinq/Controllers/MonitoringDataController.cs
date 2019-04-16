using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blinq.Model;
using Blinq.Data;
using Blinq.Services;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    public class MonitoringDataController : Controller
    {
        private readonly BlinqContext _context;

        public MonitoringDataController(BlinqContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MonitoringData>> get()
        {
            return Json(_context.MonitoringData);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MonitoringInput input) 
        {
            if (!ModelState.IsValid || input.Email == null)
            {
                return BadRequest(ModelState);
            }

            // var data = new MonitoringData
            // {
            //     Time = input.Time.ToString(), Email = input.Email, Title = input.Title, URL = input.URL, Id = Guid.NewGuid().ToString()
            // };

            //call monitoring data processor
            var processedData = MonitoringDataProcessor.ProcessRawData(input);
            
            if (processedData.Item1 != null){
                _context.MonitoringData.Add(processedData.Item1);
                await _context.SaveChangesAsync();
                return Json(processedData.Item1);
            }

            return Json(processedData.Item2);
        }
    }
}

