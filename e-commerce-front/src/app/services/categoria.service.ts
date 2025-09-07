import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private httpClient: HttpClient) { }

  private url: string = `${environment.url}/Categorias`
  categoriaSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  cambiarCategoria(valor: number){
    this.categoriaSubject.next(valor);
  }

  observarCategoria(): Observable<number>{
    return this.categoriaSubject.asObservable();
  }

  obtenerCategorias(): Observable<any>{
    return this.httpClient.get(this.url);
  }

}
