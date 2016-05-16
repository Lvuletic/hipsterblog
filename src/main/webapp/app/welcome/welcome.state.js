(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('welcome', {
            parent: 'app',
            url: '/welcome',
            data: {
                authorities: [],
            },
            views: {
                'content@': {
                    templateUrl: 'app/welcome/welcome.html',
                    controller: 'WelcomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
