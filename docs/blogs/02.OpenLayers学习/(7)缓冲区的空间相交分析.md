# Openlayers记录（七）利用ol3进行缓冲区的空间相交分析
## 1效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200726193556653.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
## 2实现代码

> 首先需要添加引用文件jsts.js,坐标问题阴影proj4.js：

```javascript
//空间分析
var proj = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: [113.36672963700005, 23.125302196000064, 113.36790226200003, 23.12607775300006],
    units: 'degrees',
    axisOrientation: 'neu'
});


let parser = new jsts.io.OL3Parser();
parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon, ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
var wkt1 = "POINT (114.46733018908569 35.725607531477872)";
var wkt2 = "POINT (114.36734010607498 35.125616410488103)";
var format = new ol.format.WKT();
//设置符号样式
var style = {
    point: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 2 * 2,
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.8)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.8)',
                width: 1 / 2
            })
        }),
        zIndex: Infinity
    }),

    polygon: new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(200, 100, 250, 0.8)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#234120',
            width: 1
        }),
    }),
    intersect: new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 255, 0, 0.8)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#234120',
            width: 1
        }),
    }),
}

var feature1 = format.readFeature(wkt1, {
    dataProjection: 'EPSG:4326',
    featrueProjection: 'EPSG:4326'
});

var feature2 = format.readFeature(wkt2, {
    dataProjection: 'EPSG:4326',
    featrueProjection: 'EPSG:4326'
});
feature1.setStyle(style.point);
feature2.setStyle(style.point);

var geo1 = feature1.getGeometry();
var geo2 = feature2.getGeometry();

var jstsgeo1 = parser.read(geo1);
var jstsgeo2 = parser.read(geo2);

//缓冲区
var buffer1 = jstsgeo1.buffer(1);
var buffer2 = jstsgeo2.buffer(1);

//相交
//var intersects=buffer1.intersects(buffer2);
var intersects = buffer1.intersection(buffer2);
//console.log(intersects);
var fea = new ol.Feature();
//fea.setGeometry(parser.write(intersects.buffer(0.00001)))
fea.setGeometry(parser.write(intersects))
fea.setStyle(style.intersect);

console.log(fea);
//console.log(intersects.getCoordinates());

var fea1 = new ol.Feature();
var fea2 = new ol.Feature();
fea1.setGeometry(parser.write(buffer1));
fea2.setGeometry(parser.write(buffer2))

fea1.setStyle(style.polygon);
fea2.setStyle(style.polygon);
//console.log(feature);
var pt_vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [feature1, feature2]
    })
});

var pg_vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [fea1, fea2]
    })
});
var intersect_vector = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [fea]
    })
});
```

> 案例链接：链接：[https://pan.baidu.com/s/1iBoq9nI9RQYUprP5OP6EeA](https://pan.baidu.com/s/1iBoq9nI9RQYUprP5OP6EeA) 
提取码：vf3m 

