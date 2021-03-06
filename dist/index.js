"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
// List of Todos
let todos = [];
// Collection of todos
let collection = new jsonTodoCollection_1.JsonTodoCollection("Hassan", todos);
// For displaying completed tasks
let showCompleted = true;
// Function to display ToDo list, this function will be used with inquirer
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List \nTotal : ${collection.getItemCounts().total} \tComplted : ${collection.getItemCounts().complete} \tIncomplete : ${collection.getItemCounts().incomplete}`);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
// Commands to be displayed in the command prompt
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Complete"] = "Complete Task";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
// Function to add new task from promp window
function promptAdd() {
    console.clear();
    inquirer
        .prompt({ type: "input", name: "add", message: "Enter task:" })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
// Function mark a task as completed
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            checked: item.complete,
        })),
    })
        .then((answers) => {
        let completedTasks = answers["complete"];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTasks.find((id) => id === item.id) != undefined));
        promptUser();
    });
}
// function to take input from user
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer
        .prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands),
    })
        .then((answers) => {
        switch (answers["command"]) {
            // In case we select toggle b/w show and hide completed
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            // Case for adding new task
            case Commands.Add:
                promptAdd();
                break;
            // Case for marking a task as complete
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
promptUser();
