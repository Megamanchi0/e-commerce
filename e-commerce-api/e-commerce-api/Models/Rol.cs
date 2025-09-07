using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class Rol
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    [JsonIgnore]
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
