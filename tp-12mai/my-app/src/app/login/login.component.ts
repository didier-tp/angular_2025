import { Component } from '@angular/core';
import { Login } from '../common/data/login';
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
  //public message! : string  ;

  constructor(public loginService : LoginService){
     //injection de dépendance par constructeur
  }

  public onLogin() {
    this.message = "donnees saisies = " + JSON.stringify(this.login);
  }
}
