<template>
  <div class="btn-div">
    <v-btn
        class="mx-2 fixed"
        fab
        dark
        color="indigo"
        @click="move"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class AddBtn extends Vue{

  move(){
    const path = '/boardWrite'
    if (this.$route.path !== path) this.$router.push(path);
  }

}
</script>

<style scoped>
.btn-div{
  position: fixed;
  bottom: 50px;
  left: 50px;
  z-index: 999;
}
</style>