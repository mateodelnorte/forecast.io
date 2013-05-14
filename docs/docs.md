# TOC
   - [Forecast](#forecast)
     - [#get](#forecast-get)
     - [#getAtTime](#forecast-getattime)
<a name=""></a>
 
<a name="forecast"></a>
# Forecast
<a name="forecast-get"></a>
## #get
should return data for a latitude and longitude.

```js
forecast.get(latitude, longitude, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  done();
});
```

should be able to specify blocks to exclude via options param.

```js
var time = new Date().setDate(0); // lets use an arbitrary date
var options = {
  exclude: 'minutely,hourly,daily,flags,alerts'
};
forecast.get(latitude, longitude, options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.not.have.property('alerts');
  data.should.have.property('currently');
  data.should.not.have.property('minutely');
  data.should.not.have.property('hourly');
  data.should.not.have.property('daily');
  data.should.not.have.property('flags');
  done();
});
```

should be able to specify multiple options via options param.

```js
var time = new Date().setDate(0); // lets use an arbitrary date
var options = {
  exclude: 'minutely,hourly,daily,flags,alerts',
  units: 'si'
};
forecast.get(latitude, longitude, options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.not.have.property('alerts');
  data.should.have.property('currently');
  data.should.not.have.property('minutely');
  data.should.not.have.property('hourly');
  data.should.not.have.property('daily');
  data.should.not.have.property('flags');
  done();
});
```

<a name="forecast-getattime"></a>
## #getAtTime
should return data for a latitude and longitude and time.

```js
var time = new Date().setDate(0); // lets use an arbitrary date
forecast.getAtTime(latitude, longitude, time, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  done();
});
```

