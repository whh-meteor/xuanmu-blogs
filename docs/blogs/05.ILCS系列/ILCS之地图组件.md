# Opoenlayer地图组件封装与使用

## 引入组件

```js
···
import BaseOlMap from "@/components/0-PublicCom/BaseOlMap.vue";

export default {
  components: {
    BaseOlMap
  },
···
```


## 使用

``` html
    <base-ol-map
        v-bind:geoserverData="BaseMapData"
        @map="mapinfo"
    >
    </base-ol-map>
```

```js

export default {
  components: {
    BaseOlMap, ServiceChain
  },
  data () {
    return {
      BaseMapData: {//传参给BaseMap
        //加载WMS输入参数
        workArea: '',
        layers: '',
        //发布TIF参数
        ws2: '',
        store_layer2: '',
        tifUrl2: '',
      },
    }
  },
  ···
```

```js
 InvokeProcessImage () {
      //改变传给BaseMap的值
      this.BaseMapData.workArea = "AFTERPRO"
      this.BaseMapData.layers = "AFTERPRO:AFTERPRO"
    }
```