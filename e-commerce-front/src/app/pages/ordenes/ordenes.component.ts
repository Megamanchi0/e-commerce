import { Component } from '@angular/core';
import { OrdenService } from '../../services/orden.service';
import { Orden } from '../../models/Orden';
import { Producto } from '../../models/Producto';
import { CargandoComponent } from "../../components/cargando/cargando.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CargandoComponent, CommonModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.css'
})
export class OrdenesComponent {
  ordenes: Orden[] = []
  cargando: boolean = true;

  constructor(private ordenService: OrdenService){}

  ngOnInit(){
    this.obtenerOrdenes();
  }

  obtenerOrdenes(){
    this.ordenService.obtenerOrdenes().subscribe({
      next: res => {
        res.map((e:any) => {
          const orden = this.ordenes.find(o => o.idOrden == e.idOrden);
          if (!orden) {
            const ordenesFiltradas: any[] = res.filter((f:any) => f.idOrden == e.idOrden);
            let productos: any[] = []
            ordenesFiltradas.map((f:any) => {
              productos.push({
                nombre: f.producto,
                cantidad: f.cantidad,
                urlImagen: f.urlImagen
              });
            });
            this.ordenes.push({
              idOrden: e.idOrden,
              estado: e.estado,
              fecha: e.fecha,
              valorTotal: e.valorTotal,
              productos: [...productos]
            })
          }
        });
        this.cargando = false;
        console.log(this.ordenes);
      }
    });
  }
}
