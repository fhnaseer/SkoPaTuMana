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
                return new JsonErrorResponse("Invalid data,", System.Net.HttpStatusCode.BadRequest);

            using (var context = new SkoPaTuManaContext())
            {
                if (UserExists(userCredentials, context))
                    return new JsonErrorResponse("User already registered,", System.Net.HttpStatusCode.BadRequest);

                context.Users.Add(new Users { Username = userCredentials.Username, Password = userCredentials.Password });
                context.SaveChanges();

                return new JsonOkResponse("User created,");
            }
        }

        private static bool UserExists(UserCredentials userCredentials, SkoPaTuManaContext context)
        {
            return context.Users.Any(u => u.Username == userCredentials.Username);
        }
    }
}