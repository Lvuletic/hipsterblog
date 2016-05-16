(function() {
    'use strict';
    angular
        .module('hipsterblogApp')
        .factory('EntryTags', EntryTags);

    EntryTags.$inject = ['$resource', 'DateUtils'];

    function EntryTags ($resource, DateUtils) {
        var resourceUrl =  'api/entries-tags/:id';
        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
