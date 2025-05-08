import { Schema } from "mongoose";
import{ model} from 'mongoose'
const IssueSchema=new Schema({  
    bookname:{type:String,required:true,unique:true},
    username:{type:Schema.Types.ObjectId,ref:"signup",required:true},
    phonenumber:{type:String,required:true},
    quantity:{type:String,required:true},
    issuedate:{type:String,required:true} 
});
const issuebook=model('Issuebook',IssueSchema) 
export default issuebook

