"use strict";
const five = require("johnny-five");
const board = new five.Board();
const io = require("socket.io-client");

board.on("ready", () => {

    let led = new five.Led(13);
    const potentiometer = new five.Sensor({
      pin: "A2",
      freq: 250
    });

    const socket = io.connect("http://localhost:8888");

    socket.on('connected', () => {

        board.repl.inject({
            pot: potentiometer
        });

        // "data" get the current reading from the photoresistor
        potentiometer.on("data", (value) => {
            led.blink(value);
            socket.emit("data",value);
        });

    });
});
