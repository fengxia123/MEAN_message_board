var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

require('./modules/routes.js')(app);

var server = app.listen(6789);
require('./modules/sockets.js')(server);















