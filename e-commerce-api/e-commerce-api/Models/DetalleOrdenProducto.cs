using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class DetalleOrdenProducto
{
    public int Id { get; set; }

    public int? IdOrden { get; set; }

    public int? IdProducto { get; set; }

    public int? Cantidad { get; set; }

    public decimal? ValorUnitario { get; set; }

    [JsonIgnore]
    public virtual Orden? IdOrdenNavigation { get; set; }

    [JsonIgnore]
    public virtual Producto? IdProductoNavigation { get; set; }
}
