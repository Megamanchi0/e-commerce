import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  url: string  = `${environment.url}/Stripe`;

  postStripe(detalleProductos: any): Observable<any>{
    return this.http.post(this.url, detalleProductos, {headers: this.tokenService.obtenerHeaders()});
  }

}
