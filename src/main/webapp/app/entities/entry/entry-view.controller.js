(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('EntryViewController', EntryViewController);

    EntryViewController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Entry', 'Blog', 'Tag', 'Principal'];

    function EntryViewController($scope, $rootScope, $stateParams, DataUtils, entity, Entry, Blog, Tag, Principal) {
        var vm = this;
        vm.entry = entity;
        vm.login = null;

        Principal.identity().then(function(result) {
        	if (result) {
            	vm.login = result.login;
        	}
        });
        
        var unsubscribe = $rootScope.$on('hipsterblogApp:entryUpdate', function(event, result) {
            vm.entry = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();
