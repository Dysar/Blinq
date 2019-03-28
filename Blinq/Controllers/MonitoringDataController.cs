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
            return _context.MonitoringDatas;
        }

        [HttpPost]
        public async Task<IActionResult> post([FromBody] MonitoringData md) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

             _context.MonitoringDatas.Add(md);
            await _context.SaveChangesAsync();

            return Json(md);
        }

     
    }
}

