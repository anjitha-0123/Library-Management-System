const admincheck=(req,res,next)=>{
    if(req.UserRole=='admin'){
        next();
    }
    else
    {
        res.status(404).send("Not found")
    }
}
export {admincheck}