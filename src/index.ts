// Imports
import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection";

// List of Todos
let todos: TodoItem[] = [];

// Collection of todos
let collection: TodoCollection = new JsonTodoCollection("Hassan", todos);
// For displaying completed tasks
let showCompleted: boolean = true;

// Function to display ToDo list, this function will be used with inquirer
function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List \nTotal : ${
      collection.getItemCounts().total
    } \tComplted : ${collection.getItemCounts().complete} \tIncomplete : ${
      collection.getItemCounts().incomplete
    }`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

// Commands to be displayed in the command prompt
enum Commands {
  Add = "Add New Task",
  Toggle = "Show/Hide Completed",
  Complete = "Complete Task",
  Purge = "Remove Completed Tasks",
  Quit = "Quit",
}

// Function to add new task from promp window
function promptAdd(): void {
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
function promptComplete(): void {
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
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser();
    });
}

// function to take input from user
function promptUser(): void {
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
          } else {
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
