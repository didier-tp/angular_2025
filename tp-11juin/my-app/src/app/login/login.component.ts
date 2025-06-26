import { Component, inject } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule, NgForm } from '@angular/forms';
import { DeviseService } from '../common/service/devise.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  deviseService = inject(DeviseService)
  
  public login : Login = new Login();
public message :string ="";
public onLogin(){
this.message = "donnees saisies = " + JSON.stringify(this.login);
}
}
