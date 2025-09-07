using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class Estado
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    [JsonIgnore]
    public virtual ICollection<Orden> Ordens { get; set; } = new List<Orden>();
}
