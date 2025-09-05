import { CommonModule, JsonPipe } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-selector',
  imports: [CommonModule,FormsModule],
  templateUrl: './generic-selector.component.html',
  styleUrl: './generic-selector.component.scss'
})
export class GenericSelectorComponent {
    entities = input<object[]>([])
    mainFieldNames = input<string[]>([])
    selectedEntity = model<object|null>();

    objectEssentialValuesArray(obj:object):any[]{
      let arrayOfPropKeys = this.mainFieldNames();
      let valuesArray = [];
      for(let key of arrayOfPropKeys){
      valuesArray.push(Reflect.get(obj,key));
      }
      return valuesArray;
   }

   onSelectRow(obj:object){
    this.selectedEntity.set(obj);
   }
}
