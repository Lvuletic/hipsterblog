(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('TagDetailController', TagDetailController);

    TagDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Tag', 'Entry'];

    function TagDetailController($scope, $rootScope, $stateParams, entity, Tag, Entry) {
        var vm = this;
        vm.tag = entity;
        
        var unsubscribe = $rootScope.$on('hipsterblogApp:tagUpdate', function(event, result) {
            vm.tag = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
