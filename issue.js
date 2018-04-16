/// githubOrgWebhookHandler
/// issue.js
/// calls to to the Github API for issues

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

//function to open a new issue when a repository is deleted
var openDeleteIssue = (request, issuesRepo, org) => {
    
      //call the create issues API, it will either return an error or resulting info from new ticket
      const newIssue = octokit.issues.create({
            owner: `${org}`,
            repo: `${issuesRepo}`,
            title: `${request.body.repository.full_name} has been deleted`,
            body: `This is an auto-generated ticket to track the deletion of repository ${request.body.repository.full_name} by user ${request.body.sender.login}.  @kkwentus Please review`,
            labels: ['admin review']
      },
        (error, results) => {
          if(error){
            console.log('Error on issue creation ===> ', error)
            process.exit(1);
          }
          else{
            console.log(`New issue has been generated in repository`, issuesRepo);
          }
      }); //end newIssue
}; //end open

module.exports = {
    openDeleteIssue
};
