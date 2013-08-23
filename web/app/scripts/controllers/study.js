'use strict';

angular.module('iadssWebApp')
    .controller('StudyCtrl', ['$scope', 'Study', function ($scope, Study) {
    $scope.studies = Study.query();
  }]);
