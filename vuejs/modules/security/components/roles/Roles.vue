<template>
    <div>
        <div class="uk-width-1-1">
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <button class="uk-button">
                                New Role
                            </button>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <table class="uk-table" v-if="roles.length">
                        <caption>List of security roles</caption>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(role, index) in roles">
                            <td>{{index + 1}}</td>
                            <td>{{ role.name }}</td>
                            <td>{{ role.description }}</td>
                            <td>
                                <div v-if="!role.reserved" uk-margin>
                                    <router-link :to="{name : 'security.roles.edit', params : {roleId : role.id}}" class="uk-link" title="Edit"  uk-tooltip>
                                        <span class="fa fa-pencil"></span>
                                    </router-link>
                                    <a class="uk-link fg-crimson" uk-tooltip title="Delete" @click="confirmDelete(index)">
                                        <span class="fa fa-times"></span>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-else class="uk-card uk-card-body uk-padding-large uk-flex uk-flex-center">
                        <h3 class="uk-h2 uk-text-center uk-text-muted" v-if="$root.loadingData">
                            <div uk-spinner></div>
                        </h3>
                        <h3 class="uk-h3 uk-text-center uk-text-muted" v-else>No data returned!</h3>
                    </div>
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
                roles : []
            }
        },
        methods : {
            loadRoles : function(){
                var vm = this;

                vm.$http.get('/api/security/roles/', {
                    before: function(request){
                        vm.$set(vm.$root,'loadingData',true);

                        this.$root.notify("Contacting server for security roles... Please wait.");
                    }
                }).then(
                        function(response){
                            //console.log(response.data);
                            vm.$set(vm,'roles',response.data);
                            vm.$set(vm.$root,'loadingData',false);

                            this.$root.notify(vm.roles.length + " role(s) found.", 'success');
                        },
                        function(error){
                            console.log(error);

                            vm.$root.notify('Error loading roles...', 'error');
                        }
                )
            },
            confirmDelete : function(delRoleIndex){
                var vm = this;

                var delRole = vm.roles[delRoleIndex];

                UIkit.modal.confirm('Are you sure you want to proceed?').then(function() {

                    vm.roles.splice(delRoleIndex, 1);

                    vm.$http.get('/api/security/roles/' + delRole.id + '/delete').then(
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
        },
        mounted : function(){
            this.$set(this.$root,'pageTitle','Security: Roles');

            this.loadRoles();
        }
    }
</script>
