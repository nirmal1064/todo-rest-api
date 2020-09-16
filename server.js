const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const todoRouter = require('./app/routes/todoRouter');
const userRouter = require('./app/routes/userRouter');
const logger = require('morgan');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    app.use(logger('dev'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/todo', todoRouter);
app.use('/api', userRouter);
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});
module.exports = app;
