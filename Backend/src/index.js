import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import {dbConnection} from './db/db_connection.js';
import {userRoute} from './routes/user.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';

dotenv.config({ path: '../.env' }); 

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

dbConnection();

app.listen(process.env.PORT || 8000, (req, res)=>{
    console.log(`App is listening at PORT ${process.env.PORT || 8000}`);
});

app.get('/', (req, res)=>{
    res.send("Hi User!");
});

app.use('/users', userRoute);
app.use('/ai/chat', aiRoutes);

