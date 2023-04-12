// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import FreeStyle from './components/FreeStyle.vue'
import MyLayout from './components/Layout.vue'
import FlyFish from './components/FlyFish.vue'
import HomeSVG from './components/HomeSVG.vue'
// import Intro from '../../components/Intro.vue'
// import Archives from "./components/Archives.vue";
// import Tags from "./components/Tags.vue";

import './style/var.css'
export default {
  ...DefaultTheme,
  Layout: MyLayout, 
  enhanceApp({ app }) {
    // register global components
    app.component('FreeStyle', FreeStyle)
    app.component('FlyFish', FlyFish)
    app.component('HomeSVG', HomeSVG)
    // app.component("Archives", Archives);
    // app.component("Tags", Tags);
    // app.component('Intro', Intro)
  }
}