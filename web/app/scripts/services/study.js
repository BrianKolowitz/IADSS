'use strict';

angular.module('iadssWebApp')
    .factory('Study', ['$resource', function($resource) {
        return $resource('/api/study/:studyId',
            { studyId: '@id' }, {
                update: { method: 'put' }
            });
    }]);
