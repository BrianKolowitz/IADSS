'use strict';

angular.module('iadssWebApp')
    .controller('StudyCtrl', ['$scope', 'StudyInfo', 'Study', function ($scope, StudyInfo, Study) {

        // ----------------------------------------//
        // ----------- scope assignments ----------//
        // ----------------------------------------//
        $scope.itemsPerPage = 5;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 5;

        // ----------------------------------------//
        // ----------- Page load events -----------//
        // ----------------------------------------//
        StudyInfo.count()
            .success(function (response) {
                $scope.totalItems = angular.copy(response);
            });

        $scope.$watch('currentPage', function (){
            $scope.studies = _getStudiesForPage();
        });

        // ----------------------------------------//
        // ----------- private functions ----------//
        // ----------------------------------------//
        function _getStudiesForPage () {
            return Study.query({
                limit: $scope.itemsPerPage,
                offset: Number($scope.currentPage - 1) * $scope.itemsPerPage
            });
        };
    }]);
