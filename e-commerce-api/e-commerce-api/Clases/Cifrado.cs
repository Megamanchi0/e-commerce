using System.Security.Cryptography;
using System.Text;

namespace e_commerce_api.Clases
{
    public static class Cifrado
    {
        public static string CifrarContrasena(string contrasena)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] pwdBytes = Encoding.UTF8.GetBytes(contrasena);
            byte[] hashBytes = sha256.ComputeHash(pwdBytes);

            StringBuilder sb = new StringBuilder();
            foreach (byte b in hashBytes)
            {
                sb.Append(b.ToString("x2"));
            }
            return sb.ToString();
        }
    }
}
