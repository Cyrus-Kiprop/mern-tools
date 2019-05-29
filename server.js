const express = require('express');
const app = express();
app.use(express.static('static'));
app.listen(3001, function () {
    console.log('App started on port 3000');
});