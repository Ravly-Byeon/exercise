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
            @click="clickCategory(categories[(i*3)+ee-1]._id)"
        >
          {{categories[(i*3)+ee-1].name}}
        </div>
      </v-col >
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";

@Component({})
export default class SearchCategory extends Vue{
  @Prop() categories!: any[];

  clickCategory(id:string){
    this.$emit('click-category',id);

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