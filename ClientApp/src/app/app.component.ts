import { Component } from '@angular/core';
import { UserService } from './servicios/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  
  constructor(public _authService:UserService) {}
}
