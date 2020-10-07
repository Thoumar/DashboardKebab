<template>

    <div class="container">
        <v-layout row wrap justify-flex-start>
            <v-card
                    v-for="client in clients"
                    :key="client.clientId"
                    :to="'Clients/' + client.clientId"
                    link
            >
                <v-card-text>
                    <p class="display-1 text--primary">
                        {{ client.name }}
                    </p>
                    <div class="text--primary">
                        Contact : {{ client.contactName }}
                    </div>
                    <div class="text--primary">
                        Email : <a :href="'mailto:' + client.email">{{ client.email }}</a>
                    </div>
                    <div v-if="client.phone" class="text--primary">
                        Phone : {{ client.phone }}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-icon color="blue darken-2" @click="deleteClient(client.clientId)">mdi-delete</v-icon>
                </v-card-actions>
            </v-card>

        </v-layout>
    </div>

</template>

<script>
    import db from '~/plugins/firebase'
    import 'firebase/firestore';

    export default {
        data: () => ({
            clients: [],
        }),
        beforeMount(){
            this.getClients();
        },
        methods: {
            getClients(){
                let clients = db.ref('clients');
                let data = [];

                clients.on('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        let childData = childSnapshot.val();

                        let childKey = childSnapshot.key;
                        childData.clientId = childKey;

                        data.push(childData);

                    });
                });

                this.clients = data;
            },
            deleteClient(id){
                let client = db.ref('clients/' + id );
                client.remove();
                this.getClients();
            }
        }
    }
</script>

<style lang="scss">
    .v-card{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        min-width: 300px;
        max-width: 550px;
        margin-right: 50px;
        margin-bottom: 50px;
        text-decoration: none!important;

        &:hover{
            transform: scale(1.02);
            transition: transform 300ms ease-in-out;
        }

        .v-card__actions{
            justify-content: flex-end;
        }
    }
</style>

