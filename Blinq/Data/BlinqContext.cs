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
        private readonly BlinqContext _context;

        public BlinqContext (BlinqContext context, DbContextOptions<BlinqContext> options)
            : base(options)
        {
            _context = context;
        }

        public DbSet<UserProcess> UserProcess { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MonitoringData> MonitoringData {get;set;}
        public DbSet<Reservation> Reservation {get;set;}
    }
}
