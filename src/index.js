require("dotenv").config();
import { connectDB, initialDB } from './config/mongoDB';
import express from 'express';
import { env } from './config/environments';
import { webRouter } from './routes';
import cors from 'cors';
import http from 'http';
import fileUpload from 'express-fileupload';

connectDB()
  .then(() => {
    console.log('connected db server');
    initialDB();
  })
  .then(() => {
    bootServer();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

const bootServer = () => {
  const app = express();
  // parse requests of content-type - application/json
  app.use(fileUpload());
  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // socket.io
  const server = http.createServer(app);
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  let socketList = {};

  // Socket
  io.on('connection', socket => {
    console.log(`New User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      socket.disconnect();
      console.log('User disconnected!');
    });

    socket.on('BE-check-user', ({ roomId, userName }) => {
      let error = false;

      io.sockets.in(roomId).clients((err, clients) => {
        clients.forEach(client => {
          if (socketList[client] == userName) {
            error = true;
          }
        });
        socket.emit('FE-error-user-exist', { error });
      });
    });

    /**
     * Join Room
     */
    socket.on('BE-join-room', ({ roomId, userName }) => {
      // Socket Join RoomName
      socket.join(roomId);
      console.log(roomId, userName);
      socketList[socket.id] = { userName, video: true, audio: true };

      // Set User List
      const clients = io.sockets.adapter.rooms.get(roomId);
      // comment
      // io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach(client => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit('FE-user-join', users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit('FE-error-user-exist', { err: true });
      }
      // });
    });

    socket.on('BE-call-user', ({ userToCall, from, signal }) => {
      io.to(userToCall).emit('FE-receive-call', {
        signal,
        from,
        info: socketList[socket.id]
      });
    });

    socket.on('BE-accept-call', ({ signal, to }) => {
      io.to(to).emit('FE-call-accepted', {
        signal,
        answerId: socket.id
      });
    });

    socket.on('BE-send-message', ({ roomId, msg, sender }) => {
      io.sockets.in(roomId).emit('FE-receive-message', { msg, sender });
    });

    socket.on('BE-leave-room', ({ roomId, leaver }) => {
      delete socketList[socket.id];
      socket.broadcast.to(roomId).emit('FE-user-leave', { userId: socket.id, userName: [socket.id] });
      // io.sockets.socket[socket.id].leave(roomId);
      socket.leave(roomId);
    });

    socket.on('BE-toggle-camera-audio', ({ roomId, switchTarget }) => {
      if (switchTarget === 'video') {
        socketList[socket.id].video = !socketList[socket.id].video;
      } else {
        socketList[socket.id].audio = !socketList[socket.id].audio;
      }
      socket.broadcast.to(roomId).emit('FE-toggle-camera', { userId: socket.id, switchTarget });
    });
  });

  server.listen(process.env.APP_WS_PORT || 8000, () => console.log('socket is running on port 8000'));

  // routes
  app.use('/api', webRouter);

  var port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
};

