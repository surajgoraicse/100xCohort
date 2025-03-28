const { Command } = require('commander')
const fs = require("fs")
const { json } = require('stream/consumers')

const program = new Command()




program
    .name("todo-application")
    .description("a todo application to add, remove and update todo")
    .version("0.1.0")

program
    .command("add")
    .description("add a new todo")
    .option('-s, --status <status>', "status of the todo", false)
    .argument('<todo>', "todo to add")
    .action((todo, options) => {

        const status = options.status ? true : false;
        const newTodo = {
            id: Math.floor(Math.random() * 1000),
            todo: todo,
            status
        }
        fs.readFile("todos.json", "utf-8", (err, data) => {
            if (err) {
                throw err
            }
            data = JSON.parse(data)
            data.push(newTodo)
            fs.writeFile("todos.json", JSON.stringify(data), (err) => {
                if (err) {
                    throw err
                }
                console.log("todo added : ", newTodo);
            })
        })
    })

program
    .command("toggle-status")
    .description("toggle todo between true and false where true is completed and false is pending")
    .option('-c --completed <completed>', "status to toggle", false)
    .argument('<id>', "ID of the todo in which toggle has to perform")
    .action((id, options) => {
        console.log("options : ", options);
        console.log("id ", id);

        fs.readFile("todos.json", "utf-8", (err, data) => {
            if (err) {
                throw err
            }
            data = JSON.parse(data)
            const newData = data.map(element => {
                if (element.id == id) {
                    element.status = Boolean(options.completed)
                }
                return element
            });
            fs.writeFile("todos.json", JSON.stringify(newData), (error) => {
                if (error) {
                    throw error
                }
                console.log("todo updated successfully");
            })
        })
    })


program
    .command("print")
    .description("prints all todos")
    .option('-c --completed', "only completed")
    .action((options) => {
        fs.readFile("todos.json", "utf-8", (err, data) => {
            if (err) {
                throw err
            }
            data = JSON.parse(data)
            if (!options.completed) {
                console.log(data);
                return
            }
            const completedTodos = data.filter((todo) => {
                return todo.status
            })
            console.log(completedTodos);
        })
    })

program
    .command("remove")
    .description("remove todo")
    .option('-c --completed', "only completed")
    .option('-a --all', "remove all todos")
    .option("-i --id <id>", "id of the todo to remove")
    .action((options) => {
        console.log("options : ", options);
        if (options.all) {
            fs.writeFile("todos.json", '[]', (err) => {
                if (err) {
                    console.log("writing file error");
                    throw err
                }
                console.log("successfully deleted all todos");
            })
        }
        if (options.completed) {
            fs.readFile("todos.json", "utf-8", (err, data) => {
                if (err) {
                    console.log("error reading file : 114");
                    throw err
                }
                data = JSON.parse(data)
                const newData = data.filter((todo) => {
                    return !todo.status
                })
                fs.writeFile("todos.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log("error writing file : 122");
                        throw err
                    }
                })
            })
        }
        if (options.id) {
            fs.readFile("todos.json", "utf-8", (err, data) => {
                if (err) {
                    console.log("error reading file : 114");
                    throw err
                }
                data = JSON.parse(data)
                const newData = data.filter((todo) => {
                    return todo.id != options.id
                })
                fs.writeFile("todos.json", JSON.stringify(newData), (err) => {
                    if (err) {

                        console.log("error writing file : 138");
                        throw err
                    }
                })
            })
        }

    })



program.parse(process.argv);
