import Theme from 'vitepress/theme'
import './style/var.css'
import axios from "axios";
import FreeStyle from './components/FreeStyle.vue'

import { h } from 'vue'
import FeatureAfter from './components/HeroBefore.vue'
import HeroBefore from './components/HomeHero.vue'


 
import Comment from './components/Comment.vue'
 
import Layout from './components/Layout.vue'
 
export default {
    ...Theme,
    Layout(){return Layout},
    // Layout() {
    //     return h(Theme.Layout, null, {
    //       'home-features-after': () => h(FeatureAfter),
    //       'home-hero-before': () => h(HeroBefore),
    //        'doc-after': () => h(Comment)
          
    //     })
    //   },
    // Page(){
    //   return Comment
    // },
    enhanceApp({ app }) {
        app.component('FreeStyle', FreeStyle)
       
    },
 
}


 
