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
      <div class="d-flex align-center">
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
                LOG IN
              </v-btn>
            </template>
            <LoginForm
              :loginPopper="loginPopper"
            />
          </v-menu>
        </template>
        <v-btn
          elevation="2"
          @click="moveJoinUs"
        >JOIN US</v-btn>
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
  }
</script>