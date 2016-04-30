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
    face: 'img/malik_hemphill.jpg'
  }, {
    id: 1,
    name: 'Andrew Price',
    notes: 'Odd obsession with everything',
    face: 'img/andrew_price.jpg'
  }, {
    id: 2,
    name: 'Isaac Reede',
    notes: 'Wears a sweet leather Jacket for peace',
    face: 'img/isaac_reede.jpg'
  }, {
    id: 3,
    name: 'Daniela Andrade',
    notes: 'A muse that sings',
    // face: 'img/daniela_andrade.jpg'
    face: 'img/daniela_andrade2.jpg'
  }, {
    id: 4,
    name: 'Amelia Brown',
    notes: 'Just the loveliest INFJ',
    face: 'img/amelia_brown.jpg'
    // face: 'img/amelia_brown2.jpg'
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
