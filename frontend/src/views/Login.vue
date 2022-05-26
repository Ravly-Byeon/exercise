<template>
  <div class="container">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {  },
})
export default class LoginForm extends Vue {
  valid= true;
  form= {
    id: '',
    pw: '',
  };
  idRules= [
    (v:any) => !!v || '아이디를 입력하세요.',
    // form: (v) => /.+@.+\..+/.test(v) || '유효하지 않은 아이디 입니다.',
  ];
  pwRules= [
    (v:any) => !!v || '비밀번호를 입력하세요.',
  ];

  async login () {
    // this.$refs.form.validate()
    const loginData = JSON.stringify(this.form);
    const{ data } = await this.axios.post('/users/login',loginData);
    // const{ data } = await this.axios.post('/users/login',{
    //   data: this.form
    // });
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
