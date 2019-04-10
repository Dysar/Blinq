using System;

namespace Blinq.Model {
public class ReservationInput {
        public ReservationStatus Status {get;set;}
        public string SeatNo {get;set;}
        public double ExpireTime {get;set;}
    }

}