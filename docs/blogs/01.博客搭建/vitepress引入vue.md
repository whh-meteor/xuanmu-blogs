# vitepress 引入vue组件

## 编写VUE组件
首先要明确的一点就是，Vitepress和Vuepress等工具都是尤大团队开发的方便Vue用户进行个人站点搭建的工具，本质上的Vue生态的一部分，所以想要个性化自己的网站，需要先学习Vue，Vitepress是基于Vite和Vue3.x进行开发的，所以这里的开发需要使用Vue3.x的内容。

我们在整个目录中新建一个compement文件夹，在其中新建一个.vue文件。
## 在md界面中使用Vue
```markdown
---
title: 开源项目
layout: home
---
<div class="test"> 测试一下哈哈哈哈哈 </div>
<TheProject />
<script setup>
import TheProject from '../../compoment/TheProject.vue'
</script>
<style>
.test{
    color:red
}
</style>
```
 