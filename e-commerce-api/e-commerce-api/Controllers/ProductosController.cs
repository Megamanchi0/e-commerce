using e_commerce_api.Clases;
using e_commerce_api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private ProductoServicio productoServicio;
        public ProductosController(EcommerceContext contexto)
        {
            productoServicio = new ProductoServicio(contexto);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var resultado = await productoServicio.ConsultarProductos();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("ConsultarProducto")]
        public async Task<IActionResult> ConsultarProducto(int idProducto)
        {
            try
            {
                var producto = await productoServicio.ConsultarProducto(idProducto);
                if (producto==null)
                {
                    return NotFound();
                }
                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize(Roles ="Administrador")]
        public async Task<IActionResult> Post(Producto producto)
        {
            try
            {
                string resultado = await productoServicio.AgregarProducto(producto);
                return Ok(new { resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(Producto producto)
        {
            try
            {
                string resultado = productoServicio.ModificarProducto(producto);
                return Ok(new { resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
