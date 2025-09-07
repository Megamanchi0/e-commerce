using e_commerce_api.Models;

using Microsoft.EntityFrameworkCore;

namespace e_commerce_api.Clases
{
    public class CategoriaServicio
    {
        private readonly EcommerceContext context;
        public CategoriaServicio(EcommerceContext context)
        {
            this.context = context;
        }

        public async Task<List<Categorium>> ObtenerCategorias()
        {
            return await context.Categoria.ToListAsync();
        }
    }
}
