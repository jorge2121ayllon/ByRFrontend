import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { PropertiesComponent } from './properties/properties.component';



const routes: Routes = [
  
 

  {
    path:"usuarios", 
    component: UsersComponent,
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
  {
    path:"propiedades",
    component: PropertiesComponent
  },


  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
