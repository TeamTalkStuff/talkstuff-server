<template>
    <div>
        <div class="uk-width-1-1" uk-grid>
            <div class="uk-width-1-3@m">
                <div class="uk-card uk-card-default uk-card-small">
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">Categories</h3>
                    </div>
                    <div class="uk-card-body">
                        <table class="uk-table uk-table-hover uk-table-divider" v-if="categories.length">
                            <tbody>
                            <tr v-for="category in categories"
                                :class="{'bg-ts fg-white' : selectedCategory && selectedCategory.id === category.id}"
                                @click="selectCategory(category)"
                            >
                                <td class="uk-position-relative" uk-toggle="target: > span.controls; mode: hover; cls: uk-hidden">
                                    {{ category.name }}
                                    <span class="controls uk-position-right bg-white uk-hidden
                                    uk-flex uk-flex-middle uk-flex-center" v-show="!category.reserved" uk-margin>
                                        <a href="javascript:void(0)"
                                           uk-toggle="target: #new-category-modal"
                                           @click.prevent="editCategory(category)"
                                           class="uk-icon-link uk-margin-small-right fg-cyan"
                                           uk-icon="icon: pencil"></a>

                                        <a href="javascript:void(0)"
                                           class="uk-icon-link fg-ts"
                                           @click.prevent="delCategory(category)"
                                           uk-icon="icon: trash"></a>
                                    </span>
                                </td>
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
                                @click="newCategory()"
                                uk-toggle="target: #new-category-modal">
                            <i class="fa fa-plus-circle"></i>
                            New Category
                        </button>
                    </div>
                </div>
            </div>
            <div class="uk-width-expand@m">
                <div class="uk-card uk-card-default" v-if="selectedCategory">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title">{{ selectedCategory.name }}: Permissions</h3>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <table class="uk-table uk-table-hover uk-table-divider uk-table-striped" v-if="permissions.length">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(permission, index) in permissions">
                                <td>{{ index + 1 }}</td>
                                <td>{{ permission.name }}</td>
                                <td class="uk-position-relative" uk-toggle="target: > span.controls; mode: hover; cls: uk-hidden">
                                    {{ permission.description }}
                                    <span class="controls uk-position-right bg-white uk-hidden uk-flex
                                    uk-flex-middle uk-flex-center" uk-margin>
                                        <a href="javascript:void(0)"
                                           uk-toggle="target: #new-category-permission-modal"
                                           @click.prevent="editPermission(permission)"
                                           class="uk-icon-link uk-margin-small-right fg-cyan"
                                           uk-icon="icon: pencil"></a>

                                        <a href="javascript:void(0)"
                                           class="uk-icon-link fg-ts"
                                           @click.prevent="delPermission(permission)"
                                           uk-icon="icon: trash"></a>
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div v-else class="uk-card uk-card-body uk-padding-large uk-flex uk-flex-center">
                            <h3 class="uk-h2 uk-text-center uk-text-muted" v-if="$root.loadingData">
                                <div uk-spinner></div>
                            </h3>
                            <h3 class="uk-h3 uk-text-center uk-text-muted" v-else>No records found...</h3>
                        </div>

                    </div>
                    <div class="uk-card-footer">
                        <button class="uk-button uk-button-primary"
                                @click="newPermission()"
                                uk-toggle="target: #new-category-permission-modal">
                            new permission
                        </button>
                    </div>
                </div>
                <div v-else class="uk-card uk-card-body uk-padding-large uk-flex uk-flex-center">
                    <h3 class="uk-h2 uk-text-center uk-text-muted" v-if="$root.loadingData">
                        <div uk-spinner></div>
                    </h3>
                    <h3 class="uk-h3 uk-text-center uk-text-muted" v-else>Please select a category</h3>
                </div>
            </div>
        </div>

        <div id="new-category-modal" uk-modal="center: true">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-outside" type="button" uk-close></button>
                <div class="uk-modal-header bg-ts">
                    <h2 class="uk-modal-title fg-white">
                        {{ category.id ? 'Edit' : 'New' }}
                    </h2>
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

        <div id="new-category-permission-modal" uk-modal="center: true">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-outside" type="button" uk-close></button>
                <div class="uk-modal-header bg-ts">
                    <h2 class="uk-modal-title fg-white">Add Permission: {{ selectedCategory ? selectedCategory.name : '' }}</h2>
                </div>
                <div class="uk-modal-body">
                    <div class="uk-margin">
                        <label class="uk-form-label" for="permission.name">Permission</label>
                        <div class="uk-form-controls">
                            <input id="permission.name" v-model="permission.name" name="permissionName"
                                   class="uk-input uk-form-width-expand" type="text"
                                   placeholder="Enter a suitable name of permission">
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="permission.description">Description:</label>
                        <div class="uk-form-controls">
                            <input id="permission.description" v-model="permission.description" name="permissionDescription"
                                   class="uk-input uk-form-width-expand" type="text"
                                   placeholder="Briefly describe this permission....">
                        </div>
                    </div>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary uk-modal-close" type="button"
                            @click="savePermission()">Submit</button>
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
                selectedCategory: null,
                permission : {
                    id : null,
                    category_id : null,
                    name: '',
                    description: ''
                }
            }
        },
        methods : {
            loadPermissions : function(category_id){
                var vm = this;

                vm.$http.get('/api/security/permissions/' + category_id + '/fetch-permissions', {
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
            delPermission : function (permission) {
                var vm = this;

                var index = this.permissions.findIndex(function (perm) {
                    return permission.id === perm.id;
                });

                UIkit.modal.confirm('Are you sure you want to proceed?').then(function() {

                    vm.permissions.splice(index, 1);

                    vm.$http.get('/api/security/permissions/' + permission.id + '/delete-permission').then(
                            function(response){
                                vm.$root.notify('Successfully deleted from the system.');
                            },
                            function(error){
                                console.log(error);
                            }
                    );

                }, function () {
                    //console.log('Rejected.')
                });
            },

            delCategory : function (category) {
                var vm = this;

                var index = this.categories.findIndex(function (cat) {
                    return category.id === cat.id;
                });

                UIkit.modal.confirm('Are you sure you want to proceed?').then(function() {

                    vm.categories.splice(index, 1);

                    vm.$http.get('/api/security/permissions/categories/delete/' + category.id).then(
                            function(response){
                                vm.$root.notify('Successfully deleted from the system.');
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
                        vm.$root.notify('Creating permission category: ' + vm.category.name);
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

            savePermission : function () {
                var vm = this;

                vm.$http.post('/api/security/permissions', this.permission,{
                    before : function(){
                        vm.$root.notify('Saving permission: ' + vm.permission.name);
                    }
                }).then(
                        function(response){
                            if(!vm.permission.id){ // we are creating a new branch, so we push into the array
                                vm.permissions.push(response.data);
                            }
                            vm.$root.notify('Permission saved!', 'success');
                        },
                        function(error){}
                );
            },

            editCategory: function(category){
                this.category = category;
            },
            newCategory: function(){
                this.category = {
                    id: null,
                    name: ''
                };
            },

            editPermission: function(permission){
                this.permission = permission;
                this.permission.category_id = this.selectedCategory.id;
            },
            newPermission: function(){
                this.permission = {
                    id: null,
                    category_id: this.selectedCategory.id,
                    name: ''
                };
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
            },

            selectCategory: function (category) {
                this.permission.category_id = category.id;
                this.selectedCategory = category;
                this.loadPermissions(category.id);
            }
        },
        mounted : function(){
            this.$set(this.$root,'pageTitle','Security: Permissions');

            this.loadCategories();
        }
    }
</script>
