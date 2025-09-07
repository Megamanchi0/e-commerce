using e_commerce_api.Clases;
using e_commerce_api.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        public CategoriaServicio categoriaServicio;
        public CategoriasController(EcommerceContext context)
        {
            categoriaServicio = new CategoriaServicio(context);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await categoriaServicio.ObtenerCategorias());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
