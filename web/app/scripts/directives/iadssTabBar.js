'use strict';

angular.module('iadssWebApp')
  .directive('iadssTabBar', [function () {
    return {
      templateUrl: '/views/partials/iadssTabBar.html',
      restrict: 'A',
      scope: {
      },
      controller: function ($scope) {

      // alternatively, you could pass this tab
      // definition object into the
      // directive, for better reuse of this directive
      // this would require setting an
      // ng-controller="myController" in the index.js
      // which we discussed would be wierd, as we don't do that
      // anywhere else.

        $scope.tabs = [
        { title: "Home", template: "/" },
        { title: "Study List", template: "/#/study" },
        { title: "Patient List", template: "/#/patient" },
        { title: "Fake", template: "/#/fake" }
        ];

        $scope.selectedTab = $scope.tabs[0];

        $scope.setSelectedTab = function (tab) {
            $scope.selectedTab = tab;
        };

        $scope.isActive = function (tab) {

           return $scope.selectedTab == tab ? "active" : "";

        };
      }
    };
  }]);
