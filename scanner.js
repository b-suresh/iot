var exports = module.exports = {};
exports.scanAndPublishMessage = function(sp, device){
        var messageId = 0;
	sp.on("open",function(){
	  console.log('Device Ready');
	  sp.on('data', function(data){
	    var cardId = data.replace(/[^A-Z0-9]/g,'');
	    console.log('Our card ID: '+cardId);
            messageId = messageId + 1;
	    device.publish('topic_2', JSON.stringify({messageId: messageId,name: 'suresh',rfid: cardId}));
	  });
        });
}
