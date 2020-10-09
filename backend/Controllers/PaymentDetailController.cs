using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaymentDetail>>> GetPaymentDetails()
    {
      return await _context.PaymentDetails.ToListAsync();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPaymentDetail(int id, PaymentDetail paymentDetail)
    {
      if (id != paymentDetail.PMId)
        return BadRequest();

      _context.Entry(paymentDetail).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (PaymentDetailExists(id))
          return NotFound();
        else
          throw;
      }

      return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<PaymentDetail>> PostPaymentDetail(PaymentDetail paymentDetail)
    {
      _context.PaymentDetails.Add(paymentDetail);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetPaymentDetails", new { id = paymentDetail.PMId }, paymentDetail);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<PaymentDetail>> DeletePaymentDetail(int id)
    {
      PaymentDetail paymentDetail = await _context.PaymentDetails.FindAsync(id);

      if (paymentDetail == null)
        return NotFound();
      
      _context.PaymentDetails.Remove(paymentDetail);
      await _context.SaveChangesAsync();

      return paymentDetail;
    }

    private bool PaymentDetailExists(int id)
    {
      return _context.PaymentDetails.Any(e => e.PMId == id);
    }

  }
}