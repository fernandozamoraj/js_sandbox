var _q = 'fz.default.q';
 
let _conn = false
let _sendChannel = false
let _server = "amqp://localhost"
let _userName = ""
let _password = ""
let _onConsume = setMessage
let _connectionIsEstablished = false

function setMessage(message){
    console.log(`Message Set: ${message}`);
}

function bail(err) {
  console.error(err);
  process.exit(1);
}
 
// Publisher
function connectPublishChannel(conn) {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(_q);
    _sendChannel = ch
  }
}

function connectReceiveChannel(conn){
    var ok = conn.createChannel(on_open);
  
    function on_open(err, ch) {
        if (err != null) bail(err);
        ch.assertQueue(_q);
        consume(ch)
    }  
}


function publish(ch, message) {
    ch.sendToQueue(_q, Buffer.from(message));
}

// Consumer
function consume(ch) {

    ch.consume(_q, function(msg) {
        if (msg !== null) {
            ch.ack(msg);
            _onConsume(msg.content.toString())
        }
    });
}
 
function setupConnection(){

    if(_connectionIsEstablished === false){
        require('amqplib/callback_api')
        .connect(_server, function(err, conn) {
          if (err != null) bail(err);
          _conn = conn
          connectReceiveChannel(_conn)
          connectPublishChannel(_conn)
          _connectionIsEstablished = true
        });
        return true
    }

    return false
}

module.exports = {
    setUp: function(server, userName, password, que, onConsume){
        _server = server,
        _userName = userName,
        _password = password,
        _q = que,
        _onConsume = onConsume
    },
    publish: function(message) {
        if(setupConnection()){
            //give it 1 second to establish the connection
            setTimeout(function(){
                publish(_sendChannel, message)
            }, 1000)
        }
        else{
            publish(_sendChannel, message);
        }
    },
    startConsumer: function(){
        setupConnection();
    }
}