# githubOrgWebhookHandler

## About:
A webservice that evaluates and responds to Github Organization Webhook Events.

### Current functionality:
When a Repository is deleted, a new Issue is opened to track the deletion.  The Issue is assigned and tagged for the local GitHub administration team to then act upon.

This program could be extended in the future to respond to any Organizational Webhook Event.

When starting up the service parameters are required for the names of the Organziation and Repository where the new Issues will be created.


## Webhook Configuration
To use this service, an Organization Webhook for Repository Events needs to be configured.

* In the GitHub Web UI to to the organization that you want to monitor and select the "Settings" tab

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/orgsettings.png)

On the left "Organizational Settings" panel select "Webhooks"

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/confWebhook.png)


Click the "Add webhook" button on the upper right corner.

Enter the following configurations:

    * Payload URL: <serverURL>/payload
    ex using ngrok:  http://deb9b33f.ngrok.io/payload

    * Content Type:  application/json

    * Secret: leave blank

    * Which events would you like to trigger this webhook? :  Let me select individual events

    * In the list of events select "Repositories, created deleted, archived, unarchived, publicized or privitized

    * Check the box for "Active"
    * Click green "Update webhook"

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/confwebhook2.png)


## Module Configuration:
* Clone this repository locally on a Linux or MacOS system.
* Ensure that node.js and npm are installed on the machine by running "node -v" and "npm -v".   
    * This app was tested on node v9.11.1 and npm v5.8.0
    * NPM is a package manager which is distributed with node.js.   If you are missing one or either, go to:
    https://nodejs.org/en/download/np

* After cloning and checking for versions, run "npm init" in the same directory as the package.json to bring in required dependencies

### GitHub token
* For API authorization a Github token needs to be generated for an authorized user.   
https://github.com/settings/tokens
![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/token.png)

* This module uses express middleware which will upload your token to be used as authorization by the Octokit API.
    * In the main gitHubOrgWebhookHandler directory create a file name "*.env"
    * Enter in your token in the file in the following syntax:
    GIT_TOKEN=tokenstring

### Server
* This module uses node express and runs on port 3000 by default.

* For local testing of this app use ngrok to forward to a temporary URL that can then be configured in your webhook.
![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/ngrok.png)

## Usage:
Requires all configurations above to be completed before running.

*node server.js -r "repo where Issues will be generated" -o "organization being monitored"*

ex:
node server.js -r automatedIssues -o kwenOrg


## Resources used in developing this module:
https://developer.github.com/webhooks/#events
https://developer.github.com/v3/activity/events/types/#repositoryevent
https://octokit.github.io/rest.js
https://github.com/octokit/rest.js/tree/master/examples
https://developer.github.com/webhooks/creating/




