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
            @keyup="passwordAg=''"
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
          :disabled="invalid"
          @click="edit"
        >
          edit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
   </validation-observer>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import { ValidationObserver, ValidationProvider, } from 'vee-validate';
import Timer from "@/components/Timer.vue";
@Component({
  components: { ValidationObserver, ValidationProvider, Timer }
})
export default class JoinUs extends Vue{
  @Prop() myInformation!: any;
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

  created(){
    this.formInput();
  }

  formInput(){
    console.log(this.myInformation, 'name');
    this.name =this.myInformation.nickname;
    this.password = this.myInformation.password;
    this.passwordAg = this.myInformation.password;
    this.select = this.myInformation.region;
  }

  async edit(){
    if(!this.passwordAgain()){
      alert('패스워드를 확인해주세요.');
    }else{
      const user = {
        nickname: this.name,
        email: this.myInformation.email,
        password: this.password,
        region: this.select
      }
      console.log(user);
      const {data} = await this.axios.patch(`/users/${this.myInformation.email}`,user);
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
    console.log('clear');
  }

  passwordAgain(){
    if(this.password === this.passwordAg){
      return true;
    }else{
      false;
    }
  }



}
</script>