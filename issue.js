/// notify-on-delete
/// issue.js
/// creates a new Github issue when a notification comes in @ a deleted repo

/** Opens a Github issue with data provided by the webhook POST request  */
//github rest API for node
const octokit = require ('@octokit/rest')()

//module that will store sensititve info in a local .env file which can
//then be referenced via the process.env
const dotenv = require('dotenv').config()
if (dotenv.error) {
    throw dotenv.error
  }

octokit.authenticate({
    type: 'token',
    token: process.env.GIT_TOKEN
})

//function to open a new issue in kwenOrg/notify-on-delete repo if any other repo in the org is deleted
var open = (repoName, orgName, userName) => {
    
      //call the create issues API, it will either return an error or resulting info from new ticket
      const newIssue = octokit.issues.create({
             owner: 'kwenOrg',
             repo: 'notify-on-delete',
             title: `${repoName} has been deleted`,
             body: `This is an auto-generated ticket to track the deletion of repository ${repoName} by user ${userName}.  @kkwentus Please review`,
             assignee: 'kkwentus',
             labels: ['admin review']
      },
        (error, results) => {
          if(error){
              console.log('Error on issue creation ===> ', error)
              process.exit(1);
          }
          else{
              console.log(`New issue has been generated`)
          }
      }); //end newIssue

}; //end open

module.exports = {
    open
};