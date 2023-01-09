const express = require("express")
const app = express()
const port = 4000

const http = require("http").Server(app)
const cors = require("cors")

app.use(cors())

const socketIO = require('socket.io')(http)

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    socket.on("message", (data) => {
        console.log(data);
        socketIO.emit("message", data);
      })
    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
    });
});

http.listen(port, () => {
    console.log("listening on 4000")
})