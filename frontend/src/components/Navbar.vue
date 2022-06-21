<template>
    <v-app-bar
      app
      color="#AD8B73"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>SECOND HANDED</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>mdi-chat-processing-outline</v-icon>
      </v-btn>
      <div class="d-flex align-center" v-if="!$store.state.login.isLogin">
        <template>
          <v-menu
            v-model="loginPopper"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template
              v-slot:activator="{ on }"
            >
              <v-btn
                v-on="on"
              >
                LOG IN {{$store.state.login.isLogin}}
              </v-btn>
            </template>
            <LoginForm
              :loginPopper="loginPopper"
              @loginPop="loginPop"
            />
          </v-menu>
        </template>
        <v-btn
          elevation="2"
          @click="moveJoinUs"
        >JOIN US
        </v-btn>
      </div>
      <div class="d-flex align-center" v-if="$store.state.login.isLogin">
        <v-btn
          elevation="2"
          @click="logout"
        >
          LOG OUT {{$store.state.login.isLogin}}
        </v-btn>
        <template>
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                >
                  MY PAGE
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  to="/info"
                >
                  <v-list-item-title class="menu-txt">내 정보 수정</v-list-item-title>
                </v-list-item>

                <v-list-item
                  to="/wishlist"
                >
                  <v-list-item-title class="menu-txt">위시리스트</v-list-item-title>
                </v-list-item>

                 <v-list-item
                  to="/myboard"
                >
                  <v-list-item-title class="menu-txt">나의 게시글</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </div>

  </v-app-bar>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import LoginForm from "@/views/Login.vue";

  @Component({
    components: {LoginForm},
  })
  export default class Navbar extends Vue{
    private loginPopper = false;

    moveJoinUs(){
      const path = '/joinUs'
      if (this.$route.path !== path) this.$router.push(path);
    }

    loginPop(data:boolean){
      console.log(data);
      this.loginPopper = data;
    }

    logout(){
      console.log('hhi');
      this.$store.dispatch('login/logout');
    }
  }
</script>