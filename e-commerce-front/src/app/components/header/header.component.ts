import { Component } from '@angular/core';
import { ProductoService } from "../../services/producto.service";
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/Producto';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { UsuarioService } from '../../services/usuario.service';
import { SelectPerfilComponent } from "../select-perfil/select-perfil.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, SelectPerfilComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private productoServicio: ProductoService, private carritoService: CarritoService, 
    private router: Router, private tokenService: TokenService, private usuarioService: UsuarioService) {}

  ngOnInit(){
    this.observarCarrito();
  }

  busqueda: string = "";
  suscripcion = new Subscription();
  elementosCarrito: Producto[] = [];
  claseSelect: string = "oculto";
  nombre: string = "Nombre de usuario";

  handleSelect(){
    if (this.claseSelect=="oculto") {
      this.claseSelect = "";
    }else
    this.claseSelect = "oculto";
  }

  cambiarBusqueda(){
    this.productoServicio.cambiarValorBusqueda(this.busqueda);
  }

  estaLoggeado(): boolean{  
    return this.tokenService.hayToken();
  }

  cerrarSesion(){
    this.usuarioService.cerrarSesion();
    this.claseSelect = "oculto";
  }

  observarCarrito(){
    this.suscripcion.add(this.carritoService.consultarCarrito().subscribe({
      next: carrito => {this.elementosCarrito = [...carrito];}
    }));
  }

  onEnter(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}
