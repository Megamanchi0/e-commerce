using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class Orden
{
    public int Id { get; set; }

    public int? IdUsuario { get; set; }

    public decimal? ValorTotal { get; set; }

    public string? DireccionEnvio { get; set; }

    public DateTime? Fecha { get; set; }

    public int? IdEstado { get; set; }

    public virtual ICollection<DetalleOrdenProducto> DetalleOrdenProductos { get; set; } = new List<DetalleOrdenProducto>();

    [JsonIgnore]
    public virtual Estado? IdEstadoNavigation { get; set; }

    [JsonIgnore]
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
