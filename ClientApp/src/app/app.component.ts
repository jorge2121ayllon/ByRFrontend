import { Component } from '@angular/core';
import { UsuarioDetalleService }  from  './servicios/usuario-detalle.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  
  constructor(public _authService:UsuarioDetalleService) {}
}
