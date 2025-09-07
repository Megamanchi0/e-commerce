import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hayToken(): boolean{
    const token = localStorage.getItem("token");
    return token? true : false;
  }

  decodificarToken(): any{
    const token = localStorage.getItem("token")!;
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  obtenerHeaders(){
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
  }
}
