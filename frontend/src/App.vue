<template>
  <v-app>
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
                elevation="2"
              >LOG IN</v-btn>

            </template>

            <v-card v-if="loginPopper">
              <v-card-text>
                <v-text-field
                  v-model="loginEmail"
                  :rules="emailRules"
                  :maxlength="30"
                  :counter="30"
                  @keydown.enter="login"
                  clearable
                  label="Email"
                  :autofocus="true"
                  dense
                ></v-text-field>
              </v-card-text>
              <v-card-text>
                <v-text-field
                    v-model="loginPw"
                    :rules="passwordRules"
                    type="password"
                    :maxlength="20"
                    :counter="20"
                    @keydown.enter="login"
                    clearable
                    label="Password"
                    dense
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="loginPopper = false" depressed>Cancel</v-btn>
                <v-btn
                  color="success"
                  :disabled="!loginValidation()"
                  depressed
                  @click="login"
                >
                  LOG IN
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </template>
        <v-btn
          elevation="2"
        >JOIN US</v-btn>
      </div>

  </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: { Navbar,}
})
export default class App extends Vue {
  private loginPopper = false;
  private loginEmail = '';
  private loginPw = '';
  private emailRules = [
    (v: string) => !!v && !!v.trim() || '이메일을 입력해주세요'
  ];
  private passwordRules = [
    (v: string) => !!v && !!v.trim() || '패스워드를 입력해주세요'
  ];

  loginValidation() {
    for(const rule of this.emailRules) {
      const valid = rule(this.loginEmail);
      if (typeof valid === 'string') {
        return false;
      }
    }
    for(const rule of this.passwordRules) {
      const valid = rule(this.loginPw);
      if (typeof valid === 'string') {
        return false;
      }
    }
    return true;
  }
  login(){
    console.log('login', this.loginEmail, this.loginPw);
  }

}
</script>
