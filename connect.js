/* set dependencies here */
var fs          = require('fs'),
    express     = require('express'),
    crypto      = require('crypto'),
    moment      = require('moment'),
    _           = require('underscore'),
    app         = express();

var constants = require('./constants.js');

var server = require('https').createServer(constants.ssl, app);   // create https server
var io = require('socket.io').listen(server);
var socket = io.sockets;
var peer = require('peer').ExpressPeerServer;

app.use('/peerjs', peer(server, {debug: true}));

var server = server.listen(constants.port, "0.0.0.0", function() {
  console.log("[SERVER] listening to port "+constants.port);
});


exports.io = io;
exports.peer = peer;
exports.teachers = [];
exports.students = [];
exports.admins = [];
exports._ = _;
exports.constants = constants;
exports.chatRooms = [{
  room: '',
  user : {},
  teacher : {},
  admins : []
}];