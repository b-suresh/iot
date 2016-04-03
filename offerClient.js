var http = require('http');
var exports = module.exports = {};
exports.getOffer = function(dataString) 
{
	//var dataString = '{"messageId":"1","name":"suresh","rfid":"123"}';
	var headers = {
	      'Content-Type': 'application/json',
	      'Content-Length': dataString.length
	    };

	var options = {
	  host: 'ec2-54-165-213-245.compute-1.amazonaws.com',
	  port: 8080,
	  path: '/personalization/greetjson',
	  method: 'POST',
	  headers: headers
	};

	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	})

	req.write(dataString);
	req.end();
}
