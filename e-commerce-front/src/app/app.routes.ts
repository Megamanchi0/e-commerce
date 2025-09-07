import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { DetallesProductoComponent } from './pages/detalles-producto/detalles-producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ConfirmacionCompraComponent } from './pages/confirmacion-compra/confirmacion-compra.component';
import { loggedGuard } from './guards/logged.guard';
import { SuccessComponent } from './pages/success/success.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { noLoggedGuard } from './guards/no-logged.guard';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "producto/:id", component: DetallesProductoComponent},
    {path: "carrito", component: CarritoComponent},
    {path: "registro", component: RegistroComponent, canActivate: [noLoggedGuard]},
    {path: "inicio-sesion", component: InicioSesionComponent, canActivate: [noLoggedGuard]},
    {path: "usuario", component: UsuarioComponent, canActivate: [loggedGuard]},
    {path: "confirmacion", component: ConfirmacionCompraComponent, canActivate: [loggedGuard]},
    {path: "success", component: SuccessComponent, canActivate: [loggedGuard]},
    {path: "ordenes", component: OrdenesComponent, canActivate: [loggedGuard]}
];
