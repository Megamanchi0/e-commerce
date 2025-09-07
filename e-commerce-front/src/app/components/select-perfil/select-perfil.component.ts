import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsuarioService } from '../../services/usuario.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-select-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './select-perfil.component.html',
  styleUrl: './select-perfil.component.css'
})
export class SelectPerfilComponent {

  constructor(private tokenService: TokenService, private router: Router,
    private usuarioService: UsuarioService
  ){}

  suscripcion: Subscription = new Subscription();

  ngOnInit(){
    this.observarNavegacion();
    this.obtenerNombre();
  }

  claseSelect: string = "oculto";
  nombre: string = "Nombre de usuario";

  obtenerNombre(){
    if (this.estaLoggeado()) {
      const token = this.tokenService.decodificarToken();
      this.nombre = token.unique_name;
    }
  }

  observarNavegacion(){
    this.suscripcion.add(this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.obtenerNombre();
      }
    }));
  }

  cerrarSesion(){
    this.usuarioService.cerrarSesion();
    this.claseSelect = "oculto";
  }

  estaLoggeado(): boolean{  
    return this.tokenService.hayToken();
  }

  handleSelect(){
    if (this.claseSelect=="oculto") {
      this.claseSelect = "";
    }else
    this.claseSelect = "oculto";
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}
