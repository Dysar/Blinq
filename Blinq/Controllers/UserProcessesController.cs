using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blinq.Data;
using Blinq.Model;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProcessesController : ControllerBase
    {
        private readonly BlinqContext _context;

        public UserProcessesController(BlinqContext context)
        {
            _context = context;

            //Artyom, this will cause exception. I guess because if dbSet is empty it does not guarantee your 
            //InMemoryDatabase does not have the records. But the Id has to be unique. And it throws exception.
            
            if (_context.UserProcess.Any()) return;
            _context.UserProcess.Add(new UserProcess {Id = 1, Name = "YoTube", WastedTime = 50});
            _context.UserProcess.Add(new UserProcess {Id = 2, Name = "Facebuk", WastedTime = 40});
            _context.UserProcess.Add(new UserProcess {Id = 3, Name = "Other", WastedTime = 10});
            _context.SaveChanges();
        }

        // GET: api/UserProcesses
        [HttpGet]
        public IEnumerable<UserProcess> GetUserProcess()
        {
            return _context.UserProcess;
        }

        // GET: api/UserProcesses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserProcess([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userProcess = await _context.UserProcess.FindAsync(id);

            if (userProcess == null)
            {
                return NotFound();
            }

            return Ok(userProcess);
        }

        // PUT: api/UserProcesses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserProcess([FromRoute] int id, [FromBody] UserProcess userProcess)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userProcess.Id)
            {
                return BadRequest();
            }

            _context.Entry(userProcess).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserProcessExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserProcesses
        [HttpPost]
        public async Task<IActionResult> PostUserProcess([FromBody] UserProcess userProcess)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.UserProcess.Add(userProcess);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserProcess", new { id = userProcess.Id }, userProcess);
        }

        // DELETE: api/UserProcesses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserProcess([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userProcess = await _context.UserProcess.FindAsync(id);
            if (userProcess == null)
            {
                return NotFound();
            }

            _context.UserProcess.Remove(userProcess);
            await _context.SaveChangesAsync();

            return Ok(userProcess);
        }

        private bool UserProcessExists(int id)
        {
            return _context.UserProcess.Any(e => e.Id == id);
        }
    }
}