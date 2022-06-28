<template>
  <v-container>
    <v-row>
      <v-data-table>
        <template>
          <tr>
            <td>

            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class BoardListTable extends Vue{

  created(){
    this.getList();
  }

  async getList(){

  }

}
</script>