const app = require('./server');
const port = process.env.PORT || 8082;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, 
    useFindAndModify: false, useCreateIndex: true });
const db = mongoose.connection;
db.once("open", (_) => {
    console.log("db connection established");
});
db.on("error", (err) => {
    console.log("connection error:", err);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
