'use strict'

const http = require('http');

const serveIndex = require('serve-index');

const express = require('express');
const app = express();

//顺序不能换
app.use(serveIndex('./project'));
app.use(express.static('./project'));

const http_server = http.createServer(app);
http_server.listen(80, '0.0.0.0');

// 配置socket.IO
const io = require('socket.io')(http_server,{
	cors: {
		origin: '*'
	}
});


io.sockets.on('connect', (socket)=>{
	console.log("socket id 为" + socket.id + "请求加入房间")
	socket.on('message', (room, data)=>{
		socket.to(room).emit('message', room, data)//房间内所有人,除自己外
	});

	//该函数应该加锁
    // 加入时的信令
	socket.on('join', (room)=> {

		socket.join(room);
		var myRoom = io.sockets.adapter.rooms[room];
		var users = Object.keys(myRoom.sockets).length;
        console.log(socket.id + "加入房间");
		console.log('the number of user in room is: ' + users);
		// //在这里可以控制进入房间的人数,现在一个房间最多 2个人
		// //为了便于客户端控制，如果是多人的话，应该将目前房间里
		// //人的个数当做数据下发下去。
		// if(users < 3) {
		// 	socket.emit('joined', room, socket.id);	
		// 	if (users > 1) {
		// 		socket.to(room).emit('otherjoin', room);//除自己之外
		// 	}
		// }else {
		// 	socket.leave(room);
		// 	socket.emit('full', room, socket.id);	
		// }
	 	//socket.to(room).emit('joined', room, socket.id);//除自己之外
		//io.in(room).emit('joined', room, socket.id)//房间内所有人
	 	//socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点	
	});

    // 离开时的信令
	socket.on('leave', (room)=> {
		var myRoom = io.sockets.adapter.rooms[room];
		var users = Object.keys(myRoom.sockets).length;
		//users - 1;
        console.log(socket.id + "离开房间");
		console.log('the number of user in room is: ' + (users-1));

		socket.leave(room);
		socket.to(room).emit('bye', room, socket.id)//房间内所有人,除自己外
	 	socket.emit('leaved', room, socket.id);	
	 	//socket.to(room).emit('joined', room, socket.id);//除自己之外
		//io.in(room).emit('joined', room, socket.id)//房间内所有人
	 	//socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点	
	});

});


