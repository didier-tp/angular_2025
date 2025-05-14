import { Component } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [FormsModule,NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  listeCouleurs: string[] = ["lightyellow", "white",
    "lightgrey", "lightgreen", "lightpink", "lightblue"];
  constructor(public preferencesService: PreferencesService) { }
}
