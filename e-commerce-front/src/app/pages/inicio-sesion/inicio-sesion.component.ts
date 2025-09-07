import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService){
    this.form = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required]
    });
  }

  form: FormGroup;
  cargando: boolean = false;
  claseMensaje: string = "oculto";
  mensaje: string = "";

  iniciarSesion(){
    this.cargando = true;
    this.claseMensaje = "oculto";
    this.usuarioService.iniciarSesion(this.form.value).subscribe({
      next: (res) => {
        if (!res?.resultado) {
          this.claseMensaje = "";
          this.mensaje = "Correo o contraseña incorrectos.";
        }else{
          localStorage.setItem("token", res.resultado);
          this.router.navigate(["/"]);
        }
        this.cargando = false;
      },
      error: err => {
        console.log(err);
        this.claseMensaje = "";
        this.mensaje = "Hubo un error al iniciar sesión.";
        this.cargando = false;
      }
    });
  }
}
