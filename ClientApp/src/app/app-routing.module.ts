import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioDetalleComponent } from './usuarios-detalles/usuario-detalle/usuario-detalle.component';
import { UsuariosDetallesComponent } from './usuarios-detalles/usuarios-detalles.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  
 

  {
    path:"usuarios", 
    component:UsuariosDetallesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"ingresar", 
    component:LoginComponent
  },
  {
    path:"registrar", 
    component:RegistrarComponent
  },
  {
    path:"inicio", 
    component: InicioComponent
  },


  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
