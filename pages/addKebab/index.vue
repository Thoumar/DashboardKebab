<template>
    <div class="container">
        <form>
            <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
                    v-model="email"
                    label="E-mail"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
                    v-model="contactName"
                    label="Contact name"
                    :error-messages="contactNameErrors"
                    @input="$v.contactName.$touch()"
                    @blur="$v.contactName.$touch()"
            ></v-text-field>
            <v-text-field
                    v-model="phone"
                    :error-messages="phoneErrors"
                    label="Phone number"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
            ></v-text-field>
            <v-select
                    v-model="selectClient"
                    :items="items"
                    item-text="name"
                    item-value="id"
                    :error-messages="selectClientErrors"
                    label="Client"
                    required
                    @change="$v.selectClient.$touch()"
                    @blur="$v.selectClient.$touch()"
            ></v-select>
            <v-select
                    v-model="selectStatus"
                    :items="status"
                    :error-messages="selectStatusErrors"
                    label="Status"
                    required
                    @change="$v.selectStatus.$touch()"
                    @blur="$v.selectStatus.$touch()"
            ></v-select>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
        </form>
        <notifications group="add" />
    </div>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, email, integer } from 'vuelidate/lib/validators'
    import db from '~/plugins/firebase'

    export default {
        mixins: [validationMixin],
        validations: {
            name: { required },
            email: { email, required },
            contactName: { required },
            phone: { integer },
            selectClient: { required },
            description: {},
            selectStatus: { required }
        },
        data: () => ({
            name: '',
            email: '',
            contactName: '',
            phone: '',
            description: '',
            selectClient: null,
            items: [],
            selectStatus: null,
            status: [
                'Beginning',
                'Waiting',
                'In progress',
                'Done'
            ]
        }),
        computed: {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            contactNameErrors () {
                const errors = []
                if (!this.$v.contactName.$dirty) return errors
                !this.$v.contactName.required && errors.push('Contact name is required')
                return errors
            },
            phoneErrors () {
                const errors = []
                if (!this.$v.phone.$dirty) return errors
                !this.$v.phone.integer && errors.push('Must be valid phone number')
                return errors
            },
            selectClientErrors (){
                const errors = []
                if (!this.$v.selectClient.$dirty) return errors
                !this.$v.selectClient.required && errors.push('Client is required')
                return errors
            },
            selectStatusErrors (){
                const errors = []
                if (!this.$v.selectStatus.$dirty) return errors
                !this.$v.selectStatus.required && errors.push('Status is required')
                return errors
            }
        },
        beforeMount(){
            this.selectClients()
        },
        methods: {
            selectClients(){
                let clients = db.ref('clients');
                let data = [];

                clients.on('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        let childData = {};
                        let childKey = childSnapshot.key;
                        let childName = childSnapshot.val().name;

                        childData.id = childKey;
                        childData.name = childName;

                        data.push(childData);

                    });
                });

                this.items = data;
            },
            addProjectToClient(projectId, clientId){
                let update = {};

                update['clients/' + clientId + '/projects/' + projectId] = clientId;

                db.ref().update(update);

            },
            submit () {
                let data = {};
                let projectId;

                //Format data
                data.name = this.name;
                data.email = this.email;
                data.contactName= this.contactName;
                data.phone = this.phone;
                data.clientId = this.selectClient;
                data.status = this.selectStatus;
                projectId = this.formatId(this.name);


                //Send db projects
                db.ref( 'projects/' + projectId ).set({
                    name: data.name,
                    email: data.email,
                    contactName:  data.contactName,
                    phone: data.phone,
                    clientId : data.clientId,
                    status: data.status
                });

                //Send db clients
                this.addProjectToClient(projectId, data.clientId);


                //Reset form
                this.$v.$touch()
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.contactName = ''
                this.phone = ''
                this.description = ''
                this.selectClient = ''
                this.selectStatus = ''

                //Notification send
                this.$notify({
                    group: 'add',
                    title: 'Project added with success',
                    type: 'success',
                    position: 'top right'
                });

            },
            formatId (str){
                str = str.toLowerCase();

                str = str.replace(/[àáâãäå]/,"a");
                str = str.replace(/[éèëê]/,"e");
                str = str.replace(/[iíìïî]/,"i");
                str = str.replace(/[óòõöô]/,"o");
                str = str.replace(/[úùüû]/,"u");
                str = str.replace(/[ç]/,"c");
                str = str.replace(/ /g, "-");
                str  = str.replace(/[^a-zA-Z0-9+\\-]/g, "");

                return str
            },
            clear () {
                this.$v.$touch()
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.contactName = ''
                this.phone = ''
                this.selectClient = ''
                this.selectStatus = ''
            },
        },
    }
</script>

<style lang="scss">
    form{
        width: 40%;
        min-width: 500px;
        margin: 50px auto;

        .input-description{
            .v-text-field__slot{
                height: 150px;
            }

        }
    }

</style>