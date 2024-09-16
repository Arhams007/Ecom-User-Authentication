import express from "express"
import {frogotPasswordController, loginController, registerController, testController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"
//router object
const router = express.Router()
//routing
//Register || Method post
router.post(`/register`,registerController)

//LOGIN || METHOD POST
router.post('/login',loginController)

//frogot password

router.post('/frogot-password',frogotPasswordController)

//Protected Route,user route
router.get('/user-auth',  requireSignIn,(req , res) => {
    res.status(200).send({ok:true})
})

//Protected Route,admin route
router.get('/admin-auth',  requireSignIn,isAdmin,(req , res) => {
res.status(200).send({ok:true})
})

//test routes
router.get("/test",requireSignIn,isAdmin,testController)

export default router