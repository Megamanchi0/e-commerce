import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { CargandoComponent } from "../../components/cargando/cargando.component";
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from '../../services/stripe.service';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-confirmacion-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CargandoComponent],
  templateUrl: './confirmacion-compra.component.html',
  styleUrl: './confirmacion-compra.component.css'
})
export class ConfirmacionCompraComponent {
  publickey: string = "pk_test_51R5qJhBdhUtz7V02sxyp0mdejw6Cdi9xcqFc9OSe1G2AFBdY3OBKTeZYDaVKjmGLMZmDkPYSySCqquzRvYcEPO6v00sBJw4DER";

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, 
    private stripeService: StripeService, private carritoService: CarritoService
  ){
    this.form = this.fb.group({
      direccion: "",
      telefono: ""
    });
    loadStripe(this.publickey).then(stripe => {
      this.stripe = stripe;
    });
  }

  ngOnInit(){
    this.consultarUsuario();
    this.consultarProductos();
  }

  form: FormGroup;
  cargandoBoton: boolean = false;
  cargandoFormulario: boolean = true;
  claseMensaje: string = "oculto";
  mensaje: string = "Hubo un error al realizar el pago";
  usuario: Usuario = {
    apellido: "",
    correo: "",
    direccion: "",
    contrasena: "",
    nombre: "",
    documento: "",
    telefono: ""
  }
  suscripcion: Subscription = new Subscription();

  detalleProductos: any[] = []

  stripe: any;
  
  consultarUsuario(){
    this.usuarioService.consultarUsuario().subscribe({
      next: usuario => {
        this.form.setValue({
          direccion: usuario.direccion,
          telefono: usuario.telefono
        });
        this.usuario = usuario;
        this.cargandoFormulario = false;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  consultarProductos(){
    this.suscripcion.add(this.carritoService.consultarCarrito().subscribe({
      next: elementos => {
        elementos.map((e: Producto) => {
          this.detalleProductos.push({
            idProducto: e.id,
            cantidad: e.cantidad
          });
        });
      }
    }));
  }

  modificarUsuario(){
    this.usuario.direccion = this.form.get("direccion")?.value;
    this.usuario.telefono = this.form.get("telefono")?.value;
    this.usuarioService.actualizarUsuario(this.usuario).subscribe({
      next: res => {
        console.log(res.resultado);
      }
    });
  }

  onSubmit(){
    this.cargandoBoton = true;

    if (this.usuario.direccion != this.form.get("direccion")?.value 
    || this.usuario.telefono != this.form.get("telefono")?.value) {
      this.modificarUsuario();
    }

    this.stripeService.postStripe(this.detalleProductos).subscribe({
      next: res => {
        this.stripe.redirectToCheckout({
          sessionId: res.id
        });
        this.cargandoBoton = false;
      },
      error: err => {
        console.log(err);
        this.claseMensaje = "";
        this.cargandoBoton = false;
      }
    });
    
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }
}
