<template>
  <v-container>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="Password"
          rules="required|max:30"
      >
        <v-text-field
          v-model="password"
          type="password"
          :error-messages="errors"
          :rules="pwRule"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
          v-slot="{ errors }"
          name="Password Again"
          rules="required|max:30"
      >
        <v-text-field
          v-model="passwordAg"
          type="password"
          :error-messages="errors"
          :rules="pwAgRule"
          label="Password Again"
          @keyup="passwordAgain"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          :readonly="emailSend"
          @keyup="emailKeyup"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn
        elevation="2"
        :disabled="emailValid"
        @click="emailSubmit"
      >이메일 인증</v-btn>
      <div v-if="emailSend">
        <v-text-field
            v-model="emailVal"
            label="E-mail 인증번호"
            required
          >
        </v-text-field>
        <v-btn
          elevation="2"
          @click="emailValidation"
        >인증하기</v-btn>
      <Timer
          v-if="emailSend"
          :key="emailValid"
      />
      </div>
      <div v-if="emailCert">
        인증완료
      </div>
      <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Region"
          data-vv-name="select"
          required
        ></v-select>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
   </validation-observer>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { ValidationObserver, ValidationProvider, } from 'vee-validate';
import Timer from "@/components/Timer.vue";
@Component({
  components: { ValidationObserver, ValidationProvider, Timer }
})
export default class JoinUs extends Vue{
  invalid = true;
  errors = ' error ';
  name = '';
  password = '';
  pwRule = [
    (v: string) => {
      const replaceV = v.replace(/(\s*)/g, '')
      return replaceV.length >= 8 || '8자리 이상 입력해주세요.'
    }
  ];
  passwordAg = '';
  pwAgRule=[
    (v: string) => {
      return this.passwordAgain() || '비밀번호를 확인해주세요.'
    }
  ]
  email = '';
  emailSend = false; //인증 메일 전송 여부
  emailToken = '';
  emailStr = '';
  emailVal = '';
  emailCert = false; //이메일 인증 여부
  select = null;
  items= [
      '서울',
      '경기도',
      '인천',
      '충청도',
      '강원도',
      '전라도',
      '경상도',
      '제주도'
  ];
  checkbox = null;

  async submit (){
    if(!this.passwordAgain){
      alert('패스워드를 확인해주세요.');
    }else if(!this.emailCert){
      alert('이메일 인증을 해주세요.');
    }else{
      const user = {
        nickname: this.name,
        email: this.email,
        password: this.password,
        region: this.select
      }
      console.log(user);
      const {data} = await this.axios.post('/users/signup',user);
      console.log(data);
      if(data){
        const path = '/'
        if (this.$route.path !== path) this.$router.push(path);
      }
    }
  }

  clear(){
    this.name = '';
    this.password = '';
    this.passwordAg = '';
    this.email = '';
    console.log('clear');
  }

  async emailSubmit(){
    console.log('emailSubmit');
    const mailData = {
      password: this.password,
      email: this.email,
    }
    const { data } = await this.axios.post('/users/emailSubmit', {...mailData});
    console.log(data);
    if(data){
      if(data === 'N'){
        alert('이미 회원으로 등록된 이메일입니다.');
      }else{
        this.emailSend = true;
        this.emailToken = data.access_token;
        this.emailStr = data.rStr;
      }
    }else{
      alert('인증 이메일 전송 도중 오류가 발생하였습니다.')
    }
  }

  passwordAgain(){
    if(this.password === this.passwordAg){
      return true;
    }else{
      false;
    }
  }

  get emailValid(){
    if(this.passwordAgain() && this.email){
      const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return !(re.test(this.email));
    }else{
      return true;
    }
  }

  async emailValidation(){
    this.emailCert = false;
    console.log('hi');
    if(this.emailVal===this.emailStr){
      const data ={
        token: this.emailToken,
        email: this.email,
        password: this.password,
      }
      const result = await this.axios.post('/users/emailCert',{...data});
      if(result.data){
        console.log('인증완료');
        this.emailCert = true;
        this.emailSend = false;
      }else{
        this.emailSend = false;
        alert('이메일 인증에 실패하였습니다.');
      }
    }else{
      alert('인증 문자를 확인해주세요.')
    }
  }

  emailKeyup(){
    this.emailCert = false;
  }



}

</script>



