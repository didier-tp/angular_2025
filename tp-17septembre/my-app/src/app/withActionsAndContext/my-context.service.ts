import { Injectable, signal } from '@angular/core';

type MyContextMode = "MODE_CREATION" | "MODE_EDITION"

export class MyContext{
    constructor(public name:string|null=null,
                public mode:MyContextMode="MODE_EDITION"){}
}

@Injectable({
  providedIn: 'root'
})
export class MyContextService {

  public currentContext = signal<MyContext>(new MyContext())

  constructor() { }
}
