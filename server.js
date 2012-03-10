/**
 * Dependenncies
 */

var express = require('express') // node.js web framework
  , sio = require('socket.io'); // cool websocket protocol (although it is slighly different from the real websocket)

/**
 * Creating and configuring the server
 */

var app = express.createServer();

/**
 * App configuration
 */

app.configure(function () {
  app.use(express.static(__dirname + '/public'));
  app.set("view options", {layout: false});
  app.set('view engine', 'html');
  app.set('views', __dirname);

  // make a custom html template
  app.register('html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });
});

/**
 * Router
 */

app.get('/', function (req, res) {
  res.render('index.html');
});

/**
 * Launch the server
 */

app.listen(3000, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});



var io = sio.listen(app)

io.sockets.on('connection', function (socket) {

  socket.on('message', function (msg) {
    console.log("   Mensagem recebida: " + msg)
    socket.broadcast.emit('new message', msg);
  });

});