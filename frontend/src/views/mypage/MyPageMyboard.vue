<template>
  <div>
    mypagemyboard
     <slick
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        @breakpoint="handleBreakpoint"
        @destroy="handleDestroy"
        @edge="handleEdge"
        @init="handleInit"
        @reInit="handleReInit"
        @setPosition="handleSetPosition"
        @swipe="handleSwipe"
        @lazyLoaded="handleLazyLoaded"
        @lazyLoadError="handleLazyLoadError"
     >
      <a href="http://placehold.it/200x100"><img src="http://placehold.it/200x100" alt=""></a>
      <a href="http://placehold.it/200x100"><img src="http://placehold.it/200x100" alt=""></a>
      <a href="http://placehold.it/200x100"><img src="http://placehold.it/200x100" alt=""></a>
      <a href="http://placehold.it/200x100"><img src="http://placehold.it/200x100" alt=""></a>
      <a href="http://placehold.it/200x100"><img src="http://placehold.it/200x100" alt=""></a>
    </slick>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Slick from "vue-slick";
import 'slick-carousel/slick/slick.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

@Component({
  components: { Slick,}
})
export default class MyPageMyboard extends Vue{
  $refs!: {
    slick: Slick
  }

  slickOptions={
    slidesToShow: 3,
    dots: true,
  }

  next(){
    this.$refs.slick.next();
  }

  prev(){
    this.$refs.slick.prev();
  }

  reInit(){
    this.$nextTick(()=>{
      this.$refs.slick.reSlick();
    });
  }

  handleAfterChange(event:any, slick:Slick, currentSlide:any) {
    console.log('handleAfterChange', event, slick, currentSlide);
  }
  handleBeforeChange(event:any, slick:Slick, currentSlide:any, nextSlide:any) {
    console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
  }
  handleBreakpoint(event:any, slick:Slick, breakpoint:any) {
    console.log('handleBreakpoint', event, slick, breakpoint);
  }
  handleDestroy(event:any, slick:Slick) {
    console.log('handleDestroy', event, slick);
  }
  handleEdge(event:any, slick:Slick, direction:any) {
    console.log('handleEdge', event, slick, direction);
  }
  handleInit(event:any, slick:Slick) {
    console.log('handleInit', event, slick);
  }
  handleReInit(event:any, slick:Slick) {
    console.log('handleReInit', event, slick);
  }
  handleSetPosition(event:any, slick:Slick) {
    console.log('handleSetPosition', event, slick);
  }
  handleSwipe(event:any, slick:Slick, direction:any) {
    console.log('handleSwipe', event, slick, direction);
  }
  handleLazyLoaded(event:any, slick:Slick, image:any, imageSource:any) {
    console.log('handleLazyLoaded', event, slick, image, imageSource);
  }
  handleLazyLoadError(event:any, slick:Slick, image:any, imageSource:any) {
    console.log('handleLazeLoadError', event, slick, image, imageSource);
  }


}
</script>

<style scoped>

</style>

<style>
</style>