(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entry', {
            parent: 'entity',
            url: '/entry',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Entries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry/entries.html',
                    controller: 'EntryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('entry-detail', {
            parent: 'entity',
            url: '/entry/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Entry'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry/entry-detail.html',
                    controller: 'EntryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Entry', function($stateParams, Entry) {
                    return Entry.get({id : $stateParams.id});
                }]
            }
        })
        .state('entry.new', {
            parent: 'entry',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                content: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: true });
                }, function() {
                    $state.go('entry');
                });
            }]
        })
        .state('entry.edit', {
            parent: 'entry',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entry.delete', {
            parent: 'entry',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-delete-dialog.html',
                    controller: 'EntryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        }).state('entry-view', {
        	parent: 'entry',
        	url: '/view/{id}',
        	data: {
        		authorities: [],
        		pageTitle: 'View entry'
        	},
        	views: {
        		'content@': {
        			templateUrl: 'app/entities/entry/entry-view.html',
        			controller: 'EntryViewController',
        			controllerAs: 'vm'
        		}
        	},
        	resolve: {
        		entity: ['$stateParams', 'Entry', function($stateParams, Entry) {
        			return Entry.get({id : $stateParams.id});
        		}]
        	}
        }).state('entry-user', {
        	parent: 'entry',
        	url: '/view-all',
        	data: {
        		authorities: [],
        		pageTitle: 'Your posts'
        	},
        	views: {
        		'content@': {
        			templateUrl: 'app/entities/entry/entries-user.html',
        			controller: 'EntryUserController',
        			controllerAs: 'vm'
        		}
        	}
        }).state('entry-user.new', {
            parent: 'entry-user',
            url: '/new-post',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                content: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('entry-user', null, { reload: true });
                }, function() {
                    $state.go('entry-user');
                });
            }]
        }) .state('entry-view.edit', {
            parent: 'entry-view',
            url: '/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-dialog.html',
                    controller: 'EntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry-view', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        }) .state('entry-view.delete', {
            parent: 'entry-view',
            url: '/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry/entry-delete-dialog.html',
                    controller: 'EntryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Entry', function(Entry) {
                            return Entry.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry-user', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
