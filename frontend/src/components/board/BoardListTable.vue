<template>
  <v-container>
    <v-row>
      <v-data-table>
        <template>
          <tr>
            <td>
              <div>
                <img/>
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div></div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {BOARD} from "@/interface/board";
import IBoard = BOARD.IBoard;

@Component({})
export default class BoardListTable extends Vue{
  boardList: IBoard[] = [];

  created(){
    this.getList();
  }

  async getList(){
    const {data} = await this.axios.get('/boards');
    console.log(data);
    this.boardList = data;
    console.log(this.boardList);
  }

}
</script>