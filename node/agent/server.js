// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var request = require('request');

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


var awsProtocol = "http://"
var awsHost = "localhost:8080/api/";


router
    .get('/start', function(req, res) {
  
		console.log('Starting Jenkins');

		startInstance('jenkins');
		
		res.setHeader('Content-Type', 'application/json');
		res.json(JSON.stringify({ instance: 'jenkins', status: 'MOCK'}));   
    })
    ;

function startInstance(instance) {
	performRequest('/start', {
		instance: instance
	}, function (error, response, body) {
		console.log('Start instance response body', body);
		
		var interval = setInterval(function () {
			performRequest('/test', {
				instance: instance
				}, function (error, response, body) {
//					var responseObject = JSON.parse(data);
					console.log(body);
					console.log('Test instance ' + body.instance + ' state: ' + body.started);
					if (body.started == true) {
					clearInterval(interval);
				}
			});
		}, 1000);
		
	});
}

function performRequest(endpoint, data, success) {
	var dataString = JSON.stringify(data);
	var headers = {};
  
	console.log('Instance: ', data.instance);
	
	request (
		{
			url: awsProtocol + awsHost + endpoint,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': dataString.length
			},
			json: {
				instance: data.instance
			}
		}, success
	);
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);