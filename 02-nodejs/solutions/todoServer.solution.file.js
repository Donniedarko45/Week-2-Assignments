const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path")
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors()); // let the request come from anywhere..
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  console.log("Received a GET request for /todos");

  // her
  fs.readFile(__dirname + "/todos.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    try {
      const todos = JSON.parse(data); // this is responsible for parsing the data from string to javascript object
      console.log("Todos fetched:", todos);
      res.json(todos);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(400).json({ error: "Error in JSON format" });
    }
  });
});


app.get('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      res.json(todos[todoIndex]);
    }
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  fs.readFile(__dirname+"/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile(__dirname+"/todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description
      };
      todos[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });
});

app.delete('/todos/:id', (req, res) => {

  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

app.get("/",(req,res)=>{
  res.sendFile(path.join("C:/Users/karti/computer science/100xdev/assignment-2/fileServer/index.html"))
})

app.listen(3000)