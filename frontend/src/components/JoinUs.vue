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
        rules="required|max:10"
      >
        <v-text-field
          v-model="password"
          :error-messages="errors"
          label="Password"
          required
        ></v-text-field>
      </validation-provider>
      <!-- <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 7,
          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
        }"
      >
        <v-text-field
          v-model="phoneNumber"
          :error-messages="errors"
          label="Phone Number"
          required
        ></v-text-field>
      </validation-provider> -->
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
        <v-btn
          elevation="2"
          :disabled="emailValid"
          @click="emailSubmit"
        >이메일 인증</v-btn>
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
      <!-- <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider> -->

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

@Component({
  components: { ValidationObserver, ValidationProvider }
})
export default class JoinUs extends Vue{
  invalid = false;
  errors = ' error ';
  name = '';
  password = '';
  email = '';
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

  submit (){
    console.log('submit')
  }
  clear(){
    this.name = ''
    this.password = ''
    this.email = ''
    this.select = null
    this.checkbox = null
    console.log('clear');
  }

  async emailSubmit(){
    console.log('emailSubmit');
    const mailData = {
      name: this.name,
      password: this.password,
      email: this.email,
    }
    const { data } = await this.axios.post('/users/emailSubmit', {...mailData});
    console.log(data);

  }

  get emailValid(){
    if(this.email){
      const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return !(re.test(this.email));
    }else{
      return true;
    }
  }


}

</script>



