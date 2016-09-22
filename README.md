forecast.io
===========

A simple wrapper for the awesome Dark Sky API: https://darksky.net/dev/docs

How to use it:

Require darksky

```
var DarkSky = require('forecast.io');
```

Instantiate an instance of Forecast. You'll need to provide options specifying your darksky API Key. You may also add a `timeout` option, which defaults to 2500 if not provided.

```
var options = {
  APIKey: process.env.DARKSKY_API_KEY,
  timeout: 1000
},
darksky = new DarkSky(options);
```

Make a call to the API using the get or getAtTime methods.

  The get function calls to the https://api.darksky.net/forecast/APIKEY/LATITUDE,LONGITUDE endpoint.

```
darksky.get(latitude, longitude, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

  getAtTime calls the similar endpoint with time specified: https://api.darksky.net/forecast/APIKEY/LATITUDE,LONGITUDE,TIME.

```
var time = new Date().setDate(0); // lets use an arbitrary date
var unixTime = Math.floor(time.getTime()/1000); //Get the UNIX timestamp needed for the api.

darksky.getAtTime(latitude, longitude, unixTime, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

Additional:

Both get and getAtTime functions accept optional parameters to accommodate the optional query string params available for the forecast API calls. The following call is, for instance, possible and will return only the current property and its child properties:

```
var options = {
  exclude: 'minutely,hourly,daily,flags,alerts'
};
darksky.get(latitude, longitude, options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```
