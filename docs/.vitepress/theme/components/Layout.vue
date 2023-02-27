<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue';

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
 
 
 <Layout>  
   <!-- this is where markdown content will be rendered -->
  <template #doc-footer-before>
      <Comment v-if="!frontmatter.disableComment" ></Comment>

  </template></Layout>
  
 
</template>