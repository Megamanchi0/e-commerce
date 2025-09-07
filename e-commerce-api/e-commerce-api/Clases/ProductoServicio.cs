using e_commerce_api.Models;

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace e_commerce_api.Clases
{
    public class ProductoServicio
    {
        private readonly EcommerceContext context;
        public ProductoServicio(EcommerceContext context)
        {
            this.context = context;
        }

        public async Task<List<Producto>> ConsultarProductos()
        { 
            return await context.Productos.ToListAsync();
        }

        //Completar con la imagen
        public async Task<string> AgregarProducto(Producto producto)
        {
            producto.Activo = true;
            await context.Productos.AddAsync(producto);
            await context.SaveChangesAsync();
            return "Producto agregado exitosamente";
        }

        public string ModificarProducto(Producto producto)
        {
            context.Productos.Update(producto);
            context.SaveChanges();
            return "Producto modificado exitosamente";
        }

        public async Task<Producto?> ConsultarProducto(int idProducto)
        {
            var producto = await context.Productos.FirstOrDefaultAsync(p => p.Id == idProducto);
            return producto;
        }
        
    }
}
