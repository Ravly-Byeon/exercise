<template>
    <v-container align-items: center>
      <v-form v-model="valid" v-if="!pwChk">
        <v-container>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  type="password"
                  v-model="password"
                  :rules="pwRules"
                  :counter="30"
                  label="Password"
                  required
                  @keydown.enter="pwOk"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-btn
            @click="pwOk"
            elevation="2"
        >OK</v-btn>
      </v-form>
    </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class MyPagePw extends Vue{
  valid = false;
  @Prop() pwChk!: boolean;
  password = '';
  pwRules=[
    (v:any) => !!v || 'Password is required',
    (v:any) => v.length <= 30 || 'Password must be less than 30 characters',
  ];

  async pwOk(){
    const { data } = await this.axios.post('users/login', {
      email: this.$store.state.login.userEmail,
      password: this.password,
    });
    console.log(data,'--');
    if(data === 'N'){
      alert('비밀번호를 확인해주세요.')
    }else{
      data._doc.password = data.password;
      this.$emit('myInfo',data._doc);
      this.$emit('pwCheck', true);
    }
  }



}
</script>