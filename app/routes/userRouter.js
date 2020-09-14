const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require('../middlewares/verifyToken');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/home", verifyToken, userController.home);
router.get("/logout", userController.logout);

module.exports = router;
