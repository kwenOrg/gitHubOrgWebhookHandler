const express = require('express')
var bodyParser = require('body-parser')
const issue = require('./issue.js')

var app = express();

app.use(bodyParser.json({ type: 'application/*+json' }));

var jsonParser = bodyParser.json();

app.get('/', (request, response) => {
    response.send('<h2>notify on delete webserver</h2>');
    
});//end get

app.post('/payload', jsonParser, (request, response) => {
    //console.log('REQUEST DATA FORMAT', typeof request);
    //console.log(request.body);
    if(request.body.action === "deleted"){
       issue.open(request.body.repository.full_name, request.body.organization.login, request.body.sender.login);
    }
    else {
        console.log('action was not a delete-->', request.body.action)
    }
    response.send('payload received');

});//end post

//common localhost dev port, for testing will need to forward with ngrok for public URL
//ngrok http 3000
app.listen(3000, () => {
    console.log('server up port 3000');
});


