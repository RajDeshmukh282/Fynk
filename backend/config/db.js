import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectDB =  async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("DB connected");
         
    }
    catch (error){
        console.log("DB Error! ", error);
        
    }
}
export default connectDB
