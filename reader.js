var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sp = new SerialPort("/dev/ttyUSB0",{
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

sp.on("open",function(){
  console.log('Device Ready');
  sp.on('data', function(data){
    var cardID = data.replace(/[^A-Z0-9]/g,'');
    console.log('Our card ID: '+cardID);
  });
});
