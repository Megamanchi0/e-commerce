using e_commerce_api.DTOs;
using e_commerce_api.Models;

using Microsoft.EntityFrameworkCore;

namespace e_commerce_api.Clases
{
    public class OrdenServicio
    {
        private readonly EcommerceContext contexto;
        public OrdenServicio(EcommerceContext contexto)
        {
            this.contexto = contexto;
        }
        public async Task<ValoresModelo?> CalcularValores(List<DetalleOrdenProducto> detalleProductos)
        {
            decimal? subtotal = 0;
            decimal? iva;
            decimal? valorEnvio = (decimal)10.00;
            foreach (var detalleProducto in detalleProductos)
            {
                var _producto = await contexto.Productos.FirstOrDefaultAsync(p => p.Id
                == detalleProducto.IdProducto);
                if (_producto != null)
                {
                    subtotal += _producto.Precio* detalleProducto.Cantidad;
                }
                else
                {
                    throw new Exception("Error al consultar los datos");
                }
            }
            iva = subtotal * (decimal)0.19;
            var valorTotal = iva + subtotal + valorEnvio;
            return new ValoresModelo()
            {
                subtotal = subtotal,
                iva = iva,
                valorTotal = valorTotal,
                valorEnvio = valorEnvio
            };
        }

        public async Task<string> GuardarOrden(int idUsuario, List<DetalleOrdenProducto> detalleProductos)
        {
            ValoresModelo valores = (await CalcularValores(detalleProductos))!;
            Usuario usuario = (await contexto.Usuarios.FirstOrDefaultAsync(u => u.Id == idUsuario))!;
            Orden orden = new Orden()
            {
                Fecha = DateTime.Now,
                IdUsuario = idUsuario,
                IdEstado = 1,
                DireccionEnvio = usuario.Direccion,
                ValorTotal = valores.valorTotal
            };
            await contexto.Ordens.AddAsync(orden);
            await contexto.SaveChangesAsync();

            foreach (var detalleProducto in detalleProductos)
            {
                Producto producto = (await contexto.Productos.FirstOrDefaultAsync(p => p.Id == detalleProducto.IdProducto))!;
                producto.Stock -= 1;
                contexto.Productos.Update(producto);
                contexto.SaveChanges();

                detalleProducto.IdOrden = orden.Id;
                detalleProducto.ValorUnitario = producto.Precio;

                await contexto.DetalleOrdenProductos.AddAsync(detalleProducto);
                await contexto.SaveChangesAsync();
            }
            return "Orden guardada exitosamente";
        }

        public IQueryable ObtenerOrdenes(int idUsuario)
        {
            var consulta = from orden in contexto.Ordens
                           join detalleOrden in contexto.DetalleOrdenProductos
                           on orden.Id equals detalleOrden.IdOrden
                           join prodcuto in contexto.Productos
                           on detalleOrden.IdProducto equals prodcuto.Id
                           join estado in contexto.Estados
                           on orden.IdEstado equals estado.Id
                           where orden.IdUsuario == idUsuario
                           select new
                           {
                               idOrden = orden.Id,
                               fecha = orden.Fecha,
                               valorTotal = orden.ValorTotal,
                               estado = estado.Nombre,
                               producto = prodcuto.Nombre,
                               cantidad = detalleOrden.Cantidad,
                               urlImagen = prodcuto.UrlImagen
                           };

            return consulta;
        }
    }
}
