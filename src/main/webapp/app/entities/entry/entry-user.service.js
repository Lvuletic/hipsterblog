(function() {
    'use strict';
    angular
        .module('hipsterblogApp')
        .factory('EntryUser', EntryUser);

    EntryUser.$inject = ['$resource', 'DateUtils'];

    function EntryUser ($resource, DateUtils) {
        var resourceUrl =  'api/entries-user';
        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
