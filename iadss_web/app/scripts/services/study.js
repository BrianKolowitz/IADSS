'use strict';

angular.module('iadssWebApp')
    .factory('Study', ['$resource', function($resource) {
        return $resource('/api/studies/:studyId', {studyId:'@id'});
    }]);
