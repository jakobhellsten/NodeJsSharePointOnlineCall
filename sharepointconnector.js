var spUrl = 'yoururl';

var creds = {
  username: 'username',
  password: 'password',
  domain: 'domain'
};

var sharepoint = require('sharepointconnector')({
  username : creds.username,
  password : creds.password,
  // Authentication type - current valid values: ntlm, basic, online,onlinesaml 
  type : 'online',
  url : spUrl
});


sharepoint.login(function(err){
  if (err){
    return console.error(err);
  }
  // Once logged in, we can list the "lists" within sharepoint 
  sharepoint.lists.list(function(err, listRes){
      var aList = listRes[0];
    // We can pick a particular list, and read it. This also gives us the list's Items[] and Fields[] 
    sharepoint.lists.read(aList.Id, function(err, listRead){
      console.log(singleResult);
    });
  });
});


/*sharepoint.listItems.create('TestList', { Title : 'My new list item' }, function(err, listCreateResult){
 
});*/