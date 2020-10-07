<template>
    <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :right="right"
            absolute
            dark
            class="navigation"
    >
        <v-list
                dense
                nav
                class="py-0"
        >
            <v-list-item two-line :class="miniVariant && 'px-0'">
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Lindner</v-list-item-title>
                    <v-list-item-subtitle>Jean-baptiste</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.link"
                    link
                    class="item-link"
            >

                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {
                drawer: true,
                items: [
                    { title: 'Kebabs', icon: 'mdi-tag', link: "/Kebabs" },
                    { title: 'Add kebab', icon: 'mdi-tag-plus', link: "/addKebab" }],
                color: 'primary',
                right: false,
                miniVariant: true,
                expandOnHover: true
            };
        }
    }
</script>

<style lang="scss">
    .navigation{
        background-color: #323a6c!important;
        height: 100%;
        top: 0;
        left: 0;
        .item-link{
            text-decoration: none;
        }
        .v-list-item__content{
            margin-left: 15px;
        }
    }

</style>