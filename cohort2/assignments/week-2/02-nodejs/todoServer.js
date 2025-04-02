// /**
//   You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
//   - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
//   - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

//   Each todo has a title and a description. The title is a string and the description is a string.
//   Each todo should also get an unique autogenerated id every time it is created
//   The expected API endpoints are defined below,
//   1.GET /todos - Retrieve all todo items
//     Description: Returns a list of all todo items.
//     Response: 200 OK with an array of todo items in JSON format.
//     Example: GET http://localhost:3000/todos
    
//   2.GET /todos/:id - Retrieve a specific todo item by ID
//     Description: Returns a specific todo item identified by its ID.
//     Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
//     Example: GET http://localhost:3000/todos/123
    
//   3. POST /todos - Create a new todo item
//     Description: Creates a new todo item.
//     Request Body: JSON object representing the todo item.
//     Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
//     Example: POST http://localhost:3000/todos
//     Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
//   4. PUT /todos/:id - Update an existing todo item by ID
//     Description: Updates an existing todo item identified by its ID.
//     Request Body: JSON object representing the updated todo item.
//     Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
//     Example: PUT http://localhost:3000/todos/123
//     Request Body: { "title": "Buy groceries", "completed": true }
    
//   5. DELETE /todos/:id - Delete a todo item by ID
//     Description: Deletes a todo item identified by its ID.
//     Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
//     Example: DELETE http://localhost:3000/todos/123

//     - For any other route not defined in the server return 404

//   Testing the server - run `npm run test-todoServer` command in terminal
//  */
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require("fs")
// const fsPromises = require('fs/promises');
// const ShortUniqueId = require("short-unique-id");

// const app = express();
// const { randomUUID } = new ShortUniqueId();

// app.use(bodyParser.json());


// async function getTodosFromFile() {
//   try {
//     const data = await fsPromises.readFile('todos.json', 'utf-8');

//     return data ? JSON.parse(data) : []; // Convert JSON to array
//   } catch (err) {
//     throw new Error("Error reading the file");
//   }
// }

// app.get('/todos', async (req, res) => {

//   const data = await getTodosFromFile()

//   res.status(200).json(data)

// })

// app.get('/todos/:id', async (req, res) => {
//   const id = req.params.id
//   console.log("id is ", id);
//   console.log(typeof id);
//   if (!id) {
//     return res.status(400).json({ message: "Please send the id of the todo" })
//   }
//   const data = await getTodosFromFile()

//   // data.forEach(todo => {
//   //   console.log(todo);
//   //   if (todo.id == id) {
//   //     console.log("xxx");
//   //     return res.status(200).json({ todo })
//   //   }
//   // });

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].id == id) {
//       return res.status(200).json({ ...data[i] })
//     }
//   }

//   res.status(404).end()

// })

// app.post("/todos", async (req, res) => {
//   try {
//     const body = req.body;
//     if (!body) {
//       return res
//         .status(404)
//         .json({ message: "No body found, Please send body with request" });
//     }
//     let data = await getTodosFromFile();


//     const id = randomUUID();
//     data.push({ id, ...body });

//     fs.writeFile("todos.json", JSON.stringify(data), (err) => {
//       if (err) {
//         return res.status(500).json({
//           message: `error writing data ${err}`,
//         });
//       }

//       res.status(201).json({ id });
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// app.put('/todos/:id', async (req, res) => {
//   const id = req.params.id
//   const body = req.body
//   console.log(body);
//   if (!body) {
//     return res.status(400).json({ message: "request body not found" })
//   }
//   if (!id) {
//     return res.status(400).json({ message: "id reference not found. send id in the params " })
//   }
//   const data = await getTodosFromFile()

//   for (let i = 0; i < data.length; i++) {
//     if (data[i].id === id) {
//       data[i].title = body.title
//       data[i].completed = body.completed
//       data[i].description = body.description ? body.description : data[i].description

//       fs.writeFile('todos.json', JSON.stringify(data), (err) => {
//         if (err) {
//           throw new Error(err)
//         }
//         return res.status(500).json({ message: "error writing the file" })
//       })
//       return res.status(200).json({ message: "updated" })
//     }
//   }

//   res.status(404).json({ message: "id not found" })
// })


// app.delete('/todos/:id', async (req, res) => {
//   const id = req.params.id
//   if (!id) {
//     return res.status(404).json({ message: "id not found in the params" })
//   }
//   let data = await getTodosFromFile()


//   data = data.filter((todo) => (todo.id != id))
//   fs.writeFile('todos.json', JSON.stringify(data), (err) => {
//     if (err) {

//       return res.status(500).json({ message: "error writing the file" })
//     }
//     res.status(200).json({ "message": "todo deleted successfully" })
//   })




// })

// // Catch-all for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });


// // app.listen(3000, () => {
// //   console.log("app is listening at port 3000");
// // })


// // Start server only if not imported (for testing)
// if (require.main === module) {
//   initializeTodosFile().then(() => {
//     app.listen(3000, () => {
//       console.log('App is listening at port 3000');
//     });
//   }).catch((err) => {
//     console.error('Failed to initialize todos file:', err);
//     process.exit(1);
//   });
// }

// module.exports = app;


const express = require('express');
const fs = require('fs');
const fsPromises = require('fs/promises');
const ShortUniqueId = require('short-unique-id');



const app = express();
app.use(express.json())
const { randomUUID } = new ShortUniqueId({ length: 10 }); // Shorter UUIDs for simplicity


// File path for persistence
const TODO_FILE = 'todos.json';

// Initialize todos.json if it doesn’t exist
async function initializeTodosFile() {
  if (!fs.existsSync(TODO_FILE)) {
    await fsPromises.writeFile(TODO_FILE, JSON.stringify([]), 'utf-8');
  }
}

// Read todos from file
async function getTodosFromFile() {
  try {
    const data = await fsPromises.readFile(TODO_FILE, 'utf-8');
    return JSON.parse(data || '[]'); // Return empty array if file is empty
  } catch (err) {
    console.error('Error reading todos file:', err);
    throw err; // Let caller handle the error
  }
}

// Write todos to file
async function saveTodosToFile(todos) {
  try {
    await fsPromises.writeFile(TODO_FILE, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing todos file:', err);
    throw err;
  }
}

// 1. GET /todos - Retrieve all todo items
app.get('/todos', async (req, res) => {
  try {
    const todos = await getTodosFromFile();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error: could not read todos' });
  }
});

// 2. GET /todos/:id - Retrieve a specific todo item by ID
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  try {
    const todos = await getTodosFromFile();
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      res.status(200).json(todo); // Return full todo object
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: could not read todos' });
  }
});

// 3. POST /todos - Create a new todo item
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required and must be a string' });
  }
  try {
    const todos = await getTodosFromFile();
    const newTodo = {
      id: randomUUID(),
      title,
      description: description || '',
      completed: false, // Default value
    };
    todos.push(newTodo);
    await saveTodosToFile(todos);
    res.status(201).json({ id: newTodo.id }); // Return only the ID as per spec
  } catch (err) {
    res.status(500).json({ message: 'Server error: could not save todo' });
  }
});



// 4. PUT /todos/:id - Update an existing todo item by ID
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  try {
    const todos = await getTodosFromFile();
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    // Update only provided fields
    todos[todoIndex] = {
      ...todos[todoIndex],
      title: title !== undefined ? title : todos[todoIndex].title,
      description: description !== undefined ? description : todos[todoIndex].description,
      completed: completed !== undefined ? completed : todos[todoIndex].completed,
    };
    await saveTodosToFile(todos);
    res.status(200).json(todos[todoIndex]); // Return updated todo
  } catch (err) {
    res.status(500).json({ message: 'Server error: could not update todo' });
  }
});

// 5. DELETE /todos/:id - Delete a todo item by ID
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Todo ID is required' });
  }
  try {
    const todos = await getTodosFromFile();
    const initialLength = todos.length;
    const updatedTodos = todos.filter((t) => t.id !== id);
    if (updatedTodos.length === initialLength) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    await saveTodosToFile(updatedTodos);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: could not delete todo' });
  }
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server only if not imported (for testing)
if (require.main === module) {
  initializeTodosFile().then(() => {
    app.listen(3000, () => {
      console.log('App is listening at port 3000');
    });
  }).catch((err) => {
    console.error('Failed to initialize todos file:', err);
    process.exit(1);
  });
}

module.exports = app;