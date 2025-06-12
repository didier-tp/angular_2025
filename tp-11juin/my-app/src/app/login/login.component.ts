import { Component } from '@angular/core';
import { Login } from '../common/data/login';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public login : Login = new Login();
public message :string ="";
public onLogin(){
this.message = "donnees saisies = " + JSON.stringify(this.login);
}
}
