'use strict';

angular.module('iadssWebApp')
  .directive('addImage', [function () {
    return {
      templateUrl: '/partials/iadssImageList.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the addImage directive');
      }
    };
  }]);
