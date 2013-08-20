'use strict';

angular.module('iadssWebApp')
  .directive('iadssNavBar', function () {
    return {
      template: '<div>this is my directive</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the iadssNavBar directive');
      }
    };
  });
