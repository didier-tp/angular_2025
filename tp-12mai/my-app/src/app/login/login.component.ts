import { Component } from '@angular/core';
import { Login, LoginResponse } from '../common/data/login';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../common/service/login.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' , '../common/style/common.scss']
})
export class LoginComponent {
  public login: Login = new Login();
  //public message :string | undefined ;
  //public message :string ="";
  public message  ="";
  public ok=false;
  //public message! : string  ;

  constructor(public loginService : LoginService){
     //injection de dépendance par constructeur
  }

  public onLogin() {
   // this.message = "donnees saisies = " + JSON.stringify(this.login);
   sessionStorage.setItem("access_token","");
   this.loginService.postLogin$(this.login)
   .subscribe({
      next: (loginResponse : LoginResponse)=>{ this.message = loginResponse.message;
                                               this.ok = loginResponse.status;
                                               console.log(JSON.stringify(loginResponse));
                                               sessionStorage.setItem("access_token",loginResponse.token);
      },
      error: (err)=>{console.log(JSON.stringify(err))}
     })
  }
}
