import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {user} from '../Model/Signup.js'

const userauth=Router();


userauth.post('/signup',async(req,res)=>{
    try{
        const {FirstName,LastName,UserName,Password,UserRole}=req.body;
        console.log(UserName);
        
        const existingUser=await user.findOne({username:UserName})
       if(existingUser){
           res.status(400).send("UserName Alredy Exist")    //sending the response back to the client by using res and send is a method
           console.log("Username Alredy EXist");
       }
       else{
            // if we only want to set this after checking the username
           const newPassword= await bcrypt.hash(Password,10);
           console.log(newPassword);
           
           //user.set(UserName,{FirstName,LastName,Password:newPassword,Role});
           const newUser=new user({
               firstname:FirstName,
               lastname:LastName,
               username:UserName,
               password:newPassword,
               userrole:UserRole

           });
           await newUser.save();
           res.status(201).send("Signup Successfull")
           console.log("signed Up")
}
}
catch{
   res.status(500).send("Internal Server Error")
   
}

});




userauth.post('/login',async (req,res)=>{
    try{
     
        const {UserName,Password}=req.body;
        
        const result=await user.findOne({username:UserName})
        if(!result){
            res.status(200).send("Enter a valid UserName")
        }
        else{

            //password is comparing
            console.log(result.password);
            const valid= await bcrypt.compare(Password,result.password);
            console.log(valid);
            //setting a token
            if(valid){
               const token= jwt.sign({UserName:UserName,UserRole:result.userrole},process.env.SECRET_KEY,{expiresIn:'1h'}) //to create token sign function used  here the payload contain the data with some uniqe keys and is this the same secret key 
               console.log(token);
          
               
               //setting the cookie
               res.cookie('AuthToken',token,
                {
                httpOnly:true //Flags the cookie to be accessible only by the web server.
               });
               res.status(200).json({message:"Loggedin Successfully"})
            }
            else{
                res.status(401).send("Unautherised Access")
            }
        }

        
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
});

userauth.get('/logout',(req,res)=>{
    res.clearCookie('AuthToken');
    res.status(200).json({msg:"Successfully Logged Out"})
})

export {userauth}