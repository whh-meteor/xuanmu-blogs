import Theme from 'vitepress/theme'
import './style/var.css'
import axios from "axios";
import FreeStyle from './components/FreeStyle.vue'

import { h } from 'vue'
import HeroBefore from './components/HeroBefore.vue'



export default {
    ...Theme,
    Layout() {
        return h(Theme.Layout, null, {
          'home-features-after': () => h(HeroBefore)
        })
      },
    enhanceApp({ app }) {
        app.component('FreeStyle', FreeStyle)
       
    },
 
}


 
