// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import FreeStyle from './components/FreeStyle.vue'
import MyLayout from './components/Layout.vue'
import './style/var.css'
export default {
  ...DefaultTheme,
  Layout: MyLayout, 
  enhanceApp({ app }) {
    // register global components
    app.component('FreeStyle', FreeStyle)
  }
}