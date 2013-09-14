'use strict';

angular.module('iadssWebApp')
    .controller('StudyCtrl', ['$scope', 'StudyInfo', 'Study', function ($scope, StudyInfo, Study) {
        $scope.itemsPerPage = 5;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        StudyInfo.count().success(function(studyCount) {
            $scope.totalItems = studyCount;

            $scope.$watch('currentPage', function() {
                $scope.studies = Study.query({
                    limit: $scope.itemsPerPage,
                    offset: ($scope.currentPage - 1) * $scope.itemsPerPage
                });
            });

        });
  }]);
