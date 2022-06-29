<template>
  <div>
    <v-row
        v-for="(e,i) in categories.length/3"
        :key="i"
    >
      <v-col class="col-border" sm
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

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class SearchCategory extends Vue{

}
</script>