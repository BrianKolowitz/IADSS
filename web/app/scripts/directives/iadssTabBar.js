'use strict';

angular.module('iadssWebApp')
  .directive('iadssTabBar', [function () {
    return {
      templateUrl: '/views/partials/iadssTabBar.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      }
    };
  }]);
