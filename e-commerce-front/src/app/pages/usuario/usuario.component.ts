import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { CargandoComponent } from "../../components/cargando/cargando.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CargandoComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(private fb: FormBuilder, private usuarioServicio: UsuarioService){
    this.form = this.fb.group({
      nombre: "",
      apellido: "",
      correo: "",
      documento: "",
      direccion: "",
      telefono: "",
    });
    this.form.disable();
  }

  ngOnInit(){
    this.consultarUsuario();
  }

  form: FormGroup;
  cargando: boolean = true;

  consultarUsuario(){
    this.usuarioServicio.consultarUsuario().subscribe({
      next: res => {
        this.form.setValue({
          nombre: res.nombre,
          apellido: res.apellido,
          correo: res.correo,
          documento: res.documento,
          direccion: res.direccion,
          telefono: res.telefono
        });
        this.cargando = false;
      }
    });
  }

}
