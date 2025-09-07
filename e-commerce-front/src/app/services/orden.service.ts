import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  url: string = `${environment.url}/Ordenes`;

  obtenerOrdenes(): Observable<any>{
    return this.http.get(this.url, {headers: this.tokenService.obtenerHeaders()});
  }
}
