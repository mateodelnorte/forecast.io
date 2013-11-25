var log = require('debug')('forecast.io'),
    request = require('request'),
    util = require('util'),
    _ = require('lodash');

function ForecastError (errors) {
  Error.captureStackTrace(this, ForecastError);
  this.errors = errors;
}

util.inherits(ForecastError, Error);

ForecastError.prototype.toString = function toString (){
  return "ForecastError: " + this.errors;
}

function Forecast (options) {
  if ( ! options) throw new ForecastError('APIKey must be set on Forecast options');
  if ( ! options.APIKey) throw new ForecastError('APIKey must be set on Forecast options');
  this.APIKey = options.APIKey;
  this.requestTimeout = options.timeout || 2500
  this.url = 'https://api.forecast.io/forecast/' + options.APIKey + '/';
}

Forecast.prototype.get = function get (latitude, longitude, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var url = this.url + latitude + ',' + longitude;

  var query = _.reduce(options, function (result, val, key) {
    if (result) return result + '&' + key + '=' + val;
    return result + '?' + key + '=' + val;
  }, '');

  url += query;

  log('get ' + url);

  request.get({uri:url, timeout:this.requestTimeout}, function (err, res, data) {
    if (err) {
      callback(err);
    } else {
      try {
        data = JSON.parse(data);
      } catch(e) {
        return callback(e, res, data);
      }
      callback(null, res, data);
    }
  });
};

Forecast.prototype.getAtTime = function getAtTime (latitude, longitude, time, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var url = this.url + latitude + ',' + longitude + ',' + time;

  var query = _.reduce(options, function (result, val, key) {
    if (result) return result + '&' + key + '=' + val;
    return result + '?' + key + '=' + val;
  }, '');

  url += query;

  log('get ' + url);

  request.get({uri:url, timeout:this.requestTimeout}, function (err, res, data) {
    if (err) {
      callback(err);
    } else {
      data = JSON.parse(data);
      callback(null, res, data);
    }
  });
};

module.exports = Forecast;
