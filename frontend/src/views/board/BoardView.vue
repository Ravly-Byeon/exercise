<template>
  <v-container>
    <BoardCarousel/>
    <BoardContent/>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BoardCarousel from "@/components/board/BoardCarousel.vue";
import BoardContent from "@/components/board/BoardContent.vue";

@Component({
  components: {
    BoardCarousel,
    BoardContent,
  }
})
export default class BoardView extends Vue{

}
</script>