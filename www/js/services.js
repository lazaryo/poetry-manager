angular.module('poetryManager.services', ['firebase'])

/**
 * A simple Firebase service
 */
.factory('ImageUpload', function($firebaseArray) {
  var APIUrl = 'https://poetry-prototype.firebaseio.com/';
  var ref = new Firebase(APIUrl);
  var postsRef = ref.child('images');
  return {
    images: function() {
      return $firebaseArray(postsRef.limitToLast(1000));
    }
  };
});
