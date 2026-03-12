import { CommonModule, JsonPipe } from '@angular/common';
import { Component, model, output } from '@angular/core';
import { cloneTask, Task } from '../task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-editor',
  imports: [CommonModule,FormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {
    task = model<Task|null>(null)
    askedAction=output<string>();

    onDoTask(){
        this.task()!.state="done"; //task instance not changed , model signal not changed !!!
        //this.task.set(this.task()) //model signal not changed , same instance !!!
        this.task.set(cloneTask(this.task()!))
    }

     onUnDoTask(){
       this.task()!.taskResponse="";
       this.task()!.state="todo";
       this.task.set(cloneTask(this.task()!))
    }

   
     onDeleteTask(){
        this.askedAction.emit("DELETE");
    }
}
