
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-actions-header',
  imports: [],
  templateUrl: './actions-header.component.html',
  styleUrl: './actions-header.component.scss'
})
export class ActionsHeaderComponent {
    actionsList = input<String[]>([]);
    actionClick = output<string>();

    fireActionEvent(event : MouseEvent){
      let buttonId = (<HTMLElement>event.target).id;
      this.actionClick.emit(buttonId);
    }
}
