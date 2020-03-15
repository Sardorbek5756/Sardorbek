const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
}) 
app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server');
        
    });
    next();
    
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website',
        
    });
})

app.get('/about', ( req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
        welcomeMessage: 'This is  my website'
    });
}); 
app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Server is running on port 3000');
}); 