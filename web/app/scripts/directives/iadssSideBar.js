'use strict';

angular.module('iadssWebApp')
  .directive('iadssSideBar', [function () {
    return {
      templateUrl: '/views/partials/iadssSideBar.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the iadssSideBar directive');
      }
    };
  }]);
