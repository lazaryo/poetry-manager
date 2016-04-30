angular.module('poetryManager.controllers', [])

.controller('AppCtrl', function() {})

.factory('ImageUpload', function($firebaseArray) {
  var APIUrl = 'https://poetry-prototype.firebaseio.com/';
  var ref = new Firebase(APIUrl);
  var postsRef = ref.child('images');
  return {
    images: function() {
      return $firebaseArray(postsRef);
    }
  };
})

.factory('poetryList', function($firebaseArray) {
  var APIUrl = 'https://poetry-prototype.firebaseio.com/poems/';
  var ref = new Firebase(APIUrl);
  return $firebaseArray(ref);
})

.controller('poetryCtrl', function($scope, $ionicScrollDelegate, poetryList) {
  $scope.poetry = poetryList;

  $scope.data = {
    showDelete: false
  };

  $scope.removePoem = function(val) {
    var poem = new Firebase('https://poetry-prototype.firebaseio.com/poems/' + val);
    poem.remove();
  };

  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop({
      shouldAnimate: true
    });
  }
})

.controller('imageCtrl', function($scope, ImageUpload, $cordovaCamera, $ionicScrollDelegate, $ionicModal, $ionicActionSheet, $timeout) {
  $scope.verifyImage = function(id, alternate){
    $scope.verification = id;
    $scope.alternate = alternate;
    var agu = new Firebase('https://poetry-prototype.firebaseio.com/images/' + $scope.verification);
    if ($scope.alternate) {
      agu.update({verified: true});
      console.log($scope.verification + ' is now true');
    } else {
      agu.update({verified: false});
      console.log($scope.verification + ' is now false');
    }
  }

  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop({
      shouldAnimate: true
    });
  }

  $scope.delete = function(id){
    var removeImage = new Firebase('https://poetry-prototype.firebaseio.com/images/' + id);
    removeImage.remove();
    console.log(id + ' was deleted');
  }

  function scrollBottom() {
    $ionicScrollDelegate.$getByHandle('chat').scrollBottom();
  }

  function addPhoto(img) {
    ImageUpload.images().$add({
      img: img ? img : null,
      timestamp: new Date().getTime(),
      verified: false
    });
  }

  $scope.images = ImageUpload.images();

  $scope.takePicture = function() {
    $ionicActionSheet.show({
      buttons: [{
        text: 'Picture'
      }, {
        text: 'Selfie'
      }, {
        text: 'Saved Photo'
      }],
      titleText: 'Upload...',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        ionic.Platform.isWebView() ? takeARealPicture(index) : takeAFakePicture();
        return true;
      }
    });

    function takeARealPicture(cameraIndex) {
      var options = {
        quality: 50,
        sourceType: cameraIndex === 2 ? 2 : 1,
        cameraDirection: cameraIndex,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var photo = 'data:image/jpeg;base64,' + imageData;
        addPhoto(photo);
      }, function(err) {
        // error
        console.error(err);
        takeAFakePicture();
      });
    }

    function takeAFakePicture() {
      addPhoto($cordovaCamera.getPlaceholder());
    }
  };
});
