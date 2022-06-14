<template>
  <div>
    {{timerStr}}
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class Timer extends Vue{
  timer = null;
  timeCounter = 300;
  timerStr = '05:00';

  mounted(){
    if(this.timer){
      this.timerStop(this.timer);
      this.timer = null;
    }
    this.timer = this.timerStart();
  }

  timerStart(){
    this.timeCounter = 300;
    let interval = setInterval(()=>{
      this.timeCounter--;
      this.timerStr = this.prettyTime();
      if(this.timeCounter <= 0) this.timerStop(interval);
    },1000);
    return interval;
  }

  timerStop(timer){
    clearInterval(timer);
    this.timeCounter = 0;
  }

  prettyTime(){
    let time = this.timeCounter / 60;
    let minutes = parseInt(time);
    let secondes = Math.round((time-minutes)*60);
    return `${minutes.toString().padStart(2,"0")} : ${secondes.toString().padStart(2,"0")}`;
  }
}
</script>