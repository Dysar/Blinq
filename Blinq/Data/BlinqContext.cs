using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Blinq.Model;

namespace Blinq.Data
{
    public class BlinqContext : DbContext
    {
        public BlinqContext (DbContextOptions<BlinqContext> options)
            : base(options)
        {
        }

        public DbSet<UserProcess> UserProcess { get; set; }
        public DbSet<MonitoringData> MonitoringData {get;set;}
        public DbSet<Reservation> Reservation {get;set;}
    }
}
