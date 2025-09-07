using e_commerce_api.Clases;
using e_commerce_api.DTOs;
using e_commerce_api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private UsuarioServicio usuarioServicio;

        public UsuariosController(EcommerceContext contexto, IConfiguration configuration)
        {
            usuarioServicio = new UsuarioServicio(contexto, configuration);
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                int idUsuario = Convert.ToInt32(User.FindFirst(ClaimTypes.Sid)?.Value);
                var usuario = await usuarioServicio.ConsultarUsuario(idUsuario);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion(LogInModel logInModel)
        {
            try
            {
                var resultado = await usuarioServicio.IniciarSesion(logInModel);
                return Ok(new { resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("Registrarse")]
        public async Task<IActionResult> Registrarse(Usuario usuario)
        {
            try
            {
                if (!await usuarioServicio.DocumentoEsValido(usuario.Documento!))
                {
                    return Conflict(new {resultado =  "El documento ya se encuentra registrado" });
                }
                if (!await usuarioServicio.CorreoEsValido(usuario.Correo!))
                {
                    return Conflict(new { resultado =  "El correo ya se encuentra registrado" });
                }
                var respuesta = await usuarioServicio.Registrarse(usuario);
                return Ok(new { resultado = respuesta });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut, Route("ActualizarUsuario"), Authorize]
        public IActionResult ActualizarUsuario(Usuario usuario)
        {
            try
            {
                int idUsuario = Convert.ToInt32(User.FindFirst(ClaimTypes.Sid)?.Value);
                var resultado = usuarioServicio.ActualizarUsuario(usuario, idUsuario);
                return Ok(new { resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
