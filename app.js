const express = require('express');
const app = express();
const PORT = 5000;
var path = require('path');


var expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);


app.use(expressLayouts);

app.use(bodyParser.json());

const axios = require('axios');
const token = '2bae024bf361e3';
app.get('/', (req, res)=> {
    res.locals = {
        title: 'Map',
        message: 'This is a message'
    };
    res.render('index');
});
// const getUrl = (input)=>(`https://us1.locationiq.com/v1/search.php?key=${token}&q=${input}&format=json`);
const getSearchResutl = (input)=>
    (`https://graph.facebook.com/v3.2/search?type=place&
    distance=500000&q=${input}
    &fields=name,checkins,picture,description,cover,about,engagement,location,single_line_address,link,phone,rating_count


    &limit=100
    &access_token=940858846064224|Wn5rFgbeLIdxJP7HRv8fW3mHBUM`);

app.get('/search',async (req,res)=>{
    let input = req.query.input;
    const r = await axios.get(getSearchResutl(input));
    const {data } = r;
    console.log(data.data);


    res.locals = {
        title: 'Map',
        message: 'This is a message',
        results: data.data
    };
    res.render('search');
});
app.listen(PORT);