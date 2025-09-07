import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { LogInModel } from '../models/LogInModel';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  private url: string = `${environment.url}/Usuarios`;

  registrarUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(`${this.url}/Registrarse`, usuario);
  }

  iniciarSesion(loginModel: LogInModel): Observable<any>{
    return this.http.post(`${this.url}/IniciarSesion`, loginModel);
  }

  cerrarSesion(){
    localStorage.removeItem("token");
    this.router.navigate(["/inicio-sesion"]);
  }

  actualizarUsuario(usuario: Usuario): Observable<any>{
    return this.http.put(`${this.url}/ActualizarUsuario`, usuario, {headers: this.tokenService.obtenerHeaders()});
  }

  consultarUsuario(): Observable<any>{
    return this.http.get(this.url, {headers: this.tokenService.obtenerHeaders()});
  }
}
