# Openlayers记录（四）同一图层设置不同的点符号（大小、颜色等），弹窗显示。
### 1.实现效果
#### 1.1点符号设置
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713094059647.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
#### 1.2弹窗效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200713094504566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
## 2.实现的符号设置代码

```javascript
    /*****************标记部分****************************/

  var features1 = [];
  
  for (var i = 0; i < dataSource.items.length; i++) {
      var coordinate = [lat[i], lon[i]];
   
      coordinate.map(parseFloat);
      //  console.log("转换后经纬度：" + coordinate);
      var attr = {
      	Code:code[i],
          Name: Name[i],
          city: city[i],
          lat: lat[i],
          lon: lon[i],
          confirmed:confirmed[i],
          cure: cure[i],
          death: death[i],
          foreign:foreign[i]
      };
      //features1[i] = new ol.Feature({geometry: new ol.geom.Point(coordinate),
       //  attribute: attr,
 		
     // });
  features1.push( new ol.Feature({geometry: new ol.geom.Point(coordinate),
         attribute: attr,
 		name:dataSource.items[i].id
      }))
	
  }
  
var colors = ['#FF359A', '#CE0000', '#BE77FF', '#00CACA','#9393FF', '#FF5809', '#F9F900', '#B7FF4A','#AE57A4', '#804040', '#6C6C6C', '#336666','#000079', '#003E3E', '#F00078', '#C48888'];
  var iconWidth=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1];
  var iconWidth1=iconWidth.reverse();
   console.log();
   
var iconStyles = [];

for(var i=0;i<dataSource.items.length;i++){
	
	 iconStyles.push(new ol.style.Style({
    image:  new ol.style.Circle({
    	
        radius: iconWidth[i]*3,
        stroke: new ol.style.Stroke({
            color: '#fff',
        }),
        fill: new ol.style.Fill({
            color: colors[i],
           
        })
    })
  }))
	
}
var labelStyle = new ol.style.Style({
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        }),
        textBaseline: 'bottom',
        offsetY: -8
    })
});

 var source1 = new ol.source.Vector({
      features: features1,
 
  });

  

var markerVectorLayer = new ol.layer.Vector({
	name:'山东16地市疫情查询',
  source: source1,
  style: function(feature) {
    var name = feature.get('name');
  var iconStyle = iconStyles[parseInt(name)%colors.length];

      labelStyle.getText().setText(feature.values_.attribute.confirmed);
      return [iconStyle, labelStyle];
  }
});

map.addLayer(markerVectorLayer);

```
