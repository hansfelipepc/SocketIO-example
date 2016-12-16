"use strict";
const http = require('http').createServer(server),
    fs = require('fs'),
    io = require('socket.io')(http);

let conexions = 0;

function server(req, res) {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500,{'Content-Type' : 'text/html'});
            return res.end('<h1>Error Interno del Servidor</h1>');
        } else {
            res.writeHead(200,{'Content-Type' : 'text/html'});
            return res.end(data, 'utf-8');
        }
    });
}

http.listen(3000, ()=> console.log('servidor corriendo en el 3000'));

io.on('connection', (socket) =>{
    socket.emit('hello', {message: 'Hola, con Socket.IO'});
    socket.on('otro evento inventado', data => console.log(data));
    conexions++;
    console.log(`Conexiones activas: ${conexions}`);
    socket.emit('connect users', {numbers: conexions});
    socket.broadcast.emit('connect users', {numbers: conexions});

    socket.on('disconnect', () => {
        conexions--;
        console.log(`Conexiones activas: ${conexions}`);
        socket.broadcast.emit('connect users', {numbers: conexions});
    });
} );