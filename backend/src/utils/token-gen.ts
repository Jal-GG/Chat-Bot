import jwt from "jsonwebtoken";

export  const tokenGen =(name:string,email:string,expiresIn:string)=>{
    const payload = {name,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn})
    return token;
}