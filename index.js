var spUrl = 'yoururl';

var creds = {
  username: 'username',
  password: 'password',
  domain: 'domain'
};

var spr = require('sp-request').create(creds);

spr.get(spUrl + '_api/web/lists/GetByTitle(\'TestList\')')
  .then(function (response) {
    console.log('List Id: ' + response.body.d.Id);
  })
  .catch(function(err){
    console.log('Ohhh, something went wrong...');
  });

  spr.get(spUrl + '_api/web/lists/GetByTitle(\'TestDocs\')')
  .then(function (response) {
    console.log('List Id: ' + response.body.d.Id);
  })
  .catch(function(err){
    console.log('Ohhh, something went wrong...');
  });

spr.requestDigest(spUrl)
  .then(function (digest) {
    return spr.post(spUrl +'_api/web/lists/GetByTitle(\'TestList\')/items', {
      body: {
        '__metadata': { 'type': 'SP.ListItem' },
        'Title': 'TestList'
      },
      headers: {
        'X-RequestDigest': digest,
        'X-HTTP-Method': 'POST',
        'IF-MATCH': '*'
      }
    });
  })
  .then(function (response) {
    if (response.statusCode === 204) {
      console.log('List item added!');
    }
  }, function (err) {
    if (err.statusCode === 404) {
      console.log('List not found!');
    } else {
      console.log(err);
    }
  });


  //http://stackoverflow.com/questions/38774918/sharepoint-online-merge-unsupported

