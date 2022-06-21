<template>
  <v-app>
    <Navbar/>

    <v-main>
      <router-view/>
    </v-main>
    <AddBtn/>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import AddBtn from "@/components/AddBtn.vue";

@Component({
  components: { Navbar, AddBtn }
})
export default class App extends Vue {

}
</script>
