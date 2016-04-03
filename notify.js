var awsIot = require('aws-iot-device-sdk');
var scanner = require("./scanner.js");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sp = new SerialPort("/dev/ttyUSB0",{
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

var device = connectToAWS();
subscribeToAWSTopic(device);
scanner.scanAndPublishMessage(sp, device);

function connectToAWS(){
	const isUndefined = require('/home/pi/node_modules/aws-iot-device-sdk/common/lib/is-undefined');

	var clientIdDefault;
	if (!isUndefined(process.env.USER)) {
	   clientIdDefault = process.env.USER.concat(Math.floor((Math.random() * 100000) + 1));
	} else {
	   clientIdDefault = 'nouser' + (Math.floor((Math.random() * 100000) + 1));
	}

	var device = awsIot.device({
	   keyPath: '/home/pi/certs/c0f9905344-private.pem.key',
	  certPath: '/home/pi/certs/c0f9905344-certificate.pem.crt',
	    caPath: '/home/pi/certs/root-CA.cert',
	  clientId: clientIdDefault,
	    region: 'us-east-1'
	});
        return device;
}
function subscribeToAWSTopic(device) {
	device.on('connect', function() {
		console.log('connected');
		device.subscribe('topic_1');
                console.log('subscribed to topic_1');
	});
	device.on('message', function(topic, payload) {
	     console.log('message',topic,payload.toString());
	}); 
}
