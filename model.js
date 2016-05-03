var constant = require('./constants.js');
var db = require('./database.js');

module.exports = {
  updateLessonOnair : function(values, condition) {
    return db.lesson_onairs.update(values, condition);
  }
}