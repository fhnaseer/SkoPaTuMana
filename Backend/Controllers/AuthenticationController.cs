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
        public IActionResult Register([FromBody] UserCredentials userCredentials)
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

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCredentials userCredentials)
        {
            if (userCredentials == null || string.IsNullOrWhiteSpace(userCredentials.Username) || string.IsNullOrWhiteSpace(userCredentials.Password))
                return new Responses.BadRequestResult("Invalid credentials,");

            using (var context = new SkoPaTuManaContext())
            {
                var user = GetUser(userCredentials, context);
                if (user == null)
                    return new Responses.BadRequestResult("User does not exist,");

                if (user.Password == userCredentials.Password)
                    return new Responses.OkResult("Login successful,");

                return new Responses.BadRequestResult("Wrong password,");
            }
        }

        private static bool UserExists(UserCredentials userCredentials, SkoPaTuManaContext context)
        {
            return context.Users.Any(u => u.Username == userCredentials.Username);
        }

        private static Users GetUser(UserCredentials userCredentials, SkoPaTuManaContext context)
        {
            return context.Users.FirstOrDefault(u => u.Username == userCredentials.Username);
        }
    }
}