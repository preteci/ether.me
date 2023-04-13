const express = require('express')
const app = express()
const addressHandler = require('./routes/addressHandler');

// using API as backend
app.use('/api/', addressHandler);

app.listen(4000);