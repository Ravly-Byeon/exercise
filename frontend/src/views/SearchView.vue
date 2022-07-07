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
  <SearchCategory
    :categories="categories"
    @click-category="clickCategory"
    v-if="selectCategory===''"
    :key="selectCategory"
    />
    <!--<BoardListView
      v-if="selectCategory!==''"
      :key="selectCategory"
      :selectCategory="selectCategory"
      /> -->
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SearchCategory from "@/components/SearchCategory.vue";
import BoardListView from "@/views/board/BoardListView.vue";

@Component({
  components: {
    SearchCategory,
    BoardListView,
  }
})
export default class SearchView extends Vue{
  categories: any[] = [];
  selectCategory = '';
  created(){
    this.categorySet();
  }

  async categorySet(){
    this.categories = [];
    const {data} = await this.axios.get('/category');
    console.log(data, data.length);
    data.forEach((e: any,i: number) =>{
      this.categories.push(e);
    });
  }

  clickCategory(id:string){
    this.selectCategory = id;
  }

}
</script>

