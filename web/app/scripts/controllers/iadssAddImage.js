'use strict';

angular.module('iadssWebApp')
    .controller('IadssAddImageCtrl', ['$scope', '$http', '$modalInstance', '$log', '$q', 'Image', 'formDataObject', 'studyId',
        function ($scope, $http, $modalInstance, $log, $q, Image, formDataObject, studyId) {
        $scope.study = {
            id: studyId,
            normal: false,
            report: '',
            file: null
        };

        $scope.progressVisible = false;
        $scope.progressError = false;
        $scope.progressErrorMessage = '';

        $scope.ok = function () {
            $scope.progressVisible = true;
            $http({
                method: 'POST',
                url: "/api/study/" + $scope.study.id + "/image",
                headers: {
                    'Content-Type': false
                },
                data: {
                    normal: $scope.study.normal,
                    report: $scope.study.report,
                    studyFile: $scope.study.file
                },
                transformRequest: formDataObject
            }).success(function(data) {
                $modalInstance.close(data);
                $scope.progressVisible = false;
            }).error(function() {
                $scope.progressErrorMessage = "There was an error attempting to upload the file.";
                $scope.progressError = true;
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            $scope.progressVisible = false;
        };

        $scope.setFiles = function(element) {
            $scope.$apply(function(scope) {
                scope.study.file = element.files[0]; // todo : add full support for multiple files
            });
        };
    }]);
