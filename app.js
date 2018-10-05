if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const request = require('request');

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAP_API_KEY}&address=12%20risedale%20road%20bexleyheath`,
	json: true
}, (error, response, body) => {
	console.log(body);
});