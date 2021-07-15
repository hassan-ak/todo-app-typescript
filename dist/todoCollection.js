"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        // to define item id
        this.nextId = 1;
        // no statements required here
        // TS compiler will auto genrate these
    }
    // adding a new todo and get ID of the added todo
    addTodo(task) {
        // increment in the todo id in case same id already exist
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.todoItems.push(new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    }
    // get a todo by specific id
    getTodoById(id) {
        return this.todoItems.find(item => item.id === id);
    }
    // mark a task as completed or back to uncomplete
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        // acts only in case if the todo exist with specific id
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
    // To print all the todos at once
    printAll() {
        this.todoItems.map((item) => { item.printDetails(); });
    }
}
exports.TodoCollection = TodoCollection;
