using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Documento { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public string? Correo { get; set; }

    public string? Contrasena { get; set; }

    public int? IdRol { get; set; }

    [JsonIgnore]
    public virtual Rol? IdRolNavigation { get; set; }

    [JsonIgnore]
    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
