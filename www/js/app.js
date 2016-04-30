// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('poetryManager', ['ionic', 'poetryManager.controllers', 'poetryManager.services', 'ngCordova.plugins.camera'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Set platform to iOS for testing
  ionic.Platform.setPlatform('ios');
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.poetry', {
    url: '/poetry',
    views: {
      'menuContent': {
        templateUrl: 'templates/poetry.html',
        controller: 'poetryCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.images', {
    url: '/images',
    views: {
      'menuContent': {
        templateUrl: 'templates/images.html',
        controller: 'imageCtrl'
      }
    }
  })

  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'SpeakersCtrl'
      }
    }
  })

  .state('app.user', {
    url: '/user/:speakerId',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller: 'SpeakerCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});