'use strict';

angular.module('iadssWebApp')
    .controller('StudyDeleteCtrl', ['$scope', '$routeParams', '$window', '$location', 'Study',
        function ($scope, $routeParams, $window, $location, Study) {

            $scope.study = Study.get({studyId: $routeParams.studyId});

            $scope.deleteStudy = function() {
                $scope.study.$delete();
                $location.path('/'); // todo : redirect home
            };

            $scope.cancel = function() {
                $window.history.back();
            };
    }]);