forecast.io
===========

A simple wrapper for the awesome forecast.io API: https://developer.forecast.io/docs/v2

How to use it:

1. Require forecast.io

```
var Forecast = require('forecast.io');
```

2. Instantiate an instance of Forecast. You'll need to provide options specifying your forecast.io API Key.

```
var options = {
  APIKey: process.env.FORECAST_API_KEY
},
forecast = new Forecast(options);
```

3. Make a call to the API using the get or getAtTime methods.

  The get function calls to the https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE endpoint.

```
forecast.get(latitude, longitude, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

  getAtTime calls the similar endpoint with time specified: https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME.

```
var time = new Date().setDate(0); // lets use an arbitrary date
forecast.getAtTime(latitude, longitude, time, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

Additional:

1. Both get and getAtTime functions accept optional parameters to accommodate the optional query string params available for the forecast API calls. The following call is, for instance, possible and will return only the current property and its child properties:

```
var options = {
  exclude: 'minutely,hourly,daily,flags,alerts'
};
forecast.get(latitude, longitude, options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```
