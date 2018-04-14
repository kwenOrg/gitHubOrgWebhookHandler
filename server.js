const express = require('express')
const bodyParser = require('body-parser')
const issue = require('./issue.js')

var app = express();
var jsonParser = bodyParser.json();

var issueStatus

app.use(bodyParser.json({ type: 'application/*+json' }));
//app.use(function(err, req, res, next));

app.get('/', (request, response) => {
    response.send('<h2>notify on delete webserver</h2>');
});//end get

var evalRequest = (request) => {
    issueStatus = request.body.action;
    console.log('Notified for:', issueStatus);

    //we are only taking action if the notification we receive is for a deleted action
    if (request.body.action === "deleted"){
        issue.open(request.body.repository.full_name, request.body.organization.login, request.body.sender.login);
    }

};//end evalRequest


app.post('/payload', jsonParser, (request, response) => {
    //console.log('REQUEST DATA FORMAT', typeof request);
    //console.log(request.body);
    response.send('Payload received');
    var eval = evalRequest(request); 
    
});//end post

//common localhost dev port, for testing will need to forward with ngrok for public URL
//ngrok http 3000
app.listen(3000, () => {
    console.log('server up port 3000');
});


