var aws = require('aws-sdk');
var ecs = new aws.ECS({apiVersion: '2014-11-13'});

exports.handler = function(event, context) {
    console.log('Received event:');
    console.log(JSON.stringify(event, null, '  '));

	var params = {
		count: 1,
		taskDefinition: "jenkinstaskdefinition"
	};	
	
	ecs.runTask(params, function (err, data) {
		if (err) { console.warn('error: ', "Error while starting task: " + err); }
		else { console.info('Task ' + config.task + ' started: ' + JSON.stringify(data.tasks))}
	});

};