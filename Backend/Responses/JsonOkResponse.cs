using System.Net;

namespace Backend.Responses
{
    public class JsonOkResponse : JsonResponse
    {
        public JsonOkResponse(string message) : base(new { message }, HttpStatusCode.OK)
        {
        }
    }
}
