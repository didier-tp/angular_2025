import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toggle-panel',
  imports: [],
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.scss'
})
export class TogglePanelComponent {
  toggleP /* : boolean */ =false;

  title = input( 'default panel title');

  constructor() { }
}
