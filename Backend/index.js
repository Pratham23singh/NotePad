const connectToMongo = require('./db');
const express = require('express');
const mongoose = require('mongoose');

connectToMongo();
const app = express();
const port = 7000;

app.use(express.json());

//endpoints for routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});