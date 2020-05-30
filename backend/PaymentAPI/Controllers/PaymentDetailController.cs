using Microsoft.AspNetCore.Mvc;
using PaymentAPI.Models;

namespace PaymentAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PaymentDetailController : ControllerBase
  {
    private readonly PaymentDetailContext _context;

    public PaymentDetailController(PaymentDetailContext context)
    {
      _context = context;
    }
  }
}