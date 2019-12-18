const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const ngrok = require('ngrok');

// Routes
const user = require('./routes/user');
const auth = require('./routes/auth');
const cam = require('./routes/cam');

// Connecting to DB
mongoose.connect(config.get('app.db'))
  .then(() => console.log('Mongo DB is running on port', mongoose.connection.port))
  .catch(error => console.log(error));

// Initialising express server
const app = express();

// Middlewares usage
app.use(express.json());
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/cam', cam);

app.listen(config.get('app.port'), () => {
  console.log('Express is runing on port', config.get('app.port'));
});

// Opening ngrok tunnel
(async function() {
  const url = await ngrok.connect({
    authtoken: config.get('ngrok.token'),
    addr: config.get('app.port'),
  });

  console.log('Application is running on', url);
})();
