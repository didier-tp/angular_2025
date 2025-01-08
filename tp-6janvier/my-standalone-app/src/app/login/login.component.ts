import { Component } from '@angular/core';
import { Login, LoginResponse } from '../common/data/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../common/service/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public login : Login = new Login();
  public message :string ="";
  public ok=false;

  constructor(private loginService : LoginService) { }

  public onLogin(){
       //this.message = "donnees saisies = " + JSON.stringify(this.login);
       this.message=""; 
       this.loginService.postLogin$(this.login).subscribe({
        next: (res: LoginResponse) => { this.gererLoginResponse(res); },
        error: (err) => { console.log("error:" + err) }
       });
  }

  private gererLoginResponse(loginResponse : LoginResponse){
       this.message = loginResponse.message;
       this.ok = loginResponse.status;
       //pour <span [style.color]="ok?'green':'red'">{{message}}</span>
  }

  
}
