const express = require('express');
const app = express();
const http = require('http');
const socketio= require('socket.io')
const server = http.createServer(app)
const path = require('path');
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

 io.on('connection', (socket) => {
    socket.on("send-location", (data) => {
        console.log(data)
        io.emit("receive-location", {id: socket.id, ...data})
    })
    console.log('New client connected');
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
});

app.get('/', (req, res) => {
    res.render('index')
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
