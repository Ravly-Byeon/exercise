<template>
  <v-container class="pa-16 mt-10">
    <v-row>
      <v-col
        cols="12"
        >
        <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
            dense
        ></v-text-field>
      </v-col>
    </v-row>
  <template>
    <div class="div-box">
      <v-row
          v-for="(e,i) in categories.length/3"
          :key="i"

      >
        <v-col class="col-Box" sm
                v-for="(ee,ii) in categories.length/4"
               :key="ii"
        >
          <div
           class="col-border"
          >
            {{categories[(i*3)+ee-1]}}
          </div>
        </v-col >
      </v-row>
    </div>
  </template>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class SearchView extends Vue{
  categories: any[] = [];
  created(){
    this.categorySet();
  }

  async categorySet(){
    this.categories = [];
    console.log('cate')
    const {data} = await this.axios.get('/category');
    console.log(data, data.length);
    data.forEach((e: any,i: number) =>{
      this.categories.push(e.name);
    });
    console.log(this.categories, this.categories.length);
  }

}
</script>

<style scoped>
div.div-box{
  padding: 50px;
  text-align: center;
}
div.col-border{
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgb(173, 139, 115);
  color: rgb(173, 139, 115);

}

</style>