import { Schema } from "mongoose";
import{ model} from 'mongoose'
const BookSchema = new Schema({  
    bookname: { type: String, required: true, unique: true },  
    author: { type: String, required: true }, 
    genre: { type: String, required: true },  
    publishdate: { type: String, required: true },
    noofcopy: { type: Number, required: true },  
    image: String
});

const addbook = model('books', BookSchema);
export { addbook };
