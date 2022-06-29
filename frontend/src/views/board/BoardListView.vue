<template>
  <v-container>
    <BoardListTable/>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BoardListTable from "@/components/board/BoardListTable.vue";

@Component({
  components: {
    BoardListTable,
  }
})
export default class BoardListView extends Vue{

}
</script>