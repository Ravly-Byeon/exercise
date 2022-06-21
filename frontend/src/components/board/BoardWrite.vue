<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"

      >
        <h5>카테고리</h5>
      </v-col>
      <v-col
        cols="9"
      >
        <v-select
            :items="items"
            label="Standard"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class BoardWrite extends Vue{
  created(){
    this.setCategory();
  }

  async setCategory(){
    const { data } = await this.axios.get('/board/category');
  }

}
</script>