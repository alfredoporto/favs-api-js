const express = require('express');
const app = express();
const { port } = require('./config');
const userRoutes = require('./src/routes/users');
const favsRoutes = require('./src/routes/favs');
//const valitateAuth = require('./src/middlewares/validateAuth');

//app.use(valitateAuth);

app.use(express.json());

app.use('/users', userRoutes);
app.use('/favs', favsRoutes);

app.listen(port, () => {
    console.log('Server listen on port', port);
});