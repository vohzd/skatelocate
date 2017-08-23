/*
 * LIBS
 */
const express         = require('express');
const mongoose        = require('mongoose');
const app             = express();
const http 			      = require("http").Server(app);
//const io 			      = require("socket.io")(http);
const port            = process.env.PORT || 1337;
//const morgan          = require('morgan');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');

/*
 * Headers & Content-Types
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

/*
 * DATABASE
 */
mongoose.Promise               = global.Promise;
const connectionString 		     =  "mongodb://skatelocate_ben_db:oneHundredThou77@ds023550.mlab.com:23550/heroku_r1j6hfp6";
const mongooseConnection       = mongoose.connect(connectionString, { useMongoClient: true });

mongooseConnection.then((db) => {
  console.log("connected to mongoDB");
});

require('./routes.js')(app);

/*
 * GO
 */
 http.listen(port, () => {
	console.log("Server is alive on port " + port);
})
