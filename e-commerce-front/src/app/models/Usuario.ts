export interface Usuario{
    id?: number,
    documento: string,
    nombre: string,
    apellido: string,
    telefono: string,
    direccion: string,
    correo: string,
    contrasena: string,
    idRol?: number
}