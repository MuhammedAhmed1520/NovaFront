<template>

  <v-app v-if="login">
    <Navbar/>
        <v-content class="mx-4 my-4">
          <router-view></router-view>
        </v-content>
    <Footer></Footer>
  </v-app>
    <router-view v-else>
        <Login/>
    </router-view>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Login from '@/views/Login'

export default {
  name: 'App',
  components: {
    Navbar,Footer,Login
  },
  data () {
    return {
      //
      login:true,
    }
  },
    created() {
        this.$on('logined', () => {
            this.login=true;
        })
    },
  methods:{
    accessLogin(){
      this.login=true;
    }
  }
}
</script>
