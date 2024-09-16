import userModal from "../models/userModal.js"
import { comparePassword, hashPassword } from "../utils/authUtils.js"
import JWT from "jsonwebtoken"

export const registerController= async(req,res) =>{

    try {
        const {name,email,password,address,phone,answer} = req.body
        if(!name){
            return res.send({message:"Name is Required"})
        }
        if(!email){
            return res.send({message:"Email is Required"})
        }
        if(!password){
            return res.send({message:"Password is Required"})
        }
        if(!address){
            return res.send({message:"Address is Required"})
        }
        if(!phone){
            return res.send({message:"Phone Number is Required"})
        }
        if(!answer){
            return res.send({message:"answer Number is Required"})
        }
//checking  userr
const exitingUser = await userModal.findOne({email})
// checking exiting user 
if(exitingUser){
return res.status(200).send({
    success:false,
    message:'Already Register please login'
})
}
// register user
const hashedPassword = await hashPassword(password)
//save
const user = new userModal({name,email,phone,address,password:hashedPassword,answer}).save()

res.status(201).send({
    success:true,
    message:"User Register Succes",
    user
})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
        
    }

}

//post Login

export const loginController = async (req,res) =>{
    try {
        const {email,password} = req.body
        //validation
        if(!email|| !password){ // if the password and email are not match
            return res.status(404).send({
                success:false,
                message:"Invaliad creadintial"
            })
        }
        //check user
        const user = await userModal.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email not register"
            })
        }
const match = await comparePassword(password,user.password)
        if (!match) {
            return res.status(200).send({
                success:false,
                message:"Invalid password "
            })
            
        }

        //token
        const token = await JWT.sign({
            _id:user._id
        },process.env.JWT_SECRET,{expiresIn:"7d",})
        res.status(200).send({
            success:true,
            message:"login succesfully ",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}


export const frogotPasswordController = async (req,res) =>{
try {
    const {email,answer,newPassword} = req.body
    if(!email){
        res.status(400).send({message:'Email is required'})
    }
    if(!answer){
        res.status(400).send({message:'answer is required'})
    }
    if(!newPassword){
        res.status(400).send({message:'Nem password is required'})
    }

    //check
const user = await userModal.findOne({email,answer})
//validation
if(!user){
    return res.status(404).send({
        success:false,
        message:"Wrong Email or Answer"
    })
}
const hashed = await hashPassword(newPassword)
await userModal.findByIdAndUpdate(user._id,{password:hashed})
res.status(200).send({
    success:true,
    message:"Password Reset Succesfully"
})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'somthing went wrong',
        error
    })
}
}


export const testController = (req,res) =>{
    try{
        
        res.send("protected Routes")
    }catch(error){
        console.log(error)
        res.send({error})
    }
}
// export default {registerController}