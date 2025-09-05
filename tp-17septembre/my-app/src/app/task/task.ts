//export type TaskState  = "todo" | "doing" | "done"
export type TaskState  = "todo" | "done"

export class Task{
    constructor(public title :string="my-task",
                public taskRequest : any = "combien vaut 2+2 ?",
                public taskResponse : any = "",
                public state :TaskState="todo"
    ) {}
}

export function cloneTask(t:Task){
    return new Task(t.title,t.taskRequest,t.taskResponse,t.state);
 }

export function copyValuesOfTask(origin:Task,existingTarget:Task){
    existingTarget.state=origin.state;
    existingTarget.taskResponse=origin.taskResponse;
    existingTarget.title=origin.title;
    existingTarget.taskRequest=origin.taskRequest;
 }