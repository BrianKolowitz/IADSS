'use strict';

angular.module('iadssWebApp')
  .directive('iadssImageList', ['_', 'Image', function (_, Image) {
    return {
      templateUrl: '/views/partials/iadssImageList.html',
      restrict: 'A',
      controller: function($scope) {
          $scope.deleteImage = function(image) {
              Image.remove({ studyId: image.study_id, imageId: image.id });

              $scope.study.images = _.without($scope.study.images, _.findWhere($scope.study.images, { id: image.id }));
          };
      }
    };
  }]);
