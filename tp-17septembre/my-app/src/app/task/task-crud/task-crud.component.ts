import { Component, model, signal } from '@angular/core';
import { cloneTask, copyValuesOfTask, Task } from '../task';
import { GenericSelectorComponent } from '../generic-selector/generic-selector.component';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'app-task-crud',
  imports: [GenericSelectorComponent,TaskEditorComponent],
  templateUrl: './task-crud.component.html',
  styleUrl: './task-crud.component.scss'
})
export class TaskCrudComponent {
    initialTaskList = [ new Task("2plus2","combien vaut 2+2 ?"),
                 new Task("5moins4","combien vaut 5-4 ?"),
                 new Task("3fois0","combien vaut 3*0 ?")
    ]
  mainTaskFieldNames=["title","state","taskRequest","taskResponse"]
  //mainTaskFieldNames=["title","state"]

  //NB: model() ne serait ici utile qui si le composant TaskCrudComponent 
  //aurait ultérieurement besoin de partager certaines infos avec un composant parent
  //taskList = model<Task[]>(this.initialTaskList)
  //selectedTask = model<Task|null>(null);

  taskList = signal<Task[]>(this.initialTaskList)
  selectedTask = signal<Task|null>(null);
  tempTask = signal<Task|null>(null);

  /*
  changeSelectionEffect = effect( ()=>{
    console.log("GenericCrudComponent , changed selectedTask=" + JSON.stringify(this.selectedTask()))
  })
  */
 onSelectedTaskChange(){
  console.log("GenericCrudComponent , changed selectedTask=" + JSON.stringify(this.selectedTask()))
  this.tempTask.set(cloneTask(this.selectedTask()!))
 }



 onTaskChanged(){
    console.log("GenericCrudComponent , changed task=" + JSON.stringify(this.tempTask()))
    if(this.tempTask() && this.selectedTask()){
       copyValuesOfTask(this.tempTask()!,this.selectedTask()!)
    }
 }
}
