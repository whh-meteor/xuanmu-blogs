---
layout: home
hero:
  name: 旋木 
  text: Hi, I'm Xuan Mu 👋
  tagline: 天青色等烟雨
  image:
    src: 木马1.png
    alt: image
 
  actions:
    - theme: brand
      text: Start
      link: /blogs/
    - theme: alt
      text: View on Github
      link: https://github.com/whh-meteor
features:
- icon: 🔋
  title: 笔记
  details: 站在巨人的肩膀上。
  link: /blogs/

- icon: 🔧
  title: 知识库
  details: 知识就是力量！
  link: /knowledge/index

- icon: 🚀
  title: 一些想法
  details: 我思故我在
  # link: /idea/index
  
---

<!-- 项目分享部分 -->
<TheProject />
 

 
<!-- 音乐 -->

<Music />
 
 

<script setup >
import TheProject from './components/Project.vue'
import Music from './components/Music.vue'
</script>

<!-- <div style="color: red; font-size: 24px;">这是个有style的随便写点</div> -->
<!-- <div><img src="/wave.svg" style="border: 0px solid steelblue;margin-top:0" /></div> -->

  <!-- 在页面最后引入 -->
 
 <!-- <api></api> -->
<!-- <FreeStyle></FreeStyle> -->