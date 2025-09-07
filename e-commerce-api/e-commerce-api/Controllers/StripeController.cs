using e_commerce_api.Clases;
using e_commerce_api.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using Stripe;
using Stripe.Checkout;

using System.Collections.Generic;
using System.Security.Claims;

namespace e_commerce_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly StripeOptions stripeOptions;
        private readonly EcommerceContext contexto;
        private readonly IConfiguration configuration;
        private readonly OrdenServicio ordenServicio;
        public StripeController(IOptionsSnapshot<StripeOptions> stripeOptionsSnapShot, EcommerceContext contexto, IConfiguration configuration)
        {
            stripeOptions = stripeOptionsSnapShot.Value;
            this.contexto = contexto;
            this.configuration = configuration;
            ordenServicio = new OrdenServicio(contexto);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post([FromBody] List<DetalleOrdenProducto> detalleProductos)
        {
            var valores = (await ordenServicio.CalcularValores(detalleProductos))!;
            int idUsuario = Convert.ToInt32(User.FindFirst(ClaimTypes.Sid)?.Value);
            try
            {
                Usuario usuario = (await contexto.Usuarios.FirstOrDefaultAsync(u => u.Id == idUsuario))!;

                StripeConfiguration.ApiKey = stripeOptions.ApiKey;
                var urlOrigen = configuration.GetSection("UrlOrigen").Value;
                var items = new List<SessionLineItemOptions>();

                foreach (var detalleProducto in detalleProductos)
                {
                    var producto = (await contexto.Productos.FirstOrDefaultAsync(p => p.Id == detalleProducto.IdProducto))!;
                    var item = new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmountDecimal = producto.Precio*100,
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = producto.Nombre
                            }
                        },
                        Quantity = detalleProducto.Cantidad,
                    };
                    items.Add(item);
                }

                var ivaItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmountDecimal = Math.Round((decimal)(valores.iva!), 2) * 100, // En centavos
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "IVA"
                        }
                    },
                    Quantity = 1,
                };
                items.Add(ivaItem);

                var envioItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmountDecimal = Math.Round((decimal)(valores.valorEnvio!), 2)*100, // En centavos
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "Envío"
                        }
                    },
                    Quantity = 1,
                };
                items.Add(envioItem);

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = items,
                    Mode = "payment",
                    SuccessUrl = $"{urlOrigen}/success", 
                    CancelUrl = $"{urlOrigen}/",
                    CustomerEmail = usuario.Correo
                };

                var service = new SessionService();
                Session session = service.Create(options);

                await ordenServicio.GuardarOrden(idUsuario, detalleProductos);

                return Ok(new { id = session.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
