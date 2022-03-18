import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app)

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket)=> {
    console.log(socket.id);

    socket.on('join_room', (data)=> {
        console.log(`user with id ${socket.id} joined room ${data}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message',data)
    })

    socket.on('disconnect', ()=> {
        console.log('disconect');
    })
})

server.listen(3001, ()=> {
    console.log('listen on 3001')
})