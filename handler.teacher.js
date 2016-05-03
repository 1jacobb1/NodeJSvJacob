var util = require('./util.js');
var constant = require('./constants.js');
var model = require('./model.js');

module.exports = {

  registerTeacher : function(obj, resolve, reject) {
    if (typeof obj.teachers === undefined || typeof obj.data === undefined) {
      return reject("reason_invalid_teacher_params");
    }

    var teachers = obj.teachers;
    var data = obj.data;

    var teacherIndex = util.getIndex(teachers, {teacherID: data.teacherID});
    console.log("[TEACHER] CHECKING TEACHER TEACHER-> "+JSON>stringify(data)+" index-> "+teacherIndex);

    if (teacherIndex > -1) {
      delete teachers[teacherIndex];
      console.log("[TEACHER] REMOVING EXISTING TEACHER CONNECTION "+teachers);
    }

    teachers.push({teacherID: data.teacherID, socketID: data.socketID});
    console.log("[TEACHER] THERE IS A NEW TEACHER");

    model.updateLessonOnair({connect_flg:1}, {where: {chat_hash: data.chatHash}})
    .then(function() {
      console.log("[TEACHER] TEACHER CONNECT FLAG IS 1");
      return resolve();
    })
    .catch(function(err) {
      return reject(err);
    })

  }
}