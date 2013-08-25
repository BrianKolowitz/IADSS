'use strict';

angular.module('iadssWebApp')
  .directive('iadssNavBar', function () {
    return {
      templateUrl: '/views/partials/iadssNavBar.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the iadssNavBar directive');
      }
    };
  });
