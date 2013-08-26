'use strict';

angular.module('iadssWebApp')
    .controller('StudyEditCtrl', ['$scope', '$routeParams', '$window', '$location', 'Study',
        function ($scope, $routeParams, $window, $location, Study) {
            $scope.study = Study.get({studyId: $routeParams.studyId});
            $scope.readonly = false;

            $scope.saveStudy = function () {
                Study.update($scope.study);
                $location.path('/'); // todo : redirect home
            };

            $scope.cancel = function() {
                $window.history.back();
            };
  }]);
