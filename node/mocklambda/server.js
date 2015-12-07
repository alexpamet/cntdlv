// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Map = require("collections/map");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var instances = new Map();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router
    .post('/start', function(req, res) {
      
      var instance = req.body.instance;

      console.log('Start instance: ' + instance);
      
      instances.set(instance, Date.now());
      
      console.log(instances.entries());
		    
      res.setHeader('Content-Type', 'application/json');
//      res.json(JSON.stringify({ instance: instance, status: 'MOCK'}));   
      res.json({ instance: instance, status: 'MOCK'});   
    })
    .post('/test', function(req, res) {
            
      var instance = req.body.instance;
      
      console.log('Test instance: ' + instance);
      
      var startedAt = instances.get(instance);
      
      console.log('Started at: ' + startedAt);
      
      var started = Date.now() - startedAt > 5000;
      
      res.setHeader('Content-Type', 'application/json');
//      res.json(JSON.stringify({ instance: instance, started: started}));   
      res.json({ instance: instance, started: started});   
    })
    ;

	
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);