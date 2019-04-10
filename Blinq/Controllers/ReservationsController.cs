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
using Blinq.Services;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        private readonly BlinqContext _context;

        public ReservationController(BlinqContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Reservation>> Validate(int id)
        {
            if (_context.Reservation.Any()){
                 var result = _context.Reservation.Single(r => r.Id == id);

                if (result != null) {
                    return Json(result);
                }
            }

            return StatusCode(402);
        }

        [HttpPost]
        public async Task<ActionResult> Reserve([FromBody] ReservationInput input) {
        
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isBooked = ReservationIsBooked(input.SeatNo);
            if (isBooked.Item1) {
                return Json("This seat is booked");
            }


            int newId;

            try {
                newId = _context.Reservation.Max(x => x.Id) + 1;
            } catch (System.InvalidOperationException) {
                newId = 0;
            }


            var r = new Reservation{
                Id = newId,
                SeatNo = input.SeatNo,
                Status = ReservationStatus.reserved,
                ExpireTime = DateTime.Now.AddHours(3)
            };

            _context.Reservation.Add(r);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new {id = r.Id}, r);

                
                // bool exists = _context.Reservation
                //     .Any(res =>
                //     res.SeatNo == input.SeatNo
                // );

                // if (!exists){
                //     var reservation = new Reservation{
                //         Id = Guid.NewGuid().ToString(), 
                //         Status = input.Status, 
                //         SeatNo = input.SeatNo, 
                //         ExpireTime = UnixTimeStampToDateTime(input.ExpireTime)
                //     };
                
                //     _context.Reservation.Add(reservation);
                //     await _context.SaveChangesAsync();
                //     return Json(reservation);
                // }
            
        }
        private (bool, string) ReservationIsBooked(string seatNo) {
            
            if (!_context.Reservation.Any()){
                return (false,"there was nothing in reservatons");
            }

            bool exists =  _context.Reservation
                    .Any(res =>
                    res.SeatNo == seatNo
            );

            if (!exists) {
                return (false,"It does not exist in the table");
            }
            
            var reservation = _context.Reservation.SingleOrDefault(r => r.SeatNo == seatNo);
                
            if (reservation.Status == ReservationStatus.canceled) {
                return (false, "The status was canceled");
            }

            return (true,""); 
            
        }

        [HttpPut("Cancel/{id}")]
        public async Task<ActionResult> Cancel(int id) {

            if (_context.Reservation.Any()){
                 var result = _context.Reservation.Single(r => r.Id == id);

                if (result != null) {

                    if (result.Status == ReservationStatus.reserved) {
                        result.Status = ReservationStatus.canceled;
                        await _context.SaveChangesAsync();
                        return Json("Canceled " + result.SeatNo);
                    } else {
                        return Json("The status was not reserved. cannot cancel");
                    }
                }
            }

            return Json("Booking not found");
        }
        // [HttpPost]
        // public async Task<IActionResult> Post([FromBody] MonitoringInput input) 
        // {
        //     if (!ModelState.IsValid || input.Email == null)
        //     {
        //         return BadRequest(ModelState);
        //     }

        //     // var data = new Reservation
        //     // {
        //     //     Time = input.Time.ToString(), Email = input.Email, Title = input.Title, URL = input.URL, Id = Guid.NewGuid().ToString()
        //     // };

        //     //call monitoring data processor
        //     var processedData = Reservation
            
        //     if (processedData.Item1 != null){
        //         _context.Reservation.Add(processedData.Item1);
        //         await _context.SaveChangesAsync();
        //         return Json(processedData.Item1);
        //     }

        //     return Json(processedData.Item2);
            
        // }

        private static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {   
                // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970,1,1,0,0,0,0,System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds( unixTimeStamp ).ToLocalTime();
            return dtDateTime;
        }
    }
    
}

