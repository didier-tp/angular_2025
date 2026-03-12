import { Component, inject } from '@angular/core';
import { UserInSession } from '../common/data/user_in_session';
import { Router } from 'express';
import { firstValueFrom } from 'rxjs';
import { Login, LoginResponse } from '../common/data/login';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../common/service/login.service';
import { messageFromError } from '../common/util/util';
import { SessionService } from '../common/service/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //login = new Login();
login = new Login("user1","pwd1","user");
message = "";
status = false;

/*
constructor(private loginService: LoginService,
  private _sessionService :SessionService,
  private router : Router){
   //injection de dépendance
}
*/
private loginService =inject( LoginService);
private _sessionService =inject(SessionService);
//private router =inject(Router);

onLogin(){
  //this.onLoginWithSubscribe();
  this.onLoginWithAsyncAwait();//meme comportement, syntaxe différente
}

onLoginWithSubscribe(){
 //V1:
 //this.message="valeurs saisies=" + JSON.stringify(this.login);
 //V2:
 sessionStorage.setItem("access_token","");
 this.loginService.postLogin$(this.login).subscribe(
   {
     next: (loginResponse: LoginResponse) => {
      console.log("loginResponse=" + JSON.stringify(loginResponse));
       this.message=loginResponse.message;
       this.status = loginResponse.status;
       this.status = loginResponse.status;  
       sessionStorage.setItem("access_token",loginResponse.token??"");
       if(loginResponse.status==true){
            this._sessionService.userInSession$ = new UserInSession(loginResponse.username,true,"?",[]);
       }
       else{
        this._sessionService.userInSession$ = new UserInSession("?",false,"?",[]);
       }
     },
     error: (err) => {
       console.log("error:" + err);
       this.message = messageFromError(err, "echec login")
     }
   }
 );
}


async onLoginWithAsyncAwait(){
   sessionStorage.setItem("access_token","");
   try{
     let loginResponse = await firstValueFrom( this.loginService.postLogin$(this.login));
     console.log("loginResponse=" + JSON.stringify(loginResponse));
     this.message=loginResponse.message;
     this.status = loginResponse.status;  
     sessionStorage.setItem("access_token",loginResponse.token??"");
     if(loginResponse.status==true){
          this._sessionService.userInSession$ = new UserInSession(loginResponse.username,true,"?",[]);
     }
     else{
      this._sessionService.userInSession$ = new UserInSession("?",false,"?",[]);
     }
     //NB: "access_token" plutot que "token" or "authToken" for angular-oauth2-oidc extension compatibility
     //this.router.navigate([ '/ngr-conversion']); //navigation possible par programmation
   }
   catch(err){
     console.log("error:" + err);
     this.message =  "echec login";
   }
}
  
}
