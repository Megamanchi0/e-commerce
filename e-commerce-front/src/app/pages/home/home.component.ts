import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ListaProductosComponent } from '../../components/lista-productos/lista-productos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, ListaProductosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
