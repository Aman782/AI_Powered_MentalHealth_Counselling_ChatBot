import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import {dbConnection} from './db/db_connection.js';
import {userRoute} from './routes/user.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
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

