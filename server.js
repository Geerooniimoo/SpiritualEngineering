var express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));
app.use(express.static('public'));

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

