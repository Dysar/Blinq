using Microsoft.AspNetCore.Identity;

namespace Blinq.Infrastructure.Data.Identity
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}