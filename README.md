# githubOrgWebhookHandler

## About:
A webservice that evaluates and responds to Github Organization Webhook Events.

### Current functionality
When a Repository is deleted, a new Issue is opened to track the deletion.  The Issue is assigned and tagged for the local GitHub administration team to then act upon.

This program could be extended in the future to respond to any Organizational Webhook Event.

When starting up the service, parameters are required for the names of the Organziation and Repository where the new Issues will be created.


## Webhook Configuration
To use this service, an Organization Webhook for Repository Events needs to be configured.

* In the GitHub Web UI, select the organization that you want to monitor.  In the organization view select the "Settings" tab on the top right  (note that individiual Repositories also have settings and webhooks, ensure you are at the Organization level)

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/orgsettings.png)

* On the left "Organizational Settings" panel select "Webhooks"

* Click the "Add webhook" button on the upper right corner.

    Enter the following configurations:

    * Payload URL: http://yourPublicWebServerURL/payload

    * Content Type:  application/json

    * Secret: leave blank

    * Which events would you like to trigger this webhook? :  Let me select individual events

    * In the list of events select "Repositories: created, deleted, archived, unarchived, publicized or privitized

    * Check the box for "Active"
    
    * Click green "Update webhook" button to save changes

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/confWebhook.png)

![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/confwebhook2.png)


## Module Configuration:
* Clone this repository locally on a Linux or MacOS system.

* Ensure that node.js and npm are installed on the machine by running *node -v* and *npm -v* on the commandline.
    * This app was tested on node v9.11.1 and npm v5.8.0
    * NPM is a package manager which is distributed with node.js.   If you are missing one or either, go to:
    https://nodejs.org/en/download/np

* After confirming versions, run *npm install* on the commandline in the main directory that contains package.json.  This will bring in all required node dependencies.

### GitHub token
* For API authorization a Github token needs to be generated for an authorized user. 
Go to https://github.com/settings/tokens to see/create tokens.
    * Create a token with full permissions for admin:org, admin:org_hook, admin:repo_hook, admin:repo


![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/token.png)
![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/edittoken.png)

* This module uses express middleware which will upload your token to be used as authorization by the Octokit API.
   * After cloning down this repo, in the main directory that contains the .js files, create a new file named *.env*
   
   * Enter in your token in the .env file in the following syntax:
    GIT_TOKEN=tokenstring

### Server
* This module uses node express and runs on port 3000 by default.

* For local testing of this app use ngrok to forward to a temporary public URL that can then be configured in your webhook.
![alt text](https://github.com/kwenOrg/gitHubOrgWebhookHandler/blob/master/img/ngrok.png)

## Usage:
Requires all configurations above to be completed before running.

*node server.js -r "repo where Issues will be generated" -o "organization being monitored"*

    ex:
    *node server.js -r automatedIssues -o kwenOrg*


## Resources used in developing this module:
https://developer.github.com/webhooks/#events
https://developer.github.com/v3/activity/events/types/#repositoryevent
https://octokit.github.io/rest.js
https://github.com/octokit/rest.js/tree/master/examples
https://developer.github.com/webhooks/creating/




