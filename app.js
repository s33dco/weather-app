if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const yargs = require('yargs');
const axios = require('axios');
const argv  = yargs
							.options({
								a: {
									demand: true,
									alias: 'address',
									describe: 'Address to fetch weather for',
									string: true
								}
							})
							.help()
							.alias('help', 'h')
							.argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAP_API_KEY}&address=${encodedAddress}`;

axios.get(geocodeUrl, {timeout: 5000}).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	}
	let lat = response.data.results[0].geometry.location.lat;
	let lng = response.data.results[0].geometry.location.lng;
	let weatherUrl = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${lng}?units=uk2&exclude=minutely,hourly,daily,alerts`;
	console.log(`\nNow in ${response.data.results[0].formatted_address}`);
	return axios.get(weatherUrl);
}).then((response) => {
		let temperature 				= response.data.currently.temperature;
		let apparentTemperature = response.data.currently.apparentTemperature;
		let summary							=	response.data.currently.summary;
		console.log(`It's ${summary} and ${temperature} deegrees, feeling like ${apparentTemperature}.\n`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('could not connect to api servers.');
	} else {
		console.log(e.message);
	}
});