'use strict';

angular.module('iadssWebApp')
    .factory('User', ['$resource', function($resource) {
        return $resource('/api/users/:userId', {userId:'@id'});
    }]);
