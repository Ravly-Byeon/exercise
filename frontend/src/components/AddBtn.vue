<template>
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