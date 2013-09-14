'use strict';

angular.module('iadssWebApp')
    .factory('StudyInfo', ['$http', '$q', function($http, $q) {
        return {
            count: function() {

                var deferred = $q.defer();
                var promise = $http.get('./api/study/info')
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function(error){
                        // if there's an error, return 0 results;
                        deferred.resolve(0);
                    });
                // Return the promise to the controller
                return deferred.promise;
            }
        };
    }]);