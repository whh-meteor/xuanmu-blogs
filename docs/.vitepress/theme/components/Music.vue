<template>
  <div id="music">
      <!--@ended事件，当媒体播放完成 会自动调用该方法，执行该脚本，自动播放下一首-->
      <audio
ref="audio"
src="我的名字.mp3">
</audio>
      <!-- <audio id="audio" :src="musicData[currentIndex].songSrc"></audio> -->
      <!-- <audio id="audio" :src="musicData[currentIndex].songSrc" controls autoplay @ended = 'nextHanlder'></audio> -->
      <ul>
          <!-- 循环歌名，展示 -->
          <!-- <li @click = 'songHandler(index)' v-for = '(item,index) in musicData' :key="item.id" :class = '{active:index===currentIndex}'>
          {{item.id}}.{{ item.author }}-{{ item.name }}
     </li> -->
      </ul>
  </div>
</template>
<script>

var musicData = [{
  id: 1,
  name: '我的名字',
  author: '焦迈奇',
  songSrc: '我的名字.mp3'
}, {
  id: 2,
  name: '我的名字',
  author: '焦迈奇',
  songSrc: '我的名字.mp3'
}
  ,
{
  id: 3,
  name: '我的名字',
  author: '焦迈奇',
  songSrc: '我的名字.mp3'
}];
export default {
  name: 'Music',
  props: {

  },
  data() {
      return {
          musicData: [],
          currentIndex: 1
      }

  },
  methods: {
      // //点击那首歌播放哪一首
      // songHandler(i) {
      //     this.currentIndex = i;
      // },             //播放下一首
      // nextHanlder() {
      //     this.currentIndex++;
      // },
      // audioAutoPlay() {
      //     let audio = document.getElementById("audio");
      //     audio.play();
      //     document.removeEventListener("touchstart", this.audioAutoPlay);
      // }

  },


  created() {
      //赋值变量
      // this.musicData = musicData
      // this.$refs.audio.play()
  },

  mounted() {
      // // 播放音乐
      // let oAudio = document.querySelector("#audio");
      // oAudio.onended = function () {
      //     //播放完毕，重新循环播放
      //     oAudio.load();
      //     oAudio.play();
      // };
      // this.audioAutoPlay()
      this.$refs.audio.play()
  }
}

</script>