import User from "../models/user.js"
import {compare, hash} from "bcrypt"
import { tokenGen } from "../utils/token-gen.js"
import { COOKIE_NAME } from "../utils/constants.js"




export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find()
        return res.status(200).json({message:"DATA Fetched",users})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error",error:error.message})
    }


}

export const userSignUp =async(req,res,next)=>{
try {
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){ return res.status(401).send("user already registered")}
    const hashedPassword = await hash(password,10);
    const user = new User({name,email,password:hashedPassword})
    await user.save();
    //creating a token and cookie
    const token = tokenGen(user._id.toString(),user.email,"7d")
    res.clearCookie(COOKIE_NAME,{
        httpOnly: true,
        domain:"localhost",
        signed:"true",
        path:"/",
    })


    const expires = new Date()
    expires.setDate(expires.getDate()+7)    
    res.cookie(COOKIE_NAME,token,{
        path:"/",
        domain:"localhost",
        expires,
        httpOnly:true,
        signed:true
       })

    
    return res.status(200).json({message:"user Created",id:user._id.toString()})
} catch (error) {
    console.log(error)
    return res.status(200).json({error:error.message})
}


}

export const userLogin = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).send("user doesnt exist")
        } 
        const passCorrect = await compare(password,user.password)
        if(!passCorrect){
            return res.status(403).send("password is incorrect")
        }
        const token = tokenGen(user._id.toString(),user.email,"7d")
        res.clearCookie(COOKIE_NAME,{
            httpOnly: true,
            domain:"localhost",
            signed:"true",
            path:"/",
        })


        const expires = new Date()
        expires.setDate(expires.getDate()+7)    
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true
           })
    
        return res.status(200).json({message:"logged in",id:user._id.toString()})
            
    } catch (error) {
        console.log(error)
        return res.status(200).json({message:"error",error:error.message})
    }
}