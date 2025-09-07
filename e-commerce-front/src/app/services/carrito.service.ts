import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  constructor(private http: HttpClient) { }

  private url: string = `${environment.url}/Ordenes`;
  private elementosCarritoObservable = new BehaviorSubject<Producto[]>([]);
  private elementosCarrito: Producto[] = [];

  consultarCarrito(): Observable<any>{
    return this.elementosCarritoObservable.asObservable();
  }

  agregarAlCarrito(producto: Producto){
    const _producto = this.elementosCarrito.find(e => e.id == producto.id);
    if (_producto) {
      this.elementosCarrito.map(e => {
        if (e.id == _producto.id) {
          e.cantidad! += 1;
        }
      });
    }else{
      producto.cantidad = 1;
      this.elementosCarrito.push(producto);
    }
    // this.elementosCarrito.map(e => {
    //   if (e.id == producto.id) {
    //     e.cantidad! += 1;
    //   }else{
    //     producto.cantidad = 1;
    //     this.elementosCarrito.push(producto);
    //   }
    // });
    this.elementosCarritoObservable.next(this.elementosCarrito);
  }

  eliminarDelCarrito(indice: number){
    this.elementosCarrito = this.elementosCarrito.filter((_,i) => {
      console.log(i);
      return i!= indice;
    });
    this.elementosCarritoObservable.next(this.elementosCarrito);
  }

  obtenerValorTotal(productos: any[]): Observable<any>{
    return this.http.post(`${this.url}/ObtenerValorTotal`, productos);
  }

}
