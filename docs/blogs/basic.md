# WebGIS基础
## 1. GIS基础
## 2. WEB基础
## 3. WEBGIS基本原理

--- 
地图初始化代码如下：
```html
<!DOCTYPE html>
<html>
<head>
    <title>XYZ</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    <style>
        html, body, .map {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>
<body>
<div id="map" class="map"></div>
<script>
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
                })
            })
        ],
        view: new ol.View({
            center: [11573403.877872996, 4353925.466026871],
            zoom: 4
        })
    });
</script>
</body>
</html>
```
<page-view :url="'../www/map.html'" />

<script setup>
import PageView from '../components/PageView.vue'
</script>