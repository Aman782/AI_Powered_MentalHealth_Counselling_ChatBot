    // import dotenv from 'dotenv';
    // import express from 'express';
    // import cookieParser from 'cookie-parser';
    // import {dbConnection} from './db/db_connection.js';
    // import {userRoute} from './routes/user.routes.js';
    // import aiRoutes from './routes/ai.routes.js';
    // import {Server} from 'socket.io';
    // import http from 'http';
    // import cors from 'cors';

    // dotenv.config({ path: '../.env' }); 

    // const app = express();
    // app.use(cors({
    //     origin: 'http://localhost:5173', 
    //     methods: ["GET", "POST", "PUT", "DELETE"],
    //     credentials: true,
    // }));

    // const server = http.createServer(app);
    // const io = new Server(server, {
    //     cors: {
    //       origin: 'http://localhost:5173',
    //       methods: ["GET", "POST", "PUT", "DELETE"],
    //       credentials: true
    //     }
    //   });

    // app.set('socketio', io);
    // app.use(cookieParser());
    // app.use(express.json());
    // app.use(express.urlencoded({extended:true}));
    // app.use(express.static("public"));

    // dbConnection();

    // server.listen(process.env.PORT || 8000, (req, res)=>{
    //     console.log(`App is listening at PORT ${process.env.PORT || 8000}`);
    // });

    // app.get('/', (req, res)=>{
    //     res.send("Hi User!");
    // });

    // app.use('/users', userRoute);
    // app.use('/ai/chat', aiRoutes);



    import dotenv from 'dotenv';
    import express from 'express';
    import cookieParser from 'cookie-parser';
    import { dbConnection } from './db/db_connection.js';
    import { userRoute } from './routes/user.routes.js';
    import aiRoutes from './routes/ai.routes.js';
    import { Server } from 'socket.io';
    import http from 'http';
    import cors from 'cors';

    dotenv.config({ path: '../.env' }); 

    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173', 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));

    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
        }
    });

    // 👇 Important: Set io instance
    app.set('socketio', io);

    // 👇 Handle socket.io connection here
    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);

        const userId = socket.handshake.query.userId; // get the userId from query

        if (userId) {
            socket.join(userId); // join a private room based on userId
            console.log(`User with ID ${userId} joined their private room.`);
        } else {
            console.log('No userId provided in socket connection.');
        }

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    dbConnection();

    server.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening at PORT ${process.env.PORT || 8000}`);
    });

    app.get('/', (req, res) => {
        res.send("Hi User!");
    });

    app.use('/users', userRoute);
    app.use('/ai', aiRoutes);
