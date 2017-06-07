<template>
    <div>
        <div class="uk-width-1-1" uk-grid>
            <div class="uk-width-1-3@m">
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">Categories</h3>
                    </div>
                    <div class="uk-card-body">
                        <table class="uk-table uk-table-hover uk-table-divider uk-table-striped" v-if="categories.length">
                            <tbody>
                            <tr v-for="category in categories">
                                <td>{{ category.name }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-else class="uk-card uk-card-body uk-padding-large uk-flex uk-flex-center">
                            <h3 class="uk-h2 uk-text-center uk-text-muted" v-if="$root.loadingData">
                                <div uk-spinner></div>
                            </h3>
                            <h3 class="uk-h3 uk-text-center uk-text-muted" v-else>No data found!</h3>
                        </div>
                    </div>
                    <div class="uk-card-footer">
                        <button class="uk-button uk-width-1-1 uk-button-secondary bg-ts"
                                uk-toggle="target: #new-category-modal">
                            <i class="fa fa-plus-circle"></i>
                            New Category
                        </button>
                    </div>
                </div>
            </div>
            <div class="uk-width-expand@m">
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">Categories</h3>
                    </div>
                    <div class="uk-card-body">

                    </div>
                </div>
            </div>
        </div>

        <div id="new-category-modal" uk-modal="center: true">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-outside" type="button" uk-close></button>
                <div class="uk-modal-header bg-ts">
                    <h2 class="uk-modal-title fg-white">Add Category</h2>
                </div>
                <div class="uk-modal-body">
                    <div class="uk-margin">
                        <label class="uk-form-label" for="category.name">Name of category:</label>
                        <div class="uk-form-controls">
                            <input id="category.name" v-model="category.name" name="categoryName"
                                   class="uk-input uk-form-width-expand" type="text"
                                   placeholder="Enter a suitable name to categorise permissions">
                        </div>
                    </div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary uk-modal-close" type="button" @click="saveCategory()">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script type="text/babel">

    export default{
        data(){
            return{
                permissions : [],
                category : {
                    id : null,
                    name : ''
                },
                categories : [],
                selectedCategory: null
            }
        },
        methods : {
            loadPermissions : function(){
                var vm = this;

                vm.$http.get('/api/security/permissions/', {
                    before: function(request){
                        vm.$set(vm.$root,'loadingData',true);

                        this.$root.notify("Contacting server for security permissions... Please wait.");
                    }
                }).then(
                        function(response){
                            //console.log(response.data);
                            vm.$set(vm,'permissions',response.data);
                            vm.$set(vm.$root,'loadingData',false);

                            this.$root.notify(vm.permissions.length + " permission(s) found.", 'success');
                        },
                        function(error){
                            console.log(error);

                            vm.$root.notify('Error loading permissions...', 'error');
                        }
                )
            },
            confirmDelete : function(delPermissionIndex){
                var vm = this;

                var delPermission = vm.permissions[delPermissionIndex];

                UIkit.modal.confirm('Are you sure you want to proceed?').then(function() {

                    vm.permissions.splice(delPermissionIndex, 1);

                    vm.$http.get('/api/security/permissions/' + delPermission.id + '/delete').then(
                            function(response){
                                vm.$root.notify(response.data.name + ' has been successfully deleted from the system.');
                            },
                            function(error){
                                console.log(error);
                            }
                    );

                }, function () {
                    //console.log('Rejected.')
                });

            },
            saveCategory : function () {
                var vm = this;

                vm.$http.post('/api/security/permissions/categories', this.category,{
                    before : function(){
                        vm.$root.notify('Creating branch: ' + vm.category.name);
                    }
                }).then(
                        function(response){
                            if(!vm.category.id){ // we are creating a new branch, so we push into the array
                                vm.categories.push(response.data);
                            }

                            vm.$root.notify('Saved! ' + vm.category.name, 'success');

                        },
                        function(error){

                        }
                );
            },
            loadCategories : function(){
                var vm = this;

                vm.$http.get('/api/security/permissions/categories/', {
                    before: function(request){
                        vm.$set(vm.$root,'loadingData',true);

                        this.$root.notify("Contacting server for security permission categories... Please wait.");
                    }
                }).then(
                        function(response){
                            //console.log(response.data);
                            vm.$set(vm,'categories',response.data);
                            vm.$set(vm.$root,'loadingData',false);

                            this.$root.notify(vm.categories.length + " category found.", 'success');
                        },
                        function(error){
                            console.log(error);

                            vm.$root.notify('Error loading categories...', 'error');
                        }
                )
            }
        },
        mounted : function(){
            this.$set(this.$root,'pageTitle','Security: Permissions');

            this.loadCategories();
        }
    }
</script>
