angular.module('poetryManager.controllers', ['firebase'])

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

.controller('profileCtrl', function($scope, $ionicPopup, $stateParams, $firebaseArray, $cordovaCamera, $ionicActionSheet, $firebaseObject, Accounts, ImageUpload) {
  // console.log($stateParams);

  $scope.data = {
    showDelete: false
  };

   // Confirm Delete
    $scope.confirmDelete = function(theirId, name, email) {
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        title: 'Enter pasword',
        template: 'Confirm deletion with password<br><input type="password" ng-model="data.password">',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: 'Delete',
            type: 'button-assertive',
            onTap: function(e) {
              if ($scope.data.password != 'password') {
                e.preventDefault();
              } else {
                console.log('User ID: ' + theirId + '\nName: ' + name + '\nEmail: ' + email);
                // delete profile then close popup
                myPopup.close();
              }
            }
          }
        ]
      });
     };

   // $scope.showConfirm = function(theirId, name, email) {
   //   var confirmPopup = $ionicPopup.confirm({
   //    title: 'Delete ' + name,
   //     template: 'Are you sure you want to delete this profile?'
   //   });

   //   confirmPopup.then(function(res) {
   //     if(res) {
   //        var removePerson = new Firebase('https://poetry-prototype.firebaseio.com/profiles/' + theirId);
   //        removePerson.remove();
   //        var ref = new Firebase("https://poetry-prototype.firebaseio.com");
   //        ref.removeUser({
   //          email: email,
   //          password: "password"
   //        }, function(error) {
   //          if (error) {
   //            switch (error.code) {
   //              case "INVALID_USER":
   //                console.log("The specified user account does not exist.");
   //                break;
   //              case "INVALID_PASSWORD":
   //                console.log("The specified user account password is incorrect.");
   //                break;
   //              default:
   //                console.log("Error removing user:", error);
   //            }
   //          } else {
   //            console.log("User account deleted successfully!");
   //          }
   //        });
   //        console.log('You want to delete ' + name);
   //     } else {
   //        console.log('You don\'t want to delete ' + name);
   //     }
   //   });
   // };

  $scope.removeProfile = function() {
    $scope.idk = 'Removed Profile';
    console.log($scope.idk);
  }

  $scope.accounts = Accounts.profiles();
  $scope.account = Accounts.get($stateParams.profileId);
  var unique = new Firebase('https://poetry-prototype.firebaseio.com/profiles/');
  var uniqueRef = unique.child($scope.account);
  $scope.profile = $firebaseObject(uniqueRef);

  $scope.visible = true;
  $scope.editProfile = function(name, email) {
    $scope.visible = false;
    $scope.their = {};
    $scope.their.name = name;
    $scope.their.email = email;
  }

  $scope.saveEdits = function(val, val2) {
    $scope.visible = true;
    $scope.newProfile = {};
    $scope.newProfile.name = val;
    $scope.newProfile.email = val2;
    var new_unique = new Firebase('https://poetry-prototype.firebaseio.com/profiles/' + $scope.account);
    new_unique.update({name: $scope.newProfile.name, email: $scope.newProfile.email});
    if ($scope.newProfile.email == $scope.profile.email) {
      console.log('Email is the same.');
    } else {
      var ref = new Firebase("https://poetry-prototype.firebaseio.com");
      ref.changeEmail({
        oldEmail: $scope.profile.email,
        newEmail: $scope.newProfile.email,
        password: "password"
      }, function(error) {
        if (error) {
          switch (error.code) {
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
          console.log("User email changed successfully!");
        }
      });
    }
  }
  
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

  // get the img data and id of profile to update profile picture
  function updatePhoto(img, thisId) {
    $scope.noob = img;
    $scope.thisId = thisId;
    var juno = new Firebase('https://poetry-prototype.firebaseio.com/profiles/' + $scope.thisId);
    juno.update({face: $scope.noob});  
  }

  $scope.takePicture = function(val) {
    $scope.hmm = val;
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
        ionic.Platform.isWebView() ? newProfilePicture(index, $scope.hmm) : newFakePicture();
        return true;
      }
    });

    function newProfilePicture(cameraIndex, huh) {
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
        updatePhoto(photo, huh);
      }, function(err) {
        // error
        console.error(err);
        newFakePicture();
      });
    }

    function newFakePicture() {
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
