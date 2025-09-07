using e_commerce_api.Clases;
using e_commerce_api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenesController : ControllerBase
    {
        private OrdenServicio ordenServicio;
        public OrdenesController(EcommerceContext contexto)
        {
            ordenServicio = new OrdenServicio(contexto);
        }

        [HttpPost, Route("ObtenerValorTotal")]
        public async Task<IActionResult> ObtenerValorTotal(List<DetalleOrdenProducto> detalleProductos)
        {
            try
            {
                return Ok(await ordenServicio.CalcularValores(detalleProductos));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Authorize]
        public IActionResult Get()
        {
            try
            {
                int idUsuario = Convert.ToInt32(User.FindFirst(ClaimTypes.Sid)?.Value);
                return Ok(ordenServicio.ObtenerOrdenes(idUsuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
