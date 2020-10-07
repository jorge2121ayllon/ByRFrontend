import { Component } from '@angular/core';
import { UserService } from './servicios/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
   public NameLogged = [
    { value: localStorage.getItem('UserName'), display: localStorage.getItem('UserName') }
  ];
  constructor(public _authService:UserService) {}
}
