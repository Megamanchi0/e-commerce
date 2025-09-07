import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/Producto';
import { RouterLink } from '@angular/router';
import { CargandoComponent } from "../../components/cargando/cargando.component";
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, CargandoComponent, MenuComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  constructor(private carritoService: CarritoService){}

  ngOnInit(){
    this.observarCarrito();
  }

  private suscripcion = new Subscription();
  elementosCarrito: Producto[] = [];
  valorTotal: number = 0;
  subtotal: number = 0;
  valorEnvio: number = 0;
  impuestos: number = 0;
  cargando: boolean = true;

  observarCarrito(){
    this.suscripcion.add(this.carritoService.consultarCarrito().subscribe({
      next: carrito => {
        this.elementosCarrito = [...carrito];
        if (this.elementosCarrito.length>0) {
          let detalleProductos: any[] = [];
          this.elementosCarrito.map(e => {
            detalleProductos.push({
              idProducto: e.id,
              cantidad: e.cantidad
            });
          });
          this.consultarValores(detalleProductos);
        }
      }
    }));
  }

  eliminarProductoCarrito(produto: Producto, indice: number){
    this.carritoService.eliminarDelCarrito(indice)
  }

  consultarValores(productos: any[]){
    this.suscripcion.add(this.carritoService.obtenerValorTotal(productos).subscribe({
      next: rpta => {
        this.valorTotal = rpta.valorTotal;
        this.subtotal = rpta.subtotal;
        this.impuestos = rpta.iva;
        this.valorEnvio = rpta.valorEnvio;
        this.cargando = false;
      }
    }))
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}
