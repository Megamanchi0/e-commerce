import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url: string = `${environment.url}/Productos`

  constructor(private httpClient: HttpClient) { }

  busqueda: any = new BehaviorSubject<string>("");

  cambiarValorBusqueda(valor: string){
    this.busqueda.next(valor);
  }

  obtenerValorBusqueda(): Observable<string>{
    return this.busqueda.asObservable();
  }

  obtenerProductos(): Observable<any>{
    return this.httpClient.get(this.url);
  }

  modificarProducto(producto: Producto): Observable<any>{
    return this.httpClient.put(this.url, producto);
  }

  consultarProducto(idProducto: number): Observable<any>{
    return this.httpClient.get(`${this.url}/ConsultarProducto?idProducto=${idProducto}`);
  }
}
