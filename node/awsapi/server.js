// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

var ecs = new AWS.ECS();
var ec2 = new AWS.EC2();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router
    .get('/test', function(req, res) {
      /*
	  ecs.listTasks(null, function(err, data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);   
	  });
	  */
	  ec2.describeInstances(null, function(err, data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);   
	  });
    })
    ;

	
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/aws', router);

// START THE SERVER
// =============================================================================
app.listen(port);
