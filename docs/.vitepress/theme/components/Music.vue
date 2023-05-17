<template>
    <div class="page-promotion flex-col">
      <div class="con-play flex" @click="audioPlayOrPause()">
        <img v-show="playFlag" class="audio-on" src="../../dist/resume/svg/暂停.svg" alt="">
        <img v-show="!playFlag" class="audio-off" src="../../dist/resume/svg/music.svg" alt="">
      </div>
      
      <audio ref="audio" src="我的名字.mp3" autoplay loop preload="auto" crossOrigin="anonymous"> </audio>
    </div>
  </template>
  
  <script>
    export default {
      name: 'Promotion',
      data () {
        return {
          playFlag: true,
          clickMusicBtn: false,
        }
      },
      
      async mounted () {
        this.audioAutoPlay()
        document.addEventListener("visibilitychange", (e) => { // 兼容ios微信手Q
          if (this.clickMusicBtn) { // 点击了关闭音乐按钮
            if (this.playFlag) {
              this.audioAutoPlay();
              this.playFlag = true;
            } else {
              this.audioPause();
              this.playFlag = false;
            }
        
            text.innerHTML = e.hidden;
            if (e.hidden) {  // 网页被挂起
              this.audioAutoPlay();
              this.playFlag = true;
            } else { // 网页被呼起
              this.audioPause();
              this.playFlag = false;
            }
          } else { // 未点击关闭音乐按钮
            if (this.playFlag) {
              this.audioPause();
              this.playFlag = false;
            } else {
              this.audioAutoPlay();
              this.playFlag = true;
            }
        
            text.innerHTML = e.hidden;
            if (e.hidden) {  // 网页被挂起
              this.audioPause();
              this.playFlag = false;
            } else { // 网页被呼起
              this.audioAutoPlay();
              this.playFlag = true;
            }
          }
        });
      },
      
      methods: {
        audioPlayOrPause() {
          this.clickMusicBtn = !this.clickMusicBtn;
          if (this.playFlag) {
            this.audioPause();
            this.playFlag = false;
          } else {
            this.audioAutoPlay();
            this.playFlag = true;
          }
        },
        audioPause() {
          let audio = this.$refs.audio
          audio.pause();
          document.addEventListener("WeixinJSBridgeReady", function () {
            audio.pause();
          }, false);
        },
        audioAutoPlay() {
          let audio = this.$refs.audio
          audio.play();
          document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
          }, false);
        },
      },
    }
  </script>
  