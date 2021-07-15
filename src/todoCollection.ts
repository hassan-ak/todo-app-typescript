import { TodoItem } from "./todoItem";


export class TodoCollection {

    // to define item id
    private nextId: number = 1;

    constructor(public userName: string, public todoItems: TodoItem[] = []) {
        // no statements required here
        // TS compiler will auto genrate these
    }
 
    // adding a new todo and get ID of the added todo
    addTodo(task: string): number {
        // increment in the todo id in case same id already exist
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.todoItems.push(new TodoItem(this.nextId, task));
        return this.nextId;
    }
 
    // get a todo by specific id
    getTodoById(id: number) : TodoItem {
        return this.todoItems.find(item => item.id === id);
    }
    
    // mark a task as completed or back to uncomplete
    markComplete(id: number, complete: boolean) : void {
        const todoItem = this.getTodoById(id);
        // acts only in case if the todo exist with specific id
        if (todoItem) {
            todoItem.complete = complete;
        }
    }

    // To print all the todos at once
    printAll():void{
        this.todoItems.map((item)=>{item.printDetails()})
    }

}