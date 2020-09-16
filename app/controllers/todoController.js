const Todo = require("../models/todo");

const createTodo = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({message: "Title cannot be empty"});
        return;
    }
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        userId: req.userId,
        completed: req.body.completed ? req.body.completed : false
    });
    todo.save((err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.status(500).send({message: err.message || "Error in inserting "});
        }
    });
};

const updateTodo = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, result) => {
        if (!err) {
            if (!result) {
                res.status(404).send({ message: "Can't update as No TODO find with id " + id });
            } else {
                res.send({ message: "TODO updated successfully." });
            }
        } else {
            res.status(500).send({message: err.message || "Error in Updating "});
        }
    });
};

const deleteTodoById = (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndRemove(id, (err, result) => {
        if (!err) {
            if (!result) {
                res.status(404).send({ message: "Can't delete as No TODO find with id " + id});
            } else {
                res.send({ message: "TODO was deleted successfully." });
            }
        } else {
            res.status(500).send({message: err.message || "Error in deleting "});
        }
    });
};

const deleteAllTodos = (req, res) => {
    Todo.deleteMany({ userId: req.userId }, (err, result) => {
        if (!err) {
            if (!result) {
                res.status(404).send({ message: "Can't delete as no todos present"});
            } else {
                res.send({ message: "All TODOs were deleted successfully"});
            }
        } else {
            res.status(500).send({message: err.message || "Error in deleting "});
        }
    });
};

const findTodo = (req, res) => {
    const title = req.query.title;
    const userIdcondition = {
        title: { $regex: new RegExp(title), $options: "i" },
        userId: req.userId
    }
    const condition = title ? { userIdcondition } : { userId: req.userId };
    Todo.find(condition, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send({message: err.message || "No Todo"});
        }
    });
};

const findTodoById = (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, result) => {
        if (!err) {
            if (!result) {
                res.status(404).send({ message: "No TODO find with id " + id });
            } else {
                res.send(result);
            }
        } else {
            res.status(500).send({message: err.message || "Error in inserting "});
        }
    });
};

const findIncompleteTodos = (req, res) => {
    Todo.find({ completed: false }, (err, result) => {
        if (!err) {
            if (result) {
                res.send(result);
            } else {
                res.send({ message: "No Incomplete Todos found"});
            }
        } else {
            res.status(500).send({message: err.message || "Error in fetching Todos"});
        }
    });
};

const findCompletedTodos = (req, res) => {
    Todo.find({ completed: true }, (err, result) => {
        if (!err) {
            if (result) {
                res.send(result);
            } else {
                res.send({ message: "No Completed Todos found"});
            }
        } else {
            res.status(500).send({message: err.message || "Error in fetching Todos"});
        }
    });
};

module.exports = {createTodo,  findIncompleteTodos, findTodo, deleteAllTodos,
                  updateTodo, deleteTodoById, findTodoById, findCompletedTodos};
