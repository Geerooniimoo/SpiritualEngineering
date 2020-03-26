var express = require('express');
var mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));
app.use(express.static('public'));

mongoose.Promise = Promise;
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/SpiritualEngineering', 
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));