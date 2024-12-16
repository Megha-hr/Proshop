import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from'dotenv';
import cookieParser from 'cookie-parser'
dotenv.config();
import connectDB from './config/db.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
const port=process.env.PORT||5000;
import fs from 'fs';

connectDB();
const app=express()

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());


app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname,'..', 'frontend', 'build', 'index.html');
    console.log(fs.existsSync(buildPath));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    
  );
}else{
    app.get('/',(req,res)=>{
        res.send("Api is running");
    })
    
}
console.log(fs.existsSync(buildPath));
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`server running on port ${port}`))