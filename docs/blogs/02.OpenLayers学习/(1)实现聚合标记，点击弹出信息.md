# Openlayers记录（一）实现聚合标记，点击弹出信息。
## 1 效果展示

默认状态下，设置聚合距离，相邻的marker会聚合在一起
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207211111557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)

### 1.1 点击聚合的标记
当标记聚合时会提示标记标签
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207211312207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)

### 1.2 点击非聚合标记
点击未聚合的标记，显示具体信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207211504136.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
## 2实现聚合代码

```javascript
var features = new Array(dataSource.length);
    for (var i = 0; i < dataSource.length; i++) {


        // var coordinate = ol.proj.transform([lat[i], lon[i]], 'EPSG:4326', 'EPSG:3857');
        //  var coordinate = ol.proj.transform([lat[i], lon[i]], 'EPSG:4326', 'EPSG:4326');
        var coordinate = [lat[i], lon[i]];
        coordinate.map(parseFloat);
        //  console.log("转换后经纬度：" + coordinate);


        var attr = {
            userName: userName[i],
            lat: lat[i],
            lon: lon[i],
            address: monthYear[i],
            code: code[i],
            phone: waterUse[i],
        };
        features[i] = new ol.Feature({
            geometry: new ol.geom.Point(coordinate),
            attribute: attr,

        });
    }

    var source = new ol.source.Vector({
        features: features,

    });
    var clusterSource = new ol.source.Cluster({
        distance: 40,
        source: source,

    });

    //加载聚合标注的矢量图层
    var styleCache = {};
    var layerVetor = new ol.layer.Vector({
        source: clusterSource,
        style: function(feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                style = [new ol.style.Style({
                    image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                        anchor: [0.5, 10],
                        anchorOrigin: 'top-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'top-right',
                        offset: [0, 1], //偏移量设置
                        scale: 1.2, //图标缩放比例
                        opacity: 1, //透明度
                        src: '../MyImg/img/markerbig_select.png' //图标的url
                    })),
                    text: new ol.style.Text({
                        font: '12px Calibri,sans-serif',
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: '#eee',
                            border: 5,
                            width: 3
                        })
                    })
                })];
                styleCache[size] = style;
            }
            return style;
        }
    });

    map.addLayer(layerVetor);
```

### 2.1点击聚合标记，不同状态的弹窗

```javascript
 map.on('click', function(evt) {
        var coordinate = evt.coordinate;
        /****************************************************/
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layerVetor) { return feature; });
        if (feature) { //捕捉到要素
            if (feature.getProperties().features) { //聚合情况下
                if (feature.getProperties().features.length == 1) { //只有一个要素

                    // layer.msg("聚合该处有1个要素")
                    featuerInfo = feature.getProperties().features[0].N.attribute;
                    content.innerHTML = ''; //清空popup的内容容器

                    addFeatrueInfo(featuerInfo); //在popup中加载当前要素的具体信息
                    if (popup.getPosition() == undefined) {
                        popup.setPosition(coordinate); //设置popup的位置
                    }
                } else { //有多个要素                                                   
                    layer.msg("多标记聚合！");

                    info_popup.setPosition(undefined);
                }
            } else {

                info_popup.setPosition(undefined);
            }
        } else {
            info_popup.setPosition(undefined);
        }
        /******************************************/
    });
    /**
     * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
     */
    map.on('pointermove', function(e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    })

```


## 3 最后
初学openlayers，有不足之处还请大佬指正。也欢迎交流，qq654671523.


