using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Runtime.Serialization;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using Microsoft.AspNetCore.Http;
using Blinq.Model;
using Blinq.Data;

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
        public async Task<IActionResult> post([FromBody] MonitoringInput input) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var data = new MonitoringData{Email = input.Email, Title = input.Title, URL = input.URL};
            data.Id = Guid.NewGuid().ToString();
            _context.MonitoringData.Add(data);
            await _context.SaveChangesAsync();

            return Json(data);
        }

     
    }
}

