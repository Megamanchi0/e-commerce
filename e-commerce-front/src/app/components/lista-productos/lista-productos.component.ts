import { Component, HostListener } from '@angular/core';
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../models/Producto";
import { productos } from "../../models/datosDePrueba";
import { CommonModule } from "@angular/common";
import { Subscription } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { MensajeSuccessComponent } from '../mensaje-success/mensaje-success.component';
import { CargandoComponent } from "../cargando/cargando.component";
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, MensajeSuccessComponent, CargandoComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  productos: Producto[] = [];
  productosMostrados: Producto[] = [];
  productosBusqueda: Producto[] = [];

  pagina: number = 0;
  itemsPaginacion: number = 12;
  paginas: any[] = [];
  cargando: boolean = true;
  claseMensaje: string = "oculto";

  timeOut: any;

  private suscripcion = new Subscription();

  constructor(private productoService: ProductoService, private carritoService: CarritoService, 
    private router: Router, private categoriaService: CategoriaService
  ){}

  ngOnInit(){
    this.obtenerProductos();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Verifica si el clic fue en un hijo específico
    if (target && target.closest('.btn-agregar')) {
      // Si el clic fue en un hijo, no hacemos nada (detenemos la ejecución)
      return;
    }else if (target && target.closest('.card')){
      this.router.navigate([`/producto/${target.closest('.card')?.id}`]);
    }
  }

  paginar(pagina: number){
    const inicio = pagina*this.itemsPaginacion;
    const fin = inicio+(this.itemsPaginacion);
    this.productosMostrados = [...this.productosBusqueda.slice(inicio, fin)];
    this.calcularPaginas();
    this.pagina = pagina;
  }

  calcularPaginas(){
    this.paginas.length = Math.ceil(this.productosBusqueda.length/this.itemsPaginacion);
  }

  avanzarPagina(){
    this.paginar(this.pagina+1);
  }

  retrocederrPagina(){
    this.paginar(this.pagina-1);
  }

  buscarProductos(){
    this.suscripcion?.add(this.productoService.obtenerValorBusqueda().subscribe({
      next: valor => {
        this.productosBusqueda = [...this.productos.filter(e => e.nombre.toLowerCase().includes(valor.toLowerCase()) 
        || e.descripcion.toLowerCase().includes(valor.toLowerCase()))];
        this.paginar(0);
      }
    }));
  }

  buscarPorCategoria(){
    this.suscripcion?.add(this.categoriaService.observarCategoria().subscribe({
      next: valor => {
        if (valor != 0) {
          this.productosBusqueda = [...this.productos.filter(e => e.idCategoria == valor)];
        }else{
          this.productosBusqueda = [...this.productos];
        }
        this.paginar(0);
      }
    }));
  }

  obtenerProductos(){
    this.productoService.obtenerProductos().subscribe({
      next: (rpta) => {
        this.productos = [...rpta as Producto[]];
        this.productosBusqueda = [...rpta as Producto[]];
        this.cargando = false;
        this.buscarProductos();
        this.buscarPorCategoria();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  agregarAlCarrito(producto: Producto){
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.carritoService.agregarAlCarrito(producto);
    this.claseMensaje = "";
    this.timeOut = setTimeout(() => {
      this.claseMensaje = "oculto";
    },2000);
  }

  ocularMensaje(){
    this.claseMensaje = "oculto";
  }

  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}
