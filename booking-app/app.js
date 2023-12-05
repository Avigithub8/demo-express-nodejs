
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./controller/admin.js');
const sequelize  = require('./models/database.js');

const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', admin.getUser);
app.get('/create', admin.showCreateForm);
app.post('/create', admin.createUser);
app.get('/edit/:id', admin.showEditForm);
app.post('/edit/:id', admin.updateUser);
app.get('/delete/:id', admin.deleteUser);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.error(error);
  });




