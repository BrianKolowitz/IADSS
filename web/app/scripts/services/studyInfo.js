'use strict';

angular.module('iadssWebApp')
    .factory('StudyInfo', ['$http', function($http) {
        return {
            count: function() {
                return $http.get('/api/study/info');
            }
        };
    }]);