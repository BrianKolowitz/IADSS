'use strict';

angular.module('iadssWebApp', ['ngResource'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/study', {
        templateUrl: 'views/study.html',
        controller: 'StudyCtrl'
      })
      .when('/studyRead/:studyId', {
        templateUrl: 'views/studyRead.html',
        controller: 'StudyReadCtrl'
      })
      .when('/studyDelete/:studyId', {
        templateUrl: 'views/studyDelete.html',
        controller: 'StudyDeleteCtrl'
      })
      .when('/studyAdd', {
        templateUrl: 'views/studyAdd.html',
        controller: 'StudyAddCtrl'
      })
      .when('/studyEdit/:studyId', {
        templateUrl: 'views/studyEdit.html',
        controller: 'StudyEditCtrl'
      })
      .when('/image', {
        templateUrl: 'views/image.html',
        controller: 'ImageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
