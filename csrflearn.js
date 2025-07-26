const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const app = express();

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.send('home');
});

app.get('/form',csrfProtection, (req, res) => {
    res.render('form',{csrfToken: req.csrfToken()});
});
app.post('/submit',csrfProtection, (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});