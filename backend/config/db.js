import mongoose from 'mongoose'
import dotenv from'dotenv';
dotenv.config();

const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected ${conn.connection.host}`);
    }catch(error){
        console.error(`Connection Error: ${error.message}`, error);

        process.exit(1);

    }
}
export default connectDB;