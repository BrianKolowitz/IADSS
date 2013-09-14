'use strict';

angular.module('iadssWebApp')
    .controller('StudyCtrl', ['$scope', 'Study', function ($scope, Study) {
        // select a count
        $scope.itemsPerPage = 5;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        // get count
        var studies = Study.query(function(){ // todo : replace with count query
            $scope.totalItems = studies.length;
        });


        $scope.$watch('currentPage', function() { // todo : figure out how to use on-select-page
            // todo : don't allow query until count query returns
            $scope.studies = Study.query({
                    limit: $scope.itemsPerPage,
                    offset: ($scope.currentPage - 1)* $scope.itemsPerPage
                });
        });
  }]);
