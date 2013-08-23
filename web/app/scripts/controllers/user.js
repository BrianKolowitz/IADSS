'use strict';

angular.module('iadssWebApp')
  .controller('UserCtrl', ['$scope', 'User', function ($scope, User) {

    $scope.users = User.query();

    /*$scope.createVideo = function (newVideo) {
        newVideo.$save();
        $scope.videos.push(newVideo);
    };

    $scope.updateVideo = function(video) {
        video.$update();
    };

    $scope.deleteVideo = function (video) {
        video.$delete();
        $scope.videos = _.without($scope.videos, video);
    };*/
  }]);
