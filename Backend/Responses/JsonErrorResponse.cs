using System.Net;

namespace Backend.Responses
{
    public class JsonErrorResponse : JsonResponse
    {
        public JsonErrorResponse(string message) : base(new { message })
        {
        }

        public JsonErrorResponse(string message, HttpStatusCode statusCode) : base(new { message }, statusCode)
        {
        }
    }
}
