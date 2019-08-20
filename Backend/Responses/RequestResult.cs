using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Responses
{
    public class RequestResult : JsonResult
    {
        private readonly HttpStatusCode _statusCode;

        public RequestResult(object json, HttpStatusCode statusCode) : base(json)
        {
            _statusCode = statusCode;
        }

        public override void ExecuteResult(ActionContext context)
        {
            context.HttpContext.Response.StatusCode = (int)_statusCode;
            base.ExecuteResult(context);
        }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            context.HttpContext.Response.StatusCode = (int)_statusCode;
            return base.ExecuteResultAsync(context);
        }
    }

    public class BadRequestResult : RequestResult
    {
        public BadRequestResult(string message)
            : base(new StatusResponse { Status = (int)HttpStatusCode.BadRequest, Message = message }, HttpStatusCode.BadRequest)
        {
        }
    }

    public class OkResult : RequestResult
    {
        public OkResult(string message)
            : base(new StatusResponse { Status = (int)HttpStatusCode.OK, Message = message }, HttpStatusCode.OK)
        {
        }
    }
}
