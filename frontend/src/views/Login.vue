<template>
  <!-- <div class="container">
    <div class="login-box">
      <div class="login-title">PMI</div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="form.id"
          :rules="idRules"
          label="ID"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.pw"
          :rules="pwRules"
          label="비밀번호"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          width="100%"
          @click="login"
        >
          로그인
        </v-btn>
      </v-form>
    </div>
  </div> -->

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
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';


@Component({
  components: {  },
})
export default class LoginForm extends Vue {
  @Prop() loginPopper!: boolean;

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
  async login(){
    console.log('login', this.loginEmail, this.loginPw);
    const { data } = await this.axios.post('users/login', {
      email: this.loginEmail,
      password: this.loginPw,
    });
    console.log(data,'--');
  }

}
</script>

<style>
.login-box{
  margin: 70px auto;
  width: 36%;
  min-width: 350px;
  border: 3px solid #e4e4e4;
  border-radius: 8px;
  padding: 50px;
}
.login-title{
  margin: 0 auto;
  width: fit-content;
  font-size: 32px;
  color: rgba(0,0,0,0.65);
}
</style>
