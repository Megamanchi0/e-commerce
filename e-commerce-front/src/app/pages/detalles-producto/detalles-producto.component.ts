import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { MensajeSuccessComponent } from '../../components/mensaje-success/mensaje-success.component';
import { CommonModule } from '@angular/common';
import { CargandoComponent } from "../../components/cargando/cargando.component";
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  imports: [CommonModule, MensajeSuccessComponent, CargandoComponent],
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css'
})
export class DetallesProductoComponent {
  constructor(private rutaActiva: ActivatedRoute, private productoService: ProductoService, private carritoService: CarritoService){}

  ngOnInit(){
    this.idProducto = this.rutaActiva.snapshot.params["id"];
    this.consultarProducto();
  }

  idProducto: number = 0;
  producto: Producto | undefined;
  claseMensaje: string = "oculto";
  cargando: boolean = true;

  consultarProducto(){
    this.productoService.consultarProducto(this.idProducto).subscribe({
      next: res => {
        this.producto = {
          id: this.idProducto,
          nombre: res.nombre,
          precio: res.precio,
          descripcion: res.descripcion,
          activo: res.activo,
          idCategoria: res.idCategoria,
          stock: res.stock,
          urlImagen: res.urlImagen
        }
        this.cargando = false;
      }
    });
  }

  agregarAlCarrito(){
    this.carritoService.agregarAlCarrito(this.producto!);
    this.claseMensaje = "";
    setTimeout(() => {
      this.claseMensaje = "oculto";
    },3000);
  }

  ocularMensaje(){
    this.claseMensaje = "oculto";
  }

}
