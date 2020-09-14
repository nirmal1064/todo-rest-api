const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const logger = require('morgan');
const todoRouter = require('./app/routes/todoRouter');
const userRouter = require('./app/routes/userRouter');
app.use(cors());
require("dotenv").config();
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo', todoRouter);
app.use('/api', userRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});
module.exports = app;
