<template>
    <nav>
        <v-toolbar app clipped-left
 class="grey lighten-5">
            <v-toolbar-side-icon @click="drawer = !drawer" class="teal--text"></v-toolbar-side-icon>
            <v-toolbar-title class="text--uppercase grey--text">
                <span class="teal--text">Nova</span>
                <span class="font-weight-light">Admin</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn flat color="white">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn> -->
            <v-menu
            bottom
            origin="center center"
            transition="scale-transition"
            >
            <v-btn
                slot="activator"
                flat
                class="teal--text"
            >
                <v-icon left>
                    arrow_drop_down
                </v-icon>
                MuhammedHammad
            </v-btn>

            <v-list>
                <v-list-tile @click="">
                    <v-list-tile-title>Setting</v-list-tile-title>
                    <v-icon right>
                        settings
                    </v-icon>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-title>Sign Out</v-list-tile-title>
                    <v-icon right>
                        exit_to_app
                    </v-icon>
                </v-list-tile>
            </v-list>
            </v-menu>


        </v-toolbar>
        <v-navigation-drawer  app v-model="drawer" width="250" clipped class="teal">
                <v-toolbar flat class="teal">
                    <v-layout align-center>
                        <v-list>
                            <v-list-tile>
                                    <v-list-tile-title class="title white--text">
                                        <span>Nova</span>
                                        <span class="font-weight-light">Navigation</span> 
                                    </v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-layout>
                </v-toolbar>
                <v-divider></v-divider>
            <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-tile-action>
                            <v-icon class="white--text">
                                {{link.icon}}
                            </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="white--text">
                                {{link.text}}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data(){
        return{
            drawer:false,
            links:[
                {icon:'dashboard',text:'Dashboard',route:'/dashboard'},
                {icon:'account_balance_wallet',text:'Account Types',route:'/account-types'},
                {icon:'account_balance_wallet',text:'Accounts',route:'/accounts'},
                {icon:'attach_money',text:'Money',route:'/money'},
                {icon:'transform',text:'Money Transfers',route:'/money-transfers'},
                {icon:'person',text:'Cleints',route:'/clients'},
                {icon:'account_balance_wallet',text:'Project Types',route:'/project-types'},
                {icon:'account_balance_wallet',text:'Projects',route:'/projects'},
                {icon:'account_balance_wallet',text:'Finished Projects',route:'/finished-projects'},
                {icon:'account_balance_wallet',text:'Employee Commission',route:'/assign-employee-project'},
                {icon:'person',text:'Employees',route:'/employees'},
                {icon:'payment',text:'Payments',route:'/payments'},
                {icon:'payment',text:'Discounts',route:'/discounts'},
                {icon:'attach_money',text:'Currency',route:'/currency'},
            ]
        }
    }
}
</script>