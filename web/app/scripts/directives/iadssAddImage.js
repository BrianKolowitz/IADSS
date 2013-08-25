'use strict';

angular.module('iadssWebApp')
  .directive('iadssAddImage', [function () {
    return {
      templateUrl: '/views/partials/iadssAddImage.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the addImage directive');
      }
    };
  }]);
