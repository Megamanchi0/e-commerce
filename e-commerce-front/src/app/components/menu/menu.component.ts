import { Component } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private categoriaServicio: CategoriaService, private router: Router,
    private categoriaService: CategoriaService
  ){}
  ngOnInit(){
    this.obtenerCategorias();
    this.obtenerAncho();
  }

  categorias: Categoria[] = []
  claseContenido: string = "oculto";

  ocultarMenu(){
    if (this.claseContenido == "oculto") {
      this.claseContenido = "visible";
    }else{
      this.claseContenido = "oculto";
    }
  }


  obtenerAncho(){
    if (window.innerWidth >= 768) {
      this.claseContenido = "visible";
    }
  }

  obtenerCategorias(){
    this.categoriaServicio.obtenerCategorias().subscribe({
      next: res => {
        this.categorias = [...res as Categoria[]];
      }
    })
  }

  buscarPorCategoria(idCategoria: number){
    this.categoriaService.cambiarCategoria(idCategoria);
    if (window.innerWidth < 768) {
      this.ocultarMenu();
    }
    this.router.navigate(["/"]);
  }

}
