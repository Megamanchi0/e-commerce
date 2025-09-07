import { Producto } from "./Producto";

export interface Orden{
    idOrden: number,
    fecha: Date,
    valorTotal: number,
    estado: string,
    productos: any[],
}