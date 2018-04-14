//// notify-on-delete
///  app.js
///  creates a new Github issue when a notification comes in @ a deleted repo

//webserver package
const express = require('express')
//express middleware
const bodyParser = require('body-parser')

const issue = require('./issue.js')

var app = express();

var jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/*+json' }));


app.get('/', (request, response) => {
    response.send('<h2>notify on delete webserver</h2>');
});//end get

//looks at request coming in which could be for a repo being created/deleted/archived/made public/made private
//Only the deletion of a repo will trigger a ticket
var evalRequest = (request) => {
//    var issueStatus = request.body.action;
    console.log('Notified for event of ===>', request.body.action);

    //we are only taking action if the notification we receive is for a deleted action
    if (request.body.action === "deleted"){
        issue.open(request.body.repository.full_name, request.body.organization.login, request.body.sender.login);
    }

};//end evalRequest

//respond to POST from github webhook and evaluate if it is a deletion event
app.post('/payload', jsonParser, (request, response) => {
    response.send('Payload received');
    var eval = evalRequest(request); 
    
});//end post

//common localhost dev port, for testing will need to forward with ngrok for public URL
//ngrok http 3000
app.listen(3000, () => {
    console.log('server up port 3000');
});


