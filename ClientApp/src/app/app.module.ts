import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SortColumns } from './directivas/sortcolumns';


import { UsuariosDetallesComponent } from './usuarios-detalles/usuarios-detalles.component';
import { UsuarioDetalleComponent } from './usuarios-detalles/usuario-detalle/usuario-detalle.component';
import { UsuarioDetalleListaComponent } from './usuarios-detalles/usuario-detalle-lista/usuario-detalle-lista.component';
import { UsuarioDetalleService } from './servicios/usuario-detalle.service';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SortColumns,
    UsuariosDetallesComponent,
    UsuarioDetalleComponent,
    UsuarioDetalleListaComponent,
    LoginComponent,
    RegistrarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    UsuarioDetalleService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
