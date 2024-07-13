const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./config');
const cors = require('cors');
const user = require('./user');
const jwt = require('jsonwebtoken');
const key = 'chabi';
const server = app.listen(5000, ()=>{
    console.log(`Server on port 5000`);
})
//const io = require('socket.io')(server)

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

app.use(cors());
app.use(express.json());

app.post('/register', async (req, resp) => {
    
    let us = new user(req.body);
    let result = await us.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result}, key, {expiresIn: "2h"}, (err, token)=>{
        if(err){
            resp.send({result: "Something went wrong"});
        }
        else{
            resp.send({result, auth:token});
        }
    })

});

app.post('/login', async (req, resp) => {
    let us = await user.findOne(req.body).select("-password");
    if (us) {
        //resp.send(us);
        jwt.sign({us}, key, {expiresIn: "2h"}, (err, token)=>{
            if(err){
            resp.send({result:"Something went wrong"});
            }
            else{
                resp.send({result:us, auth:token});
            }
        })
    }
    else {
        resp.send({ result: "no result found" });
    }
});

function verifyToken(req, resp, next){
    let token = req.headers['authorization'];

    if(token){
        jwt.verify(token, key, (err, valid)=>{
            if(err)
            {
                resp.status(401).send({result: "token is invalid"});
            }
            else{
                next();
            }
        })
    }
    else{
        resp.status(403).send({result: "please add token in header"});
    }
}

const emailToSocket = new Map();
const SocketToEmail = new Map();

io.on('connection', (socket)=>{
    console.log("socket connected", socket.id);
    socket.on('room:join', (data)=>{
        const {email, room} = data;
        SocketToEmail.set(socket.id, email);
        emailToSocket.set(email, socket.id);
        io.to(room).emit('user:joined', {email, id:socket.id});
        socket.join(room);
        io.to(socket.id).emit('room:join', data);

    });

    socket.on('user:call', ({to, offer})=>{
        io.to(to).emit('incomming:call', {from:socket.id, offer});
    });

    socket.on('call:accepted', ({to, ans})=>{
        io.to(to).emit('call:accepted', {from:socket.id, ans});
    });

    socket.on('peer:nego:needed', ({offer, to})=>{
        io.to(to).emit('peer:nego:needed', {from:socket.id, offer});
    });

    socket.on('peer:nego:done', ({to, ans})=>{
        io.to(to).emit('peer:nego:final', {from:socket.id, ans});
    });

})

//app.listen(5000);

