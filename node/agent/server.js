// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var http = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.PORT || 80;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


var host = "localhost";
var port = '8080';

function performRequest(endpoint, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
	headers = {
		'Content-Type': 'application/json',
		'Content-Length': dataString.length
	};
	
	var options = {
		host: host,
		port: port,
		path: endpoint,
		method: 'POST',
		headers: headers
	};

	console.log(options);
	
	var req = http.request(options, function(res) {

		res.setEncoding('utf-8');

		var responseString = '';

		res.on('data', function(data) {
		  responseString += data;
		});

		res.on('end', function() {
		  console.log(responseString);
		  var responseObject = JSON.parse(responseString);
		  success(responseObject);
		}
		);
		
		res.on('error', function() {
			console.log('error');
		}
		);
	});

	req.write(dataString);
	req.end();
}

function startInstance() {
	performRequest('/api/start', {
		instance: 'jenkins'
	}, function (data) {
		console.log(data);
	});
}

startInstance();
