# ILCS 之 DAG 流程图使用

## Github组件
仓库：
https://github.com/murongqimiao/DAG-diagram

示例：https://murongqimiao.github.io/DAG-diagram/#/
## 编写组件

```html
<template>
  <div
    class="page-content"
    @mousedown="startNodesBus($event)"
    @mousemove="moveNodesBus($event)"
    @mouseup="endNodesBus($event)"
  >
    <!-- <a-button type="dashed" ghost @click="backToExe">返回</a-button> -->
    <!-- <p style="color: #fff">{{ getCoorXY }}</p> -->
    <!-- <p class="animation-btn" @click="makeSomeAnimation">播放动画</p> -->
    <!--
    DataAll: 数据源
    updateDAG:每次动作行为会抛出最新的数据, 和对应事件名称.
    editNodeDetails: 可选内容,右键点击节点会带出节点数据,用此方法接受, 进行二次开发.比如更改节点携带的数据等.-->

    <DAGBoard
      :DataAll="DataAll"
      @updateDAG="updateDAG"
      @editNodeDetails="editNodeDetails"
      @doSthPersonal="doSthPersonal"
      @getCoorXY="getCoorXYCon"
    ></DAGBoard>
  </div>
</template>

<script>
import {

  animationJSON1
} from './data'
export default {
  data () {
    return {
      DataAll: {
        "edges": [
          {
            "dst_input_idx": 0,
            "dst_node_id": 2,
            "id": 1,
            "src_node_id": 1,
            "src_output_idx": 0,
            "edgesText": "running into cd"
          },
          {
            "src_node_id": 2,
            "src_output_idx": 0,
            "dst_node_id": 102,
            "dst_input_idx": 0,
            "id": 11,
            "edgesText": "running into filter"
          }
        ],
        "nodes": [
          {
            "id": 1,
            "in_ports": [
              0
            ],
            "name": "Cropping-Matching",
            "out_ports": [
              0
            ],
            "pos_x": 7.3562,
            "pos_y": 58.8018,
            "type": "Variable",
            "iconClassName": "el-icon-link",
            "detail": [
              {
                "label": "time",
                "value": "2018"
              }
            ]
          },
          {
            "id": 2,
            "in_ports": [
              0
            ],
            "name": "PCA&K-Means",
            "iconClassName": "el-icon-cpu",
            "out_ports": [
              0
            ],
            "pos_x": 180.5327,
            "pos_y": 140.5076,
            "type": "Variable"
          },
          {
            "pos_x": 341.0335,
            "pos_y": 226.4488,
            "name": "Erode",
            "id": 102,
            "in_ports": [
              0
            ],
            "out_ports": [
              0
            ]
          }
        ]
      },
      clockOfAnimation: null, // 动画播放计时器
      currentAnimate: 0, // 当前动画播放到第几帧
      maxAnimateFrames: 0,
      animationArr: [],
      jsonshow: false,
      getCoorXY: ''
    }
  },
  props: ['BeginPlay'],
  watch: {

    BeginPlay: {
      deep: true,  // 深度监听
      handler (newVal, oldVal) {

        if (newVal == 1) {
          //开始播放动画
          this.makeSomeAnimation()
        }
      }
    }
  },
  methods: {
    backToExe () {

      this.$emit("backToExe", true)
    },
    getCoorXYCon (xy) {
      this.getCoorXY = xy
    },
    startNodesBus (e) {
      /**
       *  别的组件调用时, 先放入缓存
       * dragDes: {
       *    drag: true,
       *    name: 组件名称
       *    type: 组件类型
       *    model_id: 跟后台交互使用
       * }
       **/
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y,
          value: dragDes.name
        });
        this.dragBus = true;
      }
    },
    moveNodesBus (e) {
      // 移动模拟节点
      if (this.dragBus) {
        const x = e.pageX;
        const y = e.pageY;
        this.busValue = Object.assign({}, this.busValue, {
          pos_x: x,
          pos_y: y
        });
      }
    }, endNodesBus (e) {
      // 节点放入svg
      let dragDes = null;
      if (sessionStorage["dragDes"]) {
        dragDes = JSON.parse(sessionStorage["dragDes"]);
      }
      if (dragDes && dragDes.drag && e.toElement.id === "svgContent") {
        const { model_id, type } = dragDes;
        const pos_x =
          (e.offsetX - 90 - (sessionStorage["svg_left"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const pos_y =
          (e.offsetY - 15 - (sessionStorage["svg_top"] || 0)) /
          (sessionStorage["svgScale"] || 1); // 参数修正
        const params = {
          model_id: sessionStorage["newGraph"],
          desp: {
            type,
            pos_x,
            pos_y,
            name: this.busValue.value
          }
        };
        this.DataAll.nodes.push({
          ...params.desp,
          id: this.DataAll.nodes.length + 100,
          in_ports: [0],
          out_ports: [0]
        })
      }
      window.sessionStorage["dragDes"] = null;
      this.dragBus = false;
    },
    updateDAG (data, actionName) {
      // DAG-Board更新 data是最新的数据,  actionName是事件的名称
      this.DataAll = data
      this.jsonEditor = JSON.stringify(this.DataAll, null, 4)
      console.log('actionName', data, actionName)
    },
    editNodeDetails (value) {
      alert(`edit id ${value.id} , info : ${JSON.stringify(value.detail, null, 4)} `)
    },
    doSthPersonal (eventName, id) {
      alert(`edit personal things like ${eventName}, the id is ${id}, current node detail is ${JSON.stringify(this.DataAll.nodes.find(item => item.id === id))}`)
    },


    makeSomeAnimation () { // 动画范例
      this.currentAnimate = 0
      if (!this.animationArr.length) this.animationArr = animationJSON1
      this.maxAnimateFrames = this.animationArr.length // 帧动画长度

      this.play()
    },
    play () { // 播放帧动画
      console.log('当前帧', this.currentAnimate, '最大帧', this.maxAnimateFrames)
      if (this.currentAnimate >= this.maxAnimateFrames) return false
      this.DataAll = this.animationArr[this.currentAnimate]
      this.jsonEditor = JSON.stringify(this.DataAll, null, 4)
      this.currentAnimate++
      setTimeout(() => {
        this.play()
      }, 1500);
    },
  }

}
</script>

<style >
foreignObject body {
  background: transparent;
}
.page-content {
  /* position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0; */
  overflow: hidden;
  user-select: none;
  background-size: 50px 50px;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.05) 26%,
      transparent 27%,
      transparent 74%,
      rgba(255, 255, 255, 0.05) 75%,
      rgba(255, 255, 255, 0.05) 76%,
      transparent 77%,
      transparent
    );
  background-color: rgb(60, 60, 60) !important;
  min-height: 1vh;
  padding-left: 0px;
  height: 100%;
}
.page-content .logo {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 800;
  color: #fff;
}
.page-content .el-tree {
  background: transparent;
  color: #ccc;
}

.animation-btn {
  background: #fff;
  color: black;
  border-radius: 15px;
  height: 30px;
  position: absolute;
  left: 50px;
  width: 140px;
  border: 1px solid #289de9;
  line-height: 30px;
  display: inline-block;
  cursor: pointer;
  left: 200px;
}
</style>
```
## 在页面中导入组件


```js
···
import ServiceChain from "./PAMCServiceChain.vue"


export default {
  components: {
    BaseOlMap, ServiceChain
  },
  ····
```
## 自定义动画

点击播放按钮，画面按js设置的动画执行
data.js
```js

const inputdata = { "id": 1, "in_ports": [], "name": "数据载入", "out_ports": [0], "iconClassName": "el-icon-loading", "pos_x": 554.3142857142857, "pos_y": 24.838095238095207 }
const PCA = { "pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "PCA", "id": 202, "in_ports": [0], "out_ports": [0] }
const PCALoadiing = { "pos_x": 104.66666666666666, "pos_y": 125.33333333333334, "name": "PCA", "id": 202, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0] }

const CVA = { "pos_x": 424.6666666666667, "pos_y": 113.33333333333333, "name": "CVA", "id": 201, "in_ports": [0], "out_ports": [0] }
const MAD = { "pos_x": 724.66666666666666, "pos_y": 125.33333333333334, "name": "MAD", "id": 203, "in_ports": [0], "out_ports": [0] }
const IRMAD = { "pos_x": 1024.66666666666666, "pos_y": 125.33333333333334, "name": "IRMAD", "id": 204, "in_ports": [0], "out_ports": [0] }


const KMeans = { "pos_x": 442, "pos_y": 237.66666666666666, "name": "K-Means聚类均值", "id": 301, "in_ports": [0], "out_ports": [0] }
const KMeansLoadding = { "pos_x": 442, "pos_y": 237.66666666666666, "name": "K-Means聚类均值", "id": 301, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0, 1] }

const OTSU = { "pos_x": 742, "pos_y": 237.66666666666666, "name": " OTSU", "id": 302, "in_ports": [0], "out_ports": [0] }
const LinearStretch2 = { "pos_x": 663.66666666666669, "pos_y": 374.3333333333333, "name": "Linear stretch 2%", "id": 401, "in_ports": [0], "out_ports": [0] }
const LinearStretch2Loading = { "pos_x": 663.66666666666669, "pos_y": 374.3333333333333, "name": "Linear stretch 2%", "id": 401, "iconClassName": "el-icon-loading", "in_ports": [0], "out_ports": [0] }
export const animationJSON1 = [
    //第1行
    {
        "edges": [],
        "nodes": [inputdata]
    },
    //第2行

    {
        "edges": [],
        "nodes": [inputdata, CVA, PCA, MAD, IRMAD]
    },
    //第1行~~~~ ~连线~~~~~~~~~第2行
    {
        "edges": [{ "src_node_id": 1, "src_output_idx": 0, "dst_node_id": 202, "dst_input_idx": 0, "id": 10 }],
        "nodes": [inputdata, CVA, PCA, MAD, IRMAD]
    },
    //第3行 
    {
        "edges": [{ "src_node_id": 1, "src_output_idx": 0, "dst_node_id": 202, "dst_input_idx": 0, "id": 10 },

        ],
        "nodes": [inputdata, CVA, MAD, IRMAD, PCA, KMeans, OTSU]
    },
    //第2行~~~~ ~连线~~~~~~~~~第3行
    {
        "edges": [{ "src_node_id": 1, "src_output_idx": 0, "dst_node_id": 202, "dst_input_idx": 0, "id": 10 },
            { "src_node_id": 202, "src_output_idx": 0, "dst_node_id": 301, "dst_input_idx": 0, "id": 11 }
        ],
        "nodes": [inputdata, CVA, MAD, IRMAD, PCALoadiing, KMeans, OTSU]
    },
    //第4行 
    {
        "edges": [{ "src_node_id": 1, "src_output_idx": 0, "dst_node_id": 202, "dst_input_idx": 0, "id": 10 },
            { "src_node_id": 202, "src_output_idx": 0, "dst_node_id": 301, "dst_input_idx": 0, "id": 11 },
        ],
        "nodes": [inputdata, CVA, MAD, IRMAD, PCALoadiing, KMeans, OTSU, LinearStretch2]
    },
    //第3行~~~~ ~连线~~~~~~~~~第4行
    {
        "edges": [{ "src_node_id": 1, "src_output_idx": 0, "dst_node_id": 202, "dst_input_idx": 0, "id": 10 },
            { "src_node_id": 202, "src_output_idx": 0, "dst_node_id": 301, "dst_input_idx": 0, "id": 11 },
            { "src_node_id": 301, "src_output_idx": 0, "dst_node_id": 401, "dst_input_idx": 0, "id": 13 },

        ],
        "nodes": [inputdata, CVA, MAD, IRMAD, PCALoadiing, KMeansLoadding, OTSU, LinearStretch2Loading]
    },
  
]
```