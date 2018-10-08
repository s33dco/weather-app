const request = require('request');

let getWeather = (lat, lng, callback) => {
	request({
		url : `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}`,
		json :true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to fetch weather from darksky.');
		} else if (response.statusCode === 200) {
			callback( undefined, {
				summary: body.hourly.summary,
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		}
	});
};

module.exports.getWeather = getWeather;

