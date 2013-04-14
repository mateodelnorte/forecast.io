var log = require('debug')('forecast.io'),
    request = require('request'),
    util = require('util');

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
  this.url = 'https://api.forecast.io/forecast/' + options.APIKey + '/';
}

Forecast.prototype.get = function get (latitude, longitude, options, callback) { 
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options.url = this.url + latitude + ',' + longitude + '?';

  if (options.exclude) {
    options.url += 'exclude=' + options.exclude;
  }

  log('get ' + options.url)

  request.get(options, function (err, res, data) {
    if (err) { 
      callback(err);
    } else {
      data = JSON.parse(data);
      callback(null, res, data);
    }
  });
};

Forecast.prototype.getAtTime = function getAtTime (latitude, longitude, time, options, callback) { 
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options.url = this.url + latitude + ',' + longitude + ',' + time + '?';

  if (options.exclude) {
    options.url += 'exclude=' + options.exclude;
  }

  request.get(options, function (err, res, data) {
    if (err) { 
      callback(err);
    } else {
      data = JSON.parse(data);
      callback(null, res, data);
    }
  });
};

module.exports = Forecast;