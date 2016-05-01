angular.module('poetryManager.controllers', [])

.controller('AppCtrl', function() {})

.controller('SpeakersCtrl', function($scope, $ionicScrollDelegate, Speakers) {
  $scope.speakers = Speakers.all();
  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop({
      shouldAnimate: true
    });
  }
})

.controller('SpeakerCtrl', function($scope, $stateParams, Speakers) {
  console.log($stateParams);
  $scope.speaker = Speakers.get($stateParams.speakerId);
})

.controller('profilesCtrl', function($scope, Accounts) {
  $scope.accounts = Accounts.profiles();
})

.controller('profileCtrl', function($scope, $stateParams, $firebaseArray, $cordovaCamera, $ionicActionSheet, $firebaseObject, Accounts, ImageUpload) {
  // console.log($stateParams);
  
  $scope.accounts = Accounts.profiles();
  $scope.account = Accounts.get($stateParams.profileId);
  var unique = new Firebase('https://poetry-prototype.firebaseio.com/profiles/');
  var uniqueRef = unique.child($scope.account);
  $scope.profile = $firebaseObject(uniqueRef);
  
  $scope.getUser = function () {
    var ref =  new Firebase('https://poetry-prototype.firebaseio.com/')
    var userRef = ref.child('profiles');
    $scope.users = $firebaseArray(userRef);
    return $scope.users
  }
  $scope.getUser();

  $scope.adminStatus = function(id, status, name) {
    $scope.userID = id;
    $scope.status = status;
    $scope.name = name
    var agu = new Firebase('https://poetry-prototype.firebaseio.com/profiles/' + $scope.userID);
    if ($scope.status) {
      agu.update({admin: true});
      console.log($scope.name + ' is now an admin');
    } else {
      agu.update({admin: false});
      console.log($scope.name + ' is no longer an admin');
    }
  }

  function updatePhoto(img) {
    console.log(img);
    $scope.noob = img;
  }

  $scope.takePicture = function() {
    $ionicActionSheet.show({
      buttons: [{
        text: 'Picture'
      }, {
        text: 'Selfie'
      }, {
        text: 'Saved Photo'
      }],
      titleText: 'Change Profile Picture',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        ionic.Platform.isWebView() ? newProfilePicture(index) : newFakePicture();
        return true;
      }
    });

    function newProfilePicture(cameraIndex) {
      var options = {
        quality: 50,
        sourceType: cameraIndex === 2 ? 2 : 1,
        cameraDirection: cameraIndex,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var photo = 'data:image/jpeg;base64,' + imageData;
        $scope.photon = photo;
        updatePhoto(photo);
      }, function(err) {
        // error
        console.error(err);
        newFakePicture();
      });
    }

    function configureFakePicture() {
      console.log('Added fake picture');
    }
  };
})

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
