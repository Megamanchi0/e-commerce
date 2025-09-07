using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace e_commerce_api.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public decimal? Precio { get; set; }

    public int? IdCategoria { get; set; }

    public string? UrlImagen { get; set; }

    public bool? Activo { get; set; }

    public int? Stock { get; set; }

    [JsonIgnore]
    public virtual ICollection<DetalleOrdenProducto> DetalleOrdenProductos { get; set; } = new List<DetalleOrdenProducto>();

    [JsonIgnore]
    public virtual Categorium? IdCategoriaNavigation { get; set; }
}
