using System;

namespace Blinq.Model {
public class Reservation {
        public string Id {get;set;}
        public ReservationStatus Status {get;set;}
        public string SeatNo {get;set;}
        public DateTime ExpireTime {get;set;}
    }

}