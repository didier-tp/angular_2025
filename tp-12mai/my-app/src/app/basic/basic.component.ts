import { Component } from '@angular/core';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { TogglePanelComponent } from '../common/component/toggle-panel/toggle-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-basic',
  imports: [CalculatriceComponent, TvaComponent,TogglePanelComponent,MatTabsModule,
           RouterOutlet,RouterLink],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent {

}
