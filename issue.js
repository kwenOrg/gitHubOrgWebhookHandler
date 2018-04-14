/** Opens a Github issue with data provided by the webhook POST request  */
const octokit = require ('@octokit/rest')()
const dotenv = require('dotenv').config()
if (dotenv.error) {
    throw dotenv.error
  }

octokit.authenticate({
    type: 'token',
    token: process.env.GIT_TOKEN
})

//async function open(repoName, orgName, userName){
var open = (repoName, orgName, userName) => {
      //debugging
      console.log ('reponame is', repoName);
      console.log ('orgName is', orgName);
      console.log ('userName is', userName);

      const newIssue = octokit.issues.create({
             owner: 'kkwentus',
             repo: 'notify-on-delete',
             title: `${repoName} has been deleted`,
             body: `This is an auto-generated ticket to track the deletion of repository ${repoName} in the organziation ${orgName} by user ${userName}.  @kkwentus Please review`,
             assignee: 'kkwentus',
             labels: 'admin review'
      },
        (error, results) => {
          if(error){
              console.log('Error on issue creation ===> ', error)
              process.exit(1);
          }
          else{
              console.log('Issue creation results ===>', results)
          }
      }); //end newIssue

}; //end open

module.exports = {
    open
};