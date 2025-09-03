import express from "express"
import isAuth from "../middlewares/isAuth.js"

const userRouter = express.Router()
userRouter.get("/current", isAuth, getCurrentUser);
export default userRouter