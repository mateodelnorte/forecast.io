var _ = require('lodash');

var o = { one: 'two', three: 'four' }; 

var res = _.reduce(o, function (result, val, key) {
  if (result) return result + ',' + key + '=' + val;
  return result + key + '=' + val;
}, '');

console.log(res);