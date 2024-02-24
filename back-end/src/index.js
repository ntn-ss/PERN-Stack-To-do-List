// import
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./controllers/db.controller');

// middleware
app.use(cors());
app.use(express.json()); // allows req.body

// routes
const todoRoutes = require('./routes/todo.routes')(express, pool);
app.use('/todos', todoRoutes);

// start
app.listen(5000, ()=>{
    console.log("Server has started on port 5000.");
});

module.exports = { express, app, cors, pool };