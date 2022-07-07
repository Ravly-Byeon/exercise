<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
      >
        <v-data-table
          :items="boardList"
          class="data-table fill-height"
          disable-pagination
          disable-sort
          hide-default-header
          hide-default-footer
          dense
        >
          <template #item="{item}">
            <tr class="tr-list">
              <td>
                <div class="div-float">
                  <div class="div-thumnail">hi</div>
                </div>
                <div class="div-float">
                  <div
                      @click="contentView(item._id)"
                  >{{item.title}}</div>
                  <div>{{item.price}}</div>
                  <div>{{item.createAt}}</div>
                  <div></div>
                </div>
                <div class="div-float">
                  <div>좋아요</div>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {BOARD} from "@/interface/board";
import IBoard = BOARD.IBoard;

@Component({})
export default class BoardListTable extends Vue{
  @Prop() selectCategory!: string;
  boardList: IBoard[] = [];

  created(){
    this.getList();
  }

  async getList(){
    console.log(this.selectCategory,'))');
    const {data} = await this.axios.get(`/boards/${this.selectCategory}`);
    console.log(data);
    this.boardList = data;
    console.log(this.boardList);
  }

  contentView(id: string){
    console.log(id);
  }

}
</script>

<style scoped>
tr.tr-list{
  padding: 10%;
}
div.div-float{
  height: 100%;
  border: 1px solid black;
  float: left;
}

div.div-thumnail{
  width: 20%;
}
</style>