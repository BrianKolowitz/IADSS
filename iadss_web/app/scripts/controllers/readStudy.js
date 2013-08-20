'use strict';

angular.module('iadssWebApp')
  .controller('ReadStudyCtrl', ['$scope', '$routeParams', 'Study', function ($scope, $routeParams, Study) {
        $scope.study = Study.get({studyId: $routeParams.studyId});
  }]);

