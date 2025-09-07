import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private fb: FormBuilder, private usuarioServicio: UsuarioService, private router: Router){
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      documento: ["", Validators.required],
      direccion: ["", Validators.required],
      telefono: ["", Validators.required],
      contrasena: ["", Validators.required],
      confirmarContrasena: ["", Validators.required]
    })
  }

  form: FormGroup;
  claseMensaje: string = "oculto";
  mensaje: string = "Error al registrarse.";
  cargando: boolean = false;

  validarContrasenas(): boolean{
    if (this.form.get('confirmarContrasena')?.value === this.form.get('contrasena')?.value) {
      return true;
    }
    return false;
  }

  registrarse(){
    if (this.form.valid) {
      this.cargando = true;
      if (this.validarContrasenas()) {
        const usuario: Usuario = {
          nombre: this.form.get("nombre")?.value,
          apellido: this.form.get("apellido")?.value,
          correo: this.form.get("correo")?.value,
          direccion: this.form.get("direccion")?.value,
          documento: this.form.get("documento")?.value,
          contrasena: this.form.get("contrasena")?.value,
          telefono: this.form.get("telefono")?.value
        }
        this.usuarioServicio.registrarUsuario(usuario).subscribe({
          next: res => {
            this.cargando = false;
            alert(res.resultado);
            this.router.navigate(["/inicio-sesion"]);
          },
          error: err => {
            this.claseMensaje = "";
            if (err.error.resultado) {
              this.mensaje = err.error.resultado;
              this.cargando = false
            }
          }
        });
      }else{
        this.claseMensaje = "";
        this.mensaje = "Las contraseñas no coinciden";
        this.cargando = false;
      }
    }
  }

}
