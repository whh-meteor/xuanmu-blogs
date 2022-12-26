# Ol+Vue-cli
## 一、安装依赖

在cmd控制台中 `cnpm install ol`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206171305283.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)

## 二、引入ol包，调用OSM地图

```html

<template>
  <div id="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";

export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      alert('map');
      new Map({
        target: "map",
        layers: [
     
            new TileLayer({
              source: new OSM(),
            }),
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [103.3, 35.5],
          zoom: 4,
        }),
      });
    },
  },
};
</script>

<style  scoped>
#map {
  height: 800px;
  width: 800px;
  margin: 0;
}
</style>
`
```
ps：1.设置地图容器的宽高
		2.确保地图地址有效
		

## 三、运行结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206174957694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)

