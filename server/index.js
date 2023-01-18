const mongoose = require("mongoose")
const Msg = require("./models/messages")
const express = require("express")
const app = express()
const port = 4000
const mongodb = "mongodb://localhost:27017";

const http = require("http").Server(app)
const cors = require("cors")

app.use(cors())

const socketIO = require('socket.io')(http)

mongoose.set('strictQuery', false);

mongoose.connect(mongodb).then(() => {
  console.log("connected to the database")
})

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    Msg.find().then(result => {
      /*
      result.forEach(message => {
        console.log(message.msg);
      })
      */
      socket.emit("output-messages", result);
    })

    socket.on("message", (msg) => {
        const message = new Msg({msg});
        message.save().then(() => {
          console.log(msg);
          socketIO.emit("message", msg);
        })
      })
    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
    });
});

http.listen(port, () => {
    console.log("listening on 4000")
})