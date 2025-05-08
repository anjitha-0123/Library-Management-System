import {Router} from "express";
import { authenticate } from "../Middleware/auth.js";
import { admincheck } from "../Middleware/admincheck.js";
import { addbook } from "../Model/addbook.js";
import {upload} from '../Middleware/upload.js'
import {user} from '../Model/Signup.js'
import issuebook from "../Model/issuebook.js";


const adminauth=Router();
const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};



adminauth.post('/addBook',authenticate,admincheck,upload.single("BookImage"),async(req,res)=>{
    try
    {
        const {Bookname,Author,Genre,Publishdate,Noofcopy}=req.body;
        const existingBook=await addbook.findOne({bookname:Bookname})
        
        if(existingBook)
            {
            res.status(400).send("Bad request");
            }
        else
        {   
            let imageBase64 = null;
        if (req.file)
             {
               imageBase64 = convertToBase64(req.file.buffer);
             }
            
            const newBook=new addbook({
                      bookname:Bookname,
                      author:Author,
                      genre:Genre,
                      publishdate:Publishdate,
                      noofcopy:Noofcopy,
                      image:imageBase64
        });
        await newBook.save();

        res.status(201).send("Book added successfully");
        console.log("Book added");

        }

    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).send("Internal Server Error")

    }
});

// adminauth.get('/viewbook',async(req,res)=>{
//     const name=req.query.Bookname;
//     console.log(name);

//     const Details=await addbook.findOne({bookname:name});
//     console.log(Details);
//     try{
//         if(Details){
//             res.status(200).json({data:Details});
//         }
//         else
//         {
//             res.status(404).json({msg:'No such Book'})
//         }
    
//     }
//     catch{
//         res.status(500).send("Internal Server Error")
//     }

// });

// adminauth.get('/viewbook',async(req,res)=>{
    
//     const Details=await addbook.find();
//     console.log(Details);
//     try{
//         if(Details){
//             res.status(200).json({data:Details});
//         }
//         else
//         {
//             res.status(404).json({msg:'No such Book'})
//         }
    
//     }
//     catch{
//         res.status(500).send("Internal Server Error")
//     }

// });


adminauth.get('/viewbook', async (req, res) => {
    try {
        const name = req.query.bookname || req.query.Bookname;
        
        if (!name) {
            return res.status(400).json({ msg: "Bookname query parameter is required" });
        }

        const details = await addbook.findOne({ bookname: name });

        if (details) {
            return res.status(200).json({ data: details });
        } else {
            return res.status(404).json({ msg: "No such book" });
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Fetch all books (Different route)
adminauth.get('/viewbooks', async (req, res) => {
    try {
        const details = await addbook.find();

        if (details.length > 0) {
            return res.status(200).json({ data: details });
        } else {
            return res.status(404).json({ msg: "No books found" });
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
    }
});



adminauth.patch('/Updatebook',authenticate,admincheck,async(req,res)=>{
    try
    {
        const {Bookname,Noofcopy}=req.body;
        console.log(Noofcopy);

        const result=await addbook.findOne({bookname:Bookname});
        console.log(result);
        if(result){
            
            result.noofcopy=Noofcopy;

            await result.save();

            res.status(201).send("Book successfuly updated")
            
            }
            else{
                res.status(404).send("Book Not Found")
            }
    }
    catch(error){
        console.log(error);
        
        res.status(500).send("Internal Server Error")
    }
});

adminauth.post('/issuebook',authenticate,admincheck,async(req,res)=>{
    try
    {
        const {Bookname,Phonenumber,Quantity,Issuedate}=req.body;

        const User=await user.findOne({username:req.UserName})
        console.log(User);
       
        console.log("hi");
        
        const Book=await issuebook.findOne({bookname:Bookname})
        console.log(Book);
        console.log("heloo");
        
       
         const NewIssue= new issuebook({
            bookname:Bookname,
            username:User._id,
            phonenumber:Phonenumber,
            quantity:Quantity,
            issuedate:Issuedate
         })

         await NewIssue.save();
          res.status(201).send("Book Issued")
        
        
    }
    catch(error)
    {
        console.log(error);
        
        res.status(500).send("Internal Server Error")
    }
});

adminauth.get('/getissuebook',async(req,res)=>{
    const name=req.query.Username;
    console.log(name);

    const Details=await user.findOne({username:name});
    console.log(Details);
    try{
        if(Details){
            res.status(200).json({data:Details});
        }
        else
        {
            res.status(404).json({msg:'No such Book'})
        }
    
    }
    catch{
        res.status(500).send("Internal Server Error")
    }

});


adminauth.delete('/Deletebook',authenticate,admincheck,async(req,res)=>{
    const Name=req.body.Bookname;
    console.log(Name);

    const Detail=await addbook.findOne({bookname:Name});
    console.log(Detail);
     try
     {
       if(Detail)
        {
        await addbook.findByIdAndDelete(Detail)
        res.status(200).send("Book Removed")
       }
       else
       {
        res.status(404).json({msg:'No such Book'})
       }

     }
     catch
     {
        res.status(500).send("Internal Server Error")
     }
});

export {adminauth}