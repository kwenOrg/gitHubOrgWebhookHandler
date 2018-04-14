/** Opens a Github issue with data provided by the webhook POST request  */

var open = (repoName, orgName, userName) => {
      console.log ('reponame is', repoName);
      console.log ('orgName is', orgName);
      console.log ('userName is', userName);
};


module.exports = {
    open
};