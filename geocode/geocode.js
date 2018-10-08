const request = require('request');

let geocodeAddress = (address, callback) => {

	let encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAP_API_KEY}&address=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('unable to conect to google server.');
		} else if (body.status === 'ZERO_RESULTS') {
			callback('unable to find that address.');
		} else if ( body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
	
};

module.exports.geocodeAddress = geocodeAddress;

//  2e868da52b83f0636ddfeea93ea0c3be


