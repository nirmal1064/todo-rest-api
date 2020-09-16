const router = require("express").Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const signupValidator = require('../middlewares/validator');

router.post("/register", signupValidator(), userController.register);
router.post("/login", userController.login);
router.get("/home", verifyToken, userController.home);
router.get("/logout", userController.logout);

module.exports = router;
