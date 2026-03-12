import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[borderOver]'
})
export class BorderOverDirective {


  @Input('borderOver')
  set borderColor(borderColor:string){
    //NB: if no value specified , default value of color is empty string
    if(borderColor!="")
     this._borderColor=borderColor;
  }

  @HostBinding('style.borderColor')
  private _borderColor = 'red'; //default color

  @HostBinding('style.borderStyle')
  private _borderStyle = 'hidden'; 


  constructor(el: ElementRef) {
    //always sttings:
    el.nativeElement.style._borderWidth = '2px';
   }

   @HostListener('mouseenter')
   onMouseEnter(){
       this._borderStyle = 'solid';
   }

   @HostListener('mouseleave')
   onMouseLeave(){
    //this._borderStyle = 'none';
    this._borderStyle = 'hidden';
   }

   
   
}
