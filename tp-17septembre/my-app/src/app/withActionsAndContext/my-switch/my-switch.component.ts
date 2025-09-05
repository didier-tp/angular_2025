import { Component, inject } from '@angular/core';
import { ActionsHeaderComponent } from '../actions-header/actions-header.component';
import { MyContext, MyContextService } from '../my-context.service';
import { JsonPipe } from '@angular/common';
import { MyDrawerComponent } from '../my-drawer/my-drawer.component';

@Component({
  selector: 'app-my-switch',
  imports: [ActionsHeaderComponent,JsonPipe,MyDrawerComponent],
  templateUrl: './my-switch.component.html',
  styleUrl: './my-switch.component.scss'
})
export class MySwitchComponent {

  myActionsList = [ 'CREATE_X' , 'EDIT_X', 'CREATE_Y', "EDIT_Y"]
  chosenActionId=""
  myContextService = inject(MyContextService)

  onActionClick(actionId:string){
    this.chosenActionId=actionId
    this.setContextFromActionId(actionId)
  }

  setContextFromActionId(actionId:string){
    let newCurrentContext : MyContext | undefined;
    switch(actionId){
      case 'EDIT_X': newCurrentContext =new MyContext('X','MODE_EDITION'); break;
      case 'CREATE_X':newCurrentContext =new MyContext('X','MODE_CREATION'); break;
      case 'EDIT_Y': newCurrentContext =new MyContext('Y','MODE_EDITION'); break;
      case 'CREATE_Y':newCurrentContext =new MyContext('Y','MODE_CREATION'); break;
    }
    if(newCurrentContext)
        this.myContextService.currentContext.set(newCurrentContext)
  }

}
