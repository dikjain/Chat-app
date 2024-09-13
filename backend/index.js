import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors';
import path from 'path';


const port =3000

const app = express();
const server  = createServer(app);


const io = new Server(server,{cors:{
    origin: "*",
    methods:["GET","POST"],
    credentials:true
}
});

const __dirname = path.resolve()


app.use(express.static(path.join(__dirname, 'dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
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



server.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})