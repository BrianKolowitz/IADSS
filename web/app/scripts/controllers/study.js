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
        $scope.totalItems = 0;

        // ----------------------------------------//
        // ----------- Page load events -----------//
        // ----------------------------------------//
        StudyInfo.count()
            .then(function (response) {
                console.log('count returned');
                $scope.totalItems = angular.copy(response);
            });

        $scope.$watch('currentPage', function (){
            console.log('watch setup');
            $scope.studies = _getStudiesForPage();
        });

        // ----------------------------------------//
        // ----------- private functions ----------//
        // ----------------------------------------//

        function _getStudiesForPage () {
            console.log('query for studies');
            return Study.query({
                limit: $scope.itemsPerPage,
                offset: Number($scope.currentPage - 1) * $scope.itemsPerPage
            });
        };

    }]);
