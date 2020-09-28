import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SortColumns } from './directivas/sortcolumns';


import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';

import { UserService } from './servicios/user.service';

import { PropertiesComponent } from './properties/properties.component';
import { PropertyFormComponent } from './properties/property-form/property-form.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';

import { FilterComponent } from './componentes/filter/filter.component';
import { PaginationComponent } from './componentes/pagination/pagination.component';
import { Property } from './modelos/property.model';
import { PropertyService } from './servicios/property.service';



@NgModule({
  declarations: [
    AppComponent,
    SortColumns,
    
    LoginComponent,
    RegistrarComponent,
    InicioComponent,
    UsersComponent,
    UserListComponent,
    PropertiesComponent,
    PropertyFormComponent,
    PropertyListComponent,
    
    FilterComponent,
    PaginationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    UserService,
    PropertyService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
