<template>
  <v-container>
    <MyPagePw
      v-if="!pwChk"
      :pwChk="pwChk"
      @myInfo="myInfo"
      @pwCheck="pwCheck"
    />
    <MyPageEdit
      v-if="pwChk"
      :myInformation="myInformation"
    />
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MyPagePw from "@/components/mypage/MyPagePw.vue";
import MyPageEdit from "@/components/mypage/MyPageEdit.vue";

@Component({
  components: { MyPagePw, MyPageEdit,
  }
})
export default class MyPageInfo extends Vue{
  valid = false;
  pwChk = false;
  password = '';
  pwRules=[
    (v:any) => !!v || 'Password is required',
    (v:any) => v.length <= 30 || 'Password must be less than 30 characters',
  ];
  myInformation = null;

  pwOk(){
    if(this.$store.state.login.password === this.password){
      this.pwChk = true;
    }else{
      alert('비밀번호를 확인해주세요.');
    }
  }

  pwCheck(data:boolean){
    this.pwChk = data;
  }

  myInfo(data: any){
    this.myInformation= data;
  }



}
</script>