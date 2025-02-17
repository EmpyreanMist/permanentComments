import mongoose from 'mongoose';

//  Define the schema and store it in a variable
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

//  Use the schema to create a model
const Comment = mongoose.model('Comment', commentSchema);

//  Export the model
export default Comment;
