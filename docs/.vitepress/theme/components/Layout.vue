<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue';
import Title from "./Title.vue";
import Music from './Music.vue'
const { frontmatter } = useData()
const { page } = useData()
const { Layout } = DefaultTheme

</script>

<template>
  <Layout>
    <!-- NAV 插槽 
    nav-bar-title-before
    nav-bar-title-after
    nav-bar-content-before
    nav-bar-content-after
    nav-screen-content-before
    nav-screen-content-after-->
    <template #nav-bar-content-before>
      <Music />
    </template>

 

    <template #doc-before>
      <Title :key="page.relativePath" />
    </template>

    <!-- this is where markdown content will be rendered -->
    <template #doc-footer-before>
      <Comment :key="page.relativePath"></Comment>
      <!-- <Comment v-if="!frontmatter.disableComment" :key="page.relativePath"></Comment> -->
    </template>
    <template #home-hero-before>
      <HomeSVG></HomeSVG>
    </template>
    <template #home-features-after>

      <fly-fish></fly-fish>
    </template>

  </Layout>

 
</template>