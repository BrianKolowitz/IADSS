'use strict';

angular.module('iadssWebApp')
    .factory('Image', ['$resource', function($resource) {
        return $resource('/api/study/:studyId/image/:imageId',
            {
                studyId: '@studyId',
                imageId: '@imageId'
            },
            {
                update: { method: 'put' }
            });
    }]);