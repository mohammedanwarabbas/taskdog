const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const TodoModel = require('./Models/Todo');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/db1');

app.get('/getdata/',(req,res)=>{
    TodoModel.find()
    .then(result => {res.json(result)})
    .catch(err => {res.json(err)});
})

app.post('/adddata/',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => {res.json(result)})
    .catch(err=>{res.json(err)});
})

app.put('/updatetask/:id', (req, res) => {
    const taskId = req.params.id;
    const done = req.body.done;

    TodoModel.findByIdAndUpdate(taskId, { done }, { new: true })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.delete('/deletetask/:id', (req, res) => {
    const todoId = req.params.id;

    TodoModel.findByIdAndDelete(todoId)
        .then((deletedTodo) => {
            if (!deletedTodo) {
                res.status(404).json({ error: 'Todo not found' });
            } else {
                res.status(200).json({ message: 'Todo deleted successfully' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});


