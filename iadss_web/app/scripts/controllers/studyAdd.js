'use strict';

angular.module('iadssWebApp')
    .controller('StudyAddCtrl', ['$scope', '$routeParams', '$window', '$location', 'Study',
        function ($scope, $routeParams, $window, $location, Study) {

        $scope.study = {
            accessionNumber: '',
            patient: {
                medicalRecordNumber: '',
                name: ''
            }
        };

        $scope.addStudy = function () {
            var newStudy = new Study();
            newStudy.accessionNumber = $scope.study.accessionNumber;
            newStudy.patient = $scope.study.patient;
            newStudy.$save(function(){
                $location.path('/studyEdit/' + newStudy.id);
            });
        };

        $scope.cancel = function() {
            $window.history.back();
        };
  }]);
