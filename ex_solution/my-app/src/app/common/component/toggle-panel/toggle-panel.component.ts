import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-panel',
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.scss'
})
export class TogglePanelComponent {
  @Input()
  title="defaultTitle";

  toggleP=false;
}
