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

        $scope.ok = function () {
            $scope.progressVisible = true;
            $http({
                method: 'POST',
                url: "/api/study/" + $scope.study.id + "/image",
                headers: {
                    'Content-Type': false //'multipart/form-data'
                },
                data: {
                    normal: $scope.study.normal,
                    report: $scope.study.report,
                    studyFile: $scope.study.file
                },
                transformRequest: formDataObject
            }).success(function(image) {
                $modalInstance.close(image);
            });


            /*var fd = new FormData();
            fd.append("normal", $scope.study.normal);
            fd.append("report", $scope.study.report);
            fd.append("studyFile", $scope.study.file);*/

            /*var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", _uploadProgress, false);
            xhr.addEventListener("load", _uploadComplete, false);
            xhr.addEventListener("error", _uploadFailed, false);
            xhr.addEventListener("abort", _uploadCanceled, false);
            xhr.open("POST", "/api/study/" + $scope.study.id + "/image");  // todo : replace with angular resource
            $scope.progressVisible = true;
            xhr.send(fd);*/

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.setFiles = function(element) {
            $scope.$apply(function(scope) {
                // Turn the FileList object into an Array
                scope.study.file = element.files[0]; // todo : add full support for multiple files
                scope.progressVisible = false
            });
        };

        // ----------------------------------------//
        // ----------- private functions ----------//
        // ----------------------------------------//
        function _uploadProgress(evt) {
            $scope.$apply(function(){
                if (evt.lengthComputable) {
                    $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                } else {
                    $scope.progress = 'unable to compute';
                }
            })
        }

        function _uploadComplete(evt) {
            /* This event is raised when the server send back a response */
            alert(evt.target.responseText);
            // todo : add record to image list
            // todo : close dialog
        }

        function _uploadFailed(evt) {
            alert("There was an error attempting to upload the file.");
        }

        function _uploadCanceled(evt) {
            $scope.$apply(function(){
                $scope.progressVisible = false;
            })
            alert("The upload has been canceled by the user or the browser dropped the connection.");
        }
    }]);
