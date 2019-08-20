using System.Linq;
using Backend.Models;
using Backend.Responses;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Post([FromBody] UserCredentials userCredentials)
        {
            if (userCredentials == null || string.IsNullOrWhiteSpace(userCredentials.Username) || string.IsNullOrWhiteSpace(userCredentials.Password))
                return new Responses.BadRequestResult("Invalid data,");

            using (var context = new SkoPaTuManaContext())
            {
                if (UserExists(userCredentials, context))
                    return new Responses.BadRequestResult("User already registered,");

                context.Users.Add(new Users { Username = userCredentials.Username, Password = userCredentials.Password });
                context.SaveChanges();

                return new Responses.OkResult("User created,");
            }
        }

        private static bool UserExists(UserCredentials userCredentials, SkoPaTuManaContext context)
        {
            return context.Users.Any(u => u.Username == userCredentials.Username);
        }
    }
}