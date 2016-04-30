angular.module('poetryManager.services', ['firebase'])

/**
 * A simple Firebase service
 */
.factory('ImageUpload', function($firebaseArray) {
  var APIUrl = 'https://poetry-gallery.firebaseio.com/';
  var ref = new Firebase(APIUrl);
  var postsRef = ref.child('images');
  return {
    images: function() {
      return $firebaseArray(postsRef.limitToLast(1000));
    }
  };
})

/**
 * A simple example service that returns some data.
 */
.factory('Speakers', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var speakers = [{
    id: 0,
    name: 'Malik Hemphill',
    notes: 'Enjoys writing things',
    face: 'https://upload.wikimedia.org/wikipedia/en/0/0d/The_xx_logo.jpg'
  }, {
    id: 1,
    name: 'Andrew Price',
    notes: 'Odd obsession with everything',
    face: 'https://upload.wikimedia.org/wikipedia/en/0/0d/The_xx_logo.jpg'
  }, {
    id: 2,
    name: 'Isaac Reede',
    notes: 'Wears a sweet leather Jacket for peace',
    face: 'https://upload.wikimedia.org/wikipedia/en/0/0d/The_xx_logo.jpg'
  }, {
    id: 3,
    name: 'Daniela Andrade',
    notes: 'I think she needs to buy a boat',
    face: 'https://upload.wikimedia.org/wikipedia/en/0/0d/The_xx_logo.jpg'
  }, {
    id: 4,
    name: 'Amelia Brown',
    notes: 'Just the nicest woman',
    face: 'https://upload.wikimedia.org/wikipedia/en/0/0d/The_xx_logo.jpg'
  }];

  return {
    all: function() {
      return speakers;
    },
    get: function(speakerId) {
      // Simple index lookup
      return speakers[speakerId];
    }
  };
});
