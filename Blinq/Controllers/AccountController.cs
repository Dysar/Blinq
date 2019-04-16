using System.Threading.Tasks;
using Blinq.Data;
using Blinq.Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace Blinq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly BlinqContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailSender _emailSender;


        public AccountController(BlinqContext context, UserManager<AppUser> userManager, IEmailSender emailSender)
        {
            _context = context;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]AppUser model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var userIdentity = _mapper.Map<User>(model);
            //var result = await _userManager.CreateAsync(userIdentity);

            //if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            //await _appDbContext.Users.AddAsync(CreateNewUser());
            //await _appDbContext.SaveChangesAsync();

            return new OkResult();
        }

        public AppUser CreateNewUser()
        {
            return new AppUser()
            {
                Name = "FirstName",
                LastName = "LastName",
                Email = "email@mail.com"
            };
        }


    }
}