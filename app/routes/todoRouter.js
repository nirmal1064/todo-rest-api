const router = require("express").Router();
const todoController = require("../controllers/todoController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);
router.post("/", todoController.createTodo);

router.get("/", todoController.findTodo);

router.get("/completed", todoController.findCompletedTodos);

router.get("/incomplete", todoController.findIncompleteTodos);

router.get("/:id", todoController.findTodoById);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodoById);

router.delete("/", todoController.deleteAllTodos);

module.exports = router;
