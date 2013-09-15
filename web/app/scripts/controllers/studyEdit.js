'use strict';

angular.module('iadssWebApp')
    .controller('StudyEditCtrl', ['$scope', '$routeParams', '$window', '$location', '$modal', '$log', 'Study',
        function ($scope, $routeParams, $window, $location, $modal, $log, Study) {
            $scope.study = Study.get({studyId: $routeParams.studyId});
            $scope.readonly = false;

            $scope.saveStudy = function () {
                Study.update($scope.study);
                $location.path('/'); // todo : redirect home
            };

            $scope.cancel = function() {
                $window.history.back();
            };

            $scope.openAddImage = function () {
                var modalInstance = $modal.open({
                    templateUrl: '/views/partials/iadssAddImage.html',
                    controller: 'IadssAddImageCtrl',
                    resolve: {
                        studyId: function () {
                            return $scope.study.id;
                        }
                    }
                });

                modalInstance.result.then(function (image) {
                    $log.info('Modal closed at: ' + new Date() + ' with image id: ' + image.id);
                    $scope.study.images.push(image);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
  }]);
