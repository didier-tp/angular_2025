import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[borderOver]'
})
export class BorderOverDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.border = "1px solid red";
  }

}
