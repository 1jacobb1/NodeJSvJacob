var moment = require('moment');
var _ = require('underscore');
var promise = require('promise');

module.exports = {
  try : function(f) {
    return new promise(f);
  },

  getCurrentTime: function(format) {
    format = (typeof format === "undefined") ? "YYYY-MM-DD HH:mm:ss" : format;
    return moment().format(format);
  },

  getIndex: function(list, filter) {
    var index = _.findLastIndex(list, filter);
    return index;
  },

  compact: function(list) {
    return _.compact(list);
  }
}