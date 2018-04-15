# githubOrgWebhookHandler

## About:

## Configuration:

## Usage:
node server.js -r "repo where Issues will be generated" -o "organization being monitored"

ex:
node server.js -r automatedIssues -o kwenOrg

This module uses node express and runs on port 3000 by default.

For local testing of this app use ngrok to forward to a temporary URL that can then be configured in your webhook.
![alt text]


## Resources used in developing this module:
https://developer.github.com/webhooks/#events
https://developer.github.com/v3/activity/events/types/#repositoryevent
https://octokit.github.io/rest.js/
https://github.com/octokit/rest.js/tree/master/examples
https://developer.github.com/webhooks/creating/




