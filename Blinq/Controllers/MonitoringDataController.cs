using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Blinq.Model;
using Blinq.Data;
using Blinq.Services;
using Microsoft.AspNetCore.Hosting;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    public class MonitoringDataController : Controller
    {
        private readonly BlinqContext _context;
        private IHostingEnvironment _env;

        public MonitoringDataController(BlinqContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
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
            var processedData = MonitoringDataProcessor.ProcessRawData(input, _env.WebRootPath);
            
            if (processedData.Item1 != null){
                _context.MonitoringData.Add(processedData.Item1);
                await _context.SaveChangesAsync();
                return Json(processedData.Item1);
            }

            return Json(processedData.Item2);
        }
    }
}

