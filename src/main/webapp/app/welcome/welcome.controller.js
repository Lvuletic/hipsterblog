(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', 'Principal', 'Entry', 'Tag', 'EntryTags', 'LoginService', '$state', 'AlertService', 'DataUtils', 'ParseLinks'];

    function WelcomeController ($scope, Principal, Entry, Tag, EntryTags, LoginService, $state, AlertService, DataUtils, ParseLinks) {
        var vm = this;

        vm.account = null;
        vm.entries = [];
        vm.tags = [];
        vm.page = 0;
        vm.predicate = 'id';
        vm.currentTag = null;
        vm.reverse = false;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        vm.loadAll = function(page) {
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
            vm.currentTag = null;
            vm.loadAll();
        };
        vm.loadPage = function(page) {
            vm.page = page;
            vm.loadAll();
        };

        vm.loadAll();
        
        vm.tags = Tag.query();
        
        vm.loadByTag = function(tagId, tagName) {
        	vm.currentTag = tagName;
        	EntryTags.query({id: tagId},onSuccess, onError);
        	function onSuccess(data, headers) {
        		vm.entries = [];
        		//vm.links = ParseLinks.parse(headers('link'));
                //vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.entries.push(data[i]);
                }
        	}
        	function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        
        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
