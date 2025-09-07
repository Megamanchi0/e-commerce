using e_commerce_api.DTOs;
using e_commerce_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace e_commerce_api.Clases
{
    public class UsuarioServicio
    {
        private readonly EcommerceContext contexto;
        private readonly IConfiguration configuration;
        public UsuarioServicio(EcommerceContext contexto, IConfiguration configuration)
        {
            this.contexto = contexto;
            this.configuration = configuration;
        } 

        public async Task<Usuario> ConsultarUsuario(int id)
        {
            Usuario usuario = (await contexto.Usuarios.FirstOrDefaultAsync(u => u.Id == id))!;
            return usuario;
        }

        public async Task<string> IniciarSesion(LogInModel loginModel)
        {
            string pwdEncriptadaa = Cifrado.CifrarContrasena(loginModel.Contrasena);
            var usuario = await contexto.Usuarios.FirstOrDefaultAsync(u => u.Correo == loginModel.Correo && u.Contrasena == pwdEncriptadaa);
            if (usuario == null)
            {
                return "";
            }

            var rol = contexto.Rols.FirstOrDefault(r => r.Id == usuario.IdRol);

            var claims = new[]
            {
                new Claim(ClaimTypes.Sid, usuario.Id.ToString()),
                new Claim("id", usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{usuario.Nombre} {usuario.Apellido}"),
                new Claim(ClaimTypes.Role, rol!.Nombre!)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var credenciales = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = credenciales,
                Expires = DateTime.UtcNow.AddMonths(6)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<string> Registrarse(Usuario usuario)
        {
            usuario.Contrasena = Cifrado.CifrarContrasena(usuario.Contrasena!);
            usuario.IdRol = 2;
            await contexto.Usuarios.AddAsync(usuario);
            await contexto.SaveChangesAsync();
            return "Registro realizado exitosamente";
        }

        public string ActualizarUsuario(Usuario usuario, int idUsuario)
        {
            var _usuario = contexto.Usuarios.FirstOrDefault(u => u.Id == idUsuario);
            _usuario.Nombre = usuario.Nombre;
            _usuario.Apellido = usuario.Apellido;
            _usuario.Direccion = usuario.Direccion;
            _usuario.Telefono = usuario.Telefono;
            contexto.Usuarios.Update(_usuario);
            contexto.SaveChanges();
            return "Usuario actualizado exitosamente";
        }

        public async Task<bool> DocumentoEsValido(string documento)
        {
            var _usuario = await contexto.Usuarios.FirstOrDefaultAsync(u => u.Documento == documento);
            if (_usuario!=null)
            {
                return false;
            }
            return true;
        }
        public async Task<bool> CorreoEsValido(string correo)
        {
            var _usuario = await contexto.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo);
            if (_usuario != null)
            {
                return false;
            }
            return true;
        }
    }
}
