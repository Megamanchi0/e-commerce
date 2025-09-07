export interface Producto{
    id: Number,
    nombre: String,
    precio: Number,
    stock: Number,
    idCategoria: Number,
    urlImagen: String,
    descripcion: String,
    activo: boolean,
    cantidad?: number
}