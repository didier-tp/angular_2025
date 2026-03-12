import { Component, effect, inject, signal  } from '@angular/core';
import { MyContextService } from '../my-context.service';
import { IDrawer, MyStrategyFactory } from '../my-strategy';

@Component({
  selector: 'app-my-drawer',
  imports: [],
  templateUrl: './my-drawer.component.html',
  styleUrl: './my-drawer.component.scss'
})
export class MyDrawerComponent implements IDrawer {

  myContextService = inject(MyContextService);
  entityName=signal("")
  displayMode=signal("none")
  bgColor=signal("lightgrey")
  myStrategyFactory = new MyStrategyFactory();

  currentContextEffect = effect(() => {
    const ctx = this.myContextService.currentContext()
    console.log("in currentContextEffect, ctx="+JSON.stringify(ctx))
    if((ctx.name!=null))
       this.displayMode.set("block")
    else
      this.displayMode.set("none")
    const strategy = this.myStrategyFactory.getStrategy(ctx.name??"?");
    strategy?.init(this);
  })

}
