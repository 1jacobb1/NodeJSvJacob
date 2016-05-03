var connect = require('./connect.js');
var handler = require('./handler.js');
var promise = require('promise');

console.log("[SERVER] STARTING SERVER");

connect.io.on('connection', function(socket) {

  socket.io('common.connectToRoom', function(data, callback){
    connect.io.emit('room_generalCommand', {command: 'roomConnected', content:'data'});

    var obj = {error: false, content: ''};

    util.try(function(resolve, reject) {
      if (typeof data.chatHash === "undefined") {
        obj.content = "reason_unknown_chat_hash";
        obj.error = true;
        return reject(obj);
      }

      if (typeof data.memberType === "undefined") {
        obj.content = "reason_unknown_member_type";
        obj.error = true;
        return reject(obj);
      }

      switch (data.memberType) {
        case "teacher" :
          handler.teacher.registerTeacher({
            data: data,
            teachers : connect.teachers
          }, resolve, reject);
          break;

        case "student" :
          // register student here
          break;

        case "admin" :
          // admin function here
          break;

        default:
      }
    })
    .then(function(content) {
      connect.teachers = util.compact(connect.teachers);
      connect.users = util.compact(connect.users);

      socket.userData = data;

      socket.join(data.chatHash);

      socket.broadcast.to(data.chatHash).emit("room.room_generalCommand", {command: "roomConnected", content:data});

      return callback(content);
    })
    .catch(function(err) {
      console.log("[ERROR] "+err);
      obj.error = true;
      obj.content = err;
      return callback(obj);
    })

  });

})