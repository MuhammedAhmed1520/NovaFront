<template>

<div class="login">
        <vue-particles
        color="#009688"
        :particleOpacity="0.7"
        :particlesNumber="150"
        shapeType="rectangle"
        :particleSize="7"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="6"
        :hoverEffect="true"
        hoverMode="repulse"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles> 
    <v-layout  wrap align-center justify-center row fill-height>
      <v-flex  xs12 sm6 md4 xl4>
            <v-card round pa-4>     
                  <v-container grid-list-md>
                    <v-layout justify-center>
                        <v-flex xs12 md7 lg5 xl3>
                              <v-img src="icon.png"  max-width="120px" max-height="120px"></v-img>
                        </v-flex>
                    </v-layout>
                    <v-layout justify-center>
                        <v-flex xs12 md10 lg8 xl6>
                             <v-card-title>
                                <span class="headline" style="color:rgb(169, 169, 169);"><strong style="color:#009688;">Nova</strong> AdminPanel</span>
                             </v-card-title>
                        </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-text>
                    <v-container grid-list-md>
                        <v-flex xs12>
                          <v-text-field label="Email" color="teal" text-color="white" append-icon="email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Password" color="teal" text-color="white" append-icon="vpn_key" type="password" required></v-text-field>
                        </v-flex>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                  <v-container grid-list-md>
                    <v-layout justify-end>
                        <v-flex xs12 md3>
                           <v-btn round color="teal" large dark @click="login">Login</v-btn>
                        </v-flex>
                    </v-layout>

                  </v-container>
                   </v-card-actions>
            </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
      data(){
        return{
          email:'',
          password:'',
        }
      },
      methods:{
        login() {
            // alert("ADsgf d g")
            this.$ls.set('data','login');
            this.$emit('logined','helllo');          
            if(this.email == 'admin@admin.com' && this.password == '15201520'){
                // this.emit('logined');                
            }
        }
      }
  }
</script>
<style scoped>
#particles-js {
    position: absolute;
    background: #009688;
    left: 0; 
    right: 0;
    top: -80px;
    bottom: 0;
    z-index: -1;
}
.login{
    position:absolute;
    width: 100%;
    height: 100%;
    z-index: -1000
}
  .v-card{
    padding: 50px 50px;
    border-radius: 10px;
    box-shadow: 0 0 20px -2px #333;
  }
</style>
