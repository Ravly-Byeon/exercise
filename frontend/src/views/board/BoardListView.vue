<template>
  <v-container>
    <BoardListTable
        :selectCategory="selectCategory"
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
  @Prop() selectCategory!: string;

}
</script>