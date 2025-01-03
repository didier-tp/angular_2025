export class Login {
    constructor(
        public  username : string ="",
        public  password : string ="",
        public  roles : string ="" ){}
}

export class LoginResponse {
    constructor(
        public  username : string ="",
        public  message : string ="",
        public  status : boolean =false,
        public  token : string ="" ){}
}
