'use strict';

angular.module('iadssWebApp')
    .controller('StudyReadCtrl', ['$scope', '$routeParams', 'Study', function ($scope, $routeParams, Study) {
        $scope.study = Study.get({studyId: $routeParams.studyId});
        $scope.readonly = true;
  }]);

