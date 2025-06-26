import { Component, inject } from '@angular/core';
import { Login, LoginResponse } from '../common/data/login';
import { FormsModule, NgForm } from '@angular/forms';
import { DeviseService } from '../common/service/devise.service';
import { LoginService } from '../common/service/login.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginService = inject(LoginService)
  
  public login : Login = new Login();
public message :string ="";

public onLogin(){
   // this.message = "donnees saisies = " + JSON.stringify(this.login);
   this.loginService.postLogin$(this.login).subscribe(
    {
      next: (loginResponse : LoginResponse) => {  this.message = loginResponse.message},
      error: (err) => { console.log(err) }
    }
   )
}

}
