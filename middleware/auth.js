const jwt=require('jsonwebtoken');
const asyncHandler=require('../middleware/async');
const user=require("../models/user");
const ErrorResponse=require("../utils/errorResponse");

const protect=asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new ErrorResponse('you are not authorized to access this route',401));
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await user.findById(decode.id);
        next();
    }catch(error){
        return next(new ErrorResponse('you are not authorized to access this route',401));
    }
})

module.exports={protect};