if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const request = require('request');
const yargs = require('yargs');

const argv = yargs
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

// console.log(argv);

let addressInput = encodeURIComponent(argv.address);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAP_API_KEY}&address=${addressInput}`,
	json: true
}, (error, response, body) => {
	// console.log(JSON.stringify(body, undefined, 2));
	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});