import { Schema } from "mongoose";
import{ model} from 'mongoose'
const UserSchema=new Schema({  
    firstname:String,
    lastname:String,
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userrole:{type:String,required:true}
    
});
const user=model('signup',UserSchema) 
export {user}