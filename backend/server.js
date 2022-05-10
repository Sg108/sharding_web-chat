const app = require('express')
const cors=require('cors')
const http = require('http').createServer(app())
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})
app().use(cors())

io.on('connection',socket=>{
    socket.on('message',({name,message,fid})=>{
        console.log(fid);
        io.emit('message',{name,message,fid})
    })
})
http.listen(5600,()=>{
    console.log("running on 5600")
})