"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoDB = require("./config/mongoDB");

var _express = _interopRequireDefault(require("express"));

var _environments = require("./config/environments");

var _routes = require("./routes");

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

require("dotenv").config();

(0, _mongoDB.connectDB)().then(function () {
  console.log('connected db server');
  (0, _mongoDB.initialDB)();
}).then(function () {
  bootServer();
})["catch"](function (err) {
  console.log(err);
  process.exit();
});

var bootServer = function bootServer() {
  var app = (0, _express["default"])(); // parse requests of content-type - application/json

  app.use((0, _expressFileupload["default"])());
  app.use(_express["default"].json({
    limit: '50mb'
  }));
  app.use((0, _cors["default"])()); // parse requests of content-type - application/x-www-form-urlencoded

  app.use(_express["default"].urlencoded({
    extended: true
  })); // socket.io

  var server = _http["default"].createServer(app);

  var io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  var socketList = {}; // Socket

  io.on('connection', function (socket) {
    console.log("New User connected: ".concat(socket.id));
    socket.on('disconnect', function () {
      socket.disconnect();
      console.log('User disconnected!');
    });
    socket.on('BE-check-user', function (_ref) {
      var roomId = _ref.roomId,
          userName = _ref.userName;
      var error = false;
      io.sockets["in"](roomId).clients(function (err, clients) {
        clients.forEach(function (client) {
          if (socketList[client] == userName) {
            error = true;
          }
        });
        socket.emit('FE-error-user-exist', {
          error: error
        });
      });
    });
    /**
     * Join Room
     */

    socket.on('BE-join-room', function (_ref2) {
      var roomId = _ref2.roomId,
          userName = _ref2.userName;
      // Socket Join RoomName
      socket.join(roomId);
      console.log(roomId, userName);
      socketList[socket.id] = {
        userName: userName,
        video: true,
        audio: true
      }; // Set User List

      var clients = io.sockets.adapter.rooms.get(roomId); // comment
      // io.sockets.in(roomId).clients((err, clients) => {

      try {
        var users = [];
        clients.forEach(function (client) {
          // Add User List
          users.push({
            userId: client,
            info: socketList[client]
          });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users); // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets["in"](roomId).emit('FE-error-user-exist', {
          err: true
        });
      } // });

    });
    socket.on('BE-call-user', function (_ref3) {
      var userToCall = _ref3.userToCall,
          from = _ref3.from,
          signal = _ref3.signal;
      io.to(userToCall).emit('FE-receive-call', {
        signal: signal,
        from: from,
        info: socketList[socket.id]
      });
    });
    socket.on('BE-accept-call', function (_ref4) {
      var signal = _ref4.signal,
          to = _ref4.to;
      io.to(to).emit('FE-call-accepted', {
        signal: signal,
        answerId: socket.id
      });
    });
    socket.on('BE-send-message', function (_ref5) {
      var roomId = _ref5.roomId,
          msg = _ref5.msg,
          sender = _ref5.sender;
      io.sockets["in"](roomId).emit('FE-receive-message', {
        msg: msg,
        sender: sender
      });
    });
    socket.on('BE-leave-room', function (_ref6) {
      var roomId = _ref6.roomId,
          leaver = _ref6.leaver;
      delete socketList[socket.id];
      socket.broadcast.to(roomId).emit('FE-user-leave', {
        userId: socket.id,
        userName: [socket.id]
      }); // io.sockets.socket[socket.id].leave(roomId);

      socket.leave(roomId);
    });
    socket.on('BE-toggle-camera-audio', function (_ref7) {
      var roomId = _ref7.roomId,
          switchTarget = _ref7.switchTarget;

      if (switchTarget === 'video') {
        socketList[socket.id].video = !socketList[socket.id].video;
      } else {
        socketList[socket.id].audio = !socketList[socket.id].audio;
      }

      socket.broadcast.to(roomId).emit('FE-toggle-camera', {
        userId: socket.id,
        switchTarget: switchTarget
      });
    });
  });
  server.listen(process.env.APP_WS_PORT || 8000, function () {
    return console.log('socket is running on port 8000');
  }); // routes

  app.use('/api', _routes.webRouter);
  app.listen(process.env.APP_PORT, function () {
    console.log("Server is running on port : ".concat(process.env.APP_PORT));
  });
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });
};