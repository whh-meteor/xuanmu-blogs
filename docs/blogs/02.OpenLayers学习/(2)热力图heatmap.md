# Openlayers记录（二）热力图heatmap。
## 1先来效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207214027728.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207214038145.png)
可以调节热力图的半径大小跟模糊度
## 2代码实现

```javascript
//热力图
function heatmap() {
    layui.use('slider', function() {
        var slider = layui.slider;

        //渲染
        slider.render({
            elem: '#radius' //绑定元素
        });
    });

    var count = 400;
    var lon = new Array(count);
    var coordinates = new Array(count);
    var lat = new Array(count);
    var dataSource = new Array(count);
    $.ajax({
        url: "这里放url路径",
        type: 'get',
        data: {
            "参数"
        },

        dataType: 'json',
        async: false,
        success: function(results) {
          //  console.log(results);
            // alert(results);
            dataSource = results;

            for (var i = 0; i < results.length; i++) {
                 lat[i] = results[i][4];
                 lon[i] =  results[i][5]; 
         
            }
        }
    });

    var feas = [],
        heatData;
    for (var i = 0, len = dataSource.length; i < len; i++) {
        var provinceInfo = dataSource[i];
        //支持传入 GeoJSON 规范数据类型：
        var fea = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [lat[i], lon[i]]
            }
        };
        feas.push(fea);
    }

    heatData = {
        "type": "FeatureCollection",
        "features": feas
    };

    var blur = document.getElementById('blur');
    var radius = document.getElementById('radius');
    //矢量图层 获取gejson数据
    var vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(heatData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        })
    });
    // Heatmap热力图             
    var vector = new ol.layer.Heatmap({
        source: vectorSource,
        blur: parseInt(blur.value, 10),
        radius: parseInt(radius.value, 10),
    });

    //分别为另个参数设置控件（input）添加事件监听，动态设置热点图的参数
    radius.addEventListener('input', function() {
        vector.setRadius(parseInt(radius.value, 10)); //设置热点图层的热点半径
    });
    blur.addEventListener('input', function() {
        vector.setBlur(parseInt(blur.value, 10)); //设置热点图层的模糊尺寸
    });

    map.addLayer(vector);

    $('#removeHeatMap').on('click', function() {
        map.removeLayer(vector);
    });
}

```
## 3总结
返回的数据格式我用的是json，从数据库中读取坐标，返回到前台。