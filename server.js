//// githubOrgWebhookHandler
///  server.js
///  Monitors POST messages from Github organization webhooks
///  usage: node server.js -o <org name> -r <issue repo name> 
///  usage: node server.js -o kwenOrg -r notify-on-delete 

//webserver package
const express = require('express')
const yargs = require('yargs')
//express middleware
const bodyParser = require('body-parser')
const issue = require('./issue.js')

const argv = yargs
 .options({
    r: {
        demand: true,
        alias: 'repo',
        describe: 'Repo that will hold generated issues. Must belong to Organization as set with -o flag',
        string: true
    },
    o: {
        demand: true,
        alias: 'org',
        describe: 'Organziation this is being monitored',
        string: true
    },
})
  .help()
  .alias('help', 'h')
  .argv;


var app = express();

var jsonParser = bodyParser.json();
app.use(bodyParser.json({ type: 'application/*+json' }));


app.get('/', (request, response) => {
  response.send('<h2>Github webhook handler</h2>');
});//end get

//looks at request coming in which could be for any type of webhook event
//Only the deletion of a repo will trigger an Issue creation
var evalRequest = (request) => {
    if (request.headers["x-github-event"] === "repository"){
        
       //log to console for FYI that something was received
      console.log('Notified for Repository event of ===>', request.body.action);
    
        //we are taking action if the notification we receive is for a deleted repo
        if (request.body.action === "deleted"){
          issue.openDeleteIssue(request, argv.repo, argv.org);
        }   
    }
    else{
      console.log('No action defined for event type ===>', request.headers["x-github-event"]);
    }
};//end evalRequest

//respond to POST from github webhook and evaluate 
app.post('/payload', jsonParser, (request, response) => {
  response.send('Payload received');
  var eval = evalRequest(request);  
});//end post

//common localhost dev port, for testing can forward with ngrok for public URL that 
//the webhook requires.      $: ngrok http 3000
app.listen(3000, () => {
  console.log('server up port 3000');
});


