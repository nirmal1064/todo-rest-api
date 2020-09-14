const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
},{ timestamps: true });

TodoSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("todo", TodoSchema);
