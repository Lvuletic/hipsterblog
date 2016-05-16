(function() {
    'use strict';

    angular
        .module('hipsterblogApp')
        .controller('EntryDialogController', EntryDialogController);

    EntryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Entry', 'Blog', 'BlogUser', 'Tag', 'Principal'];

    function EntryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Entry, Blog, BlogUser, Tag, Principal) {
        var vm = this;
        vm.entry = entity;
        vm.tags = Tag.query();

        Principal.hasAuthority("ROLE_ADMIN").then(function(result) {
        	vm.isAdmin = result;
        	if (result) {
        		vm.blogs = Blog.query();
        	} else {
        		vm.blogs = BlogUser.query();
        	}
        });   
        
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('hipsterblogApp:entryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.entry.id !== null) {
                Entry.update(vm.entry, onSaveSuccess, onSaveError);
            } else {
                Entry.save(vm.entry, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.date = false;

        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
