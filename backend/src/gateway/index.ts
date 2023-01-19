// import app from "..";
import mongoose from "mongoose";
import Messaging from "../models/Messages";
const app = require("../index")
const http = require("http").Server(app)
const socketIO = require('socket.io')(http)

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    Messaging.find().then(result => {
      socket.emit("output-messages", result);
    })

    socket.on("message", (msg) => {
        const message = new Messaging({msg});
        message.save().then(() => {
          console.log(msg);
          socketIO.emit("message", msg);
        })
      })
    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
    });
});