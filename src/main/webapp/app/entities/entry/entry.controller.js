(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('EntryController', EntryController);

    EntryController.$inject = ['$scope', '$state', 'DataUtils', 'Entry', 'ParseLinks', 'AlertService'];

    function EntryController ($scope, $state, DataUtils, Entry, ParseLinks, AlertService) {
        var vm = this;
        vm.entries = [];
        vm.predicate = 'id';
        vm.reverse = true;
        vm.page = 0;
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.loadAll = function() {
            Entry.query({
                page: vm.page,
                size: 20,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.entries.push(data[i]);
                }
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        };
        vm.reset = function() {
            vm.page = 0;
            vm.entries = [];
            vm.loadAll();
        };
        vm.loadPage = function(page) {
            vm.page = page;
            vm.loadAll();
        };

        vm.loadAll();

    }
})();
