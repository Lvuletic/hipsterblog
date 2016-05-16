(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', '$state', 'Blog'];

    function BlogController ($scope, $state, Blog) {
        var vm = this;
        vm.blogs = [];
        vm.loadAll = function() {
            Blog.query(function(result) {
                vm.blogs = result;
            });
        };

        vm.loadAll();
        
    }
})();
