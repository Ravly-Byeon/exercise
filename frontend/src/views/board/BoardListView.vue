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
    <BoardListTable
          :selectCategory="selectedCategory"
      />
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import BoardListTable from "@/components/board/BoardListTable.vue";

@Component({
  components: {
    BoardListTable,
  }
})
export default class BoardListView extends Vue{
  //@Prop() selectCategory!: string;
  selectedCategory = '';

  created(){
    this.selectedCategory = this.$store.state.board.selectedCategory;
  }

}
</script>