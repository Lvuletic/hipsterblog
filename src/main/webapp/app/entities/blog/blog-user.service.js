(function() {
    'use strict';
    angular
        .module('hipsterblogApp')
        .factory('BlogUser', BlogUser);

    BlogUser.$inject = ['$resource'];

    function BlogUser ($resource) {
        var resourceUrl =  'api/user-blogs';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},   
        });
    }
})();
