import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-toggle-panel',
  standalone: true,
  imports: [],
  templateUrl: './toggle-panel.component.html',
  styleUrl: './toggle-panel.component.scss'
})
export class TogglePanelComponent {
  
  //@Input() //old version without signal
  title=input("defaultTitle");//as signal

  //toggleP=false;//old version without signal
  panelOpenState=model(false); //with signal
}
