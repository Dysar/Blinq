using System.Threading.Tasks;
using Blinq.Data;
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
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ApplicationDbContext _appDbContext;

        public AccountController(BlinqContext context, ApplicationDbContext appDbContext, UserManager<User> userManager, IEmailSender emailSender)
        {
            _context = context;
            _userManager = userManager;
            _emailSender = emailSender;
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var userIdentity = _mapper.Map<User>(model);
            //var result = await _userManager.CreateAsync(userIdentity);

            //if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            //await _appDbContext.Users.AddAsync(CreateNewUser());
            await _appDbContext.SaveChangesAsync();

            return new OkResult();
        }

        public User CreateNewUser()
        {
            return new User()
            {
                FirstName = "FirstName",
                LastName = "LastName",
                Email = "email@mail.com"
            };
        }


    }
}