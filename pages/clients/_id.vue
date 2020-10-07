<template>
    <div class="container">
        <h1 class="display-3">
            {{ name }}
        </h1>
        <div class="container-content">
            <div class="row-content title">
                Contact : {{ contactName }}
            </div>
            <div class="row-content title">
                Email : <a :href="'mailto:' + email">{{ email }}</a>
            </div>
            <div v-if="phone" class="row-content phone">
                Phone : {{ phone }}
            </div>
            <div v-if="projects" class="title">
                Projects :

                <ul>
                    <li v-for="(project, index) in projects">
                        {{ index }}
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import db from '~/plugins/firebase'

    export default {
        data: () => ({
            name: '',
            email: '',
            contactName: '',
            phone: '',
            projects: [ ]
        }),
        beforeMount(){
            this.getClient();
        },
        methods: {
            getClient(){
                let client = db.ref('clients/' + this.$route.params.id);
                let data = [];

                client.on('value', function(snapshot) {
                    let childData = snapshot.val();
                    data.name = childData.name;
                    data.email = childData.email;
                    data.contactName = childData.contactName;
                    data.phone = childData.phone;
                    data.projects = childData.projects;
                });
                this.name = data.name;
                this.email = data.email;
                this.contactName = data.contactName;
                this.phone = data.phone;
                this.projects = data.projects;
            }
        }
    }
</script>

<style lang="scss">

    .container-content{
        margin-top: 30px;
        padding-left: 20px;
        .row-content{
            margin-bottom: 20px;
        }
    }
</style>