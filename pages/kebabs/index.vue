<template>
    <div class="container">
        <v-layout row wrap justify-flex-start>
            <v-card
                    v-for="kebab in kebabs"
                    :key="kebab.kebabId"
                    :class="kebab.status"
            >
                <v-card-text>
                    <p class="display-1 text--primary">
                        {{ kebab.name }}
                    </p>
                    <div class="text--primary">
                        Nbre de vote : {{ kebab.vote }}
                    </div>
                </v-card-text>
                <v-card-actions class="d-flex justify-space-between">
                    <v-icon color="blue darken-2" @click="vote(kebab.projectId)">mdi-thumb-up</v-icon>
                    <v-icon color="red darken-2" @click="vote(kebab.projectId)">mdi-thumb-down</v-icon>
                </v-card-actions>
            </v-card>

        </v-layout>
    </div>

</template>

<script>
    import db from '~/plugins/firebase'

    export default {
        data: () => ({
            kebabs: [
                { id: 1, name: 'Délice kebab', vote: 15 },
                { id: 2, name: 'Kebab frais', vote: 2 },
                { id: 3, name: 'Kebab IIM', vote: 0 },
                { id: 4, name: 'Kebab IenMangé', vote: 9 },
                { id: 5, name: 'Thoumar Kebab', vote: 999 },
            ],
        }),
        beforeMount(){
            // this.getProjects();
        },
        methods: {
            getProjects(){
                // let kebabs = db.ref('kebabs');
                // let data = [];
                //
                // kebabs.on('value', function(snapshot) {
                //     snapshot.forEach(function(childSnapshot) {
                //         let childData = childSnapshot.val();
                //         childData.status = childData.status.toLowerCase();
                //         childData.status = childData.status.replace(/ /g, "-");
                //
                //         let childKey = childSnapshot.key;
                //         childData.projectId = childKey;
                //
                //         data.push(childData);
                //
                //     });
                // });
                //
                // this.kebabs = data;

            },
            vote(id){
                // let project = db.ref('kebabs/' + id );

            }
        }
    }
</script>

<style lang="scss">
    .v-card{
        padding: 20px;
        width: 350px;
        margin-right: 50px;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-decoration: none!important;

        &:hover{
            transform: scale(1.02);
            transition: transform 300ms ease-in-out;
        }

        &.beginning, &.waiting, &.in-progress, &.done{
            border-bottom-width: 2px;
            border-bottom-style: solid;
        }
        &.beginning{
            border-bottom-color: #607D8B;
        }
        &.waiting{
            border-bottom-color: #FF9800;
        }
        &.in-progress{
            border-bottom-color: #FFEB3B;
        }
        &.done{
            border-bottom-color: #4CAF50;
        }
        .v-card__text{
            text-align: left
        }
        .v-card__actions{
            justify-content: flex-end;
        }

    }
</style>

