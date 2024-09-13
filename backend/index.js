import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors';
import { log } from 'console';


const port =3000

const app = express();
const server  = createServer(app);


const io = new Server(server,{cors:{
    origin: "*",
    methods:["GET","POST"],
    credentials:true
}
});
app.use(cors({
    origin: "*",
    methods:["GET","POST"],
    credentials:true
}))

io.on("connection",(socket)=>{
    socket.broadcast.emit("join")
    socket.emit("senddet",socket.id)
    socket.on("message",(data)=>{
        socket.broadcast.emit("recived-message",data);
    })
    socket.on("join",(data)=>{
        socket.broadcast.emit("joinedmsg",data);
    })
    
    
})

app.get('/',(req,res)=>{
    res.send('Hello World');
});


server.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})