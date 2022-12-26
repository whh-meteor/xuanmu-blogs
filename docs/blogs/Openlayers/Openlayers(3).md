# Openlayers记录（三）iClient for ol 实现聚合标签专题图。
## 1 先看效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207215452266.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
点击某个标签的时候，弹出具体信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200207215538916.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
同时具有图例级别
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020020721560190.png)
## 2 实现代码

```javascript
/*****标签专题图********/
var themeSource, themeData;
var myDate = new Date();

function LabelThemeLayer() {

    $('#labelTheme').css('display', 'block');
    var currentYear = myDate.getFullYear();
    var currentMonth = myDate.getMonth();
    $.ajax({
        type: "get",
        url: "****",
        data: {
			*******	
        },
        dataType: 'json',
        async: false,
        success: function (results) {
         
            themeData = results;

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },

    })

    initThemeLayer();

};

function initThemeLayer() {

    themeSource = new ol.source.Label("labelThemeLayer", {
        map: map,
        attributions: " ",
        style: new SuperMap.ThemeStyle({
            labelRect: true,
            fontColor: "#000000",
            fontWeight: "bolder",
            fontSize: "18px",
            fill: true,
            fillColor: "#FFFFFF",
            fillOpacity: 1,
            stroke: false,
            strokeColor: "#8B7B8B"
        }),
        themeField: "Actual",
        styleGroups: [{
            start: 0,
            end: 300,
            style: {
                fillColor: "#6ACD06",
                fontSize: "17px"
            }
        }, {
            start: 301,
            end: 900,
            style: {
                fillColor: "#FBD12A",
                fontSize: "19px"
            }
        }, {
            start: 901,
            end: 2500,
            style: {
                fillColor: "#FE8800",
                fontSize: "22px"
            }
        }, {
            start: 2501,
            end: 10000,
            style: {
                fillColor: "#FF0000",
                fontSize: "24px"
            }
        }, {
            start: 10001,
            end: 20000,
            style: {
                fillColor: "#CC0000",
                fontSize: "26px"
            }
        }, {
            start: 20001,
            end: 300000,
            style: {
                fillColor: "#960453",
                fontSize: "28px"
            }
        }]
    });
    //专题图层 mousemove 事件
    themeSource.on('mousemove', handleMouseOver);
    //source添加到图层
    var pointerInteraction = new ol.interaction.Pointer({
        handleDownEvent: function (event) {
            themeSource.fire('mousemove', event);
        }
    });
    map.addInteraction(pointerInteraction);
    var themeLayer = new ol.layer.Image({
        source: themeSource
    });
    map.addLayer(themeLayer);
    addFeatures();

    $('#removeThemeLabel').on('click', function () {
        //移除图层
        map.removeLayer(themeLayer);
        $('#labelTheme').css('display', 'none');
        map.removeInteraction(pointerInteraction);
        
    })
}

function addFeatures() {
    var labelFeatures = [];
    var feat;
    for (var i = 0; i < themeData.length; i++) {
        // var lonlat = themeData[i].lonLat.split(",");
        var lng = parseFloat(themeData[i].lon);
        var lat = parseFloat(themeData[i].lat);
        var text = themeData[i].Actual;
        feat = new ol.supermap.ThemeFeature([lng, lat, text], themeData[i]);
        labelFeatures.push(feat);
    }

    themeSource.addFeatures(labelFeatures);

}

function removethemeLayer(labelFeatures, feat) {

    themeSource.addFeatures(null);
}
//图层信息框
function updateInfoView(feature) {
    var rs = myDate.toLocaleString();
    if (!feature && popup) {
        removePopup();
        return;
    }

    var statisticsData = getStatisticsData();
    var contentHTML = "<table><tbody><tr>" +
        "<td><div style='margin-left: 15px'>" +
        "<table><tbody><tr>" +
        "<td id='contentBoxlabel'><div id='contentID' style='margin-top: 2px;margin-bottom: 2px;width:75px;text-align: center;font-size:28px;color: #ffffff;text-shadow: 1px 1px 0 #ffffff;'>" + feature.attributes.Actual + "</div></td>" +
        "<td style='padding-right: 20px;'></td>" +
        "<td>" +
        "<div id='textID' style='text-align: left;font-size: 19px;text-shadow: 1px 1px 0 #ffffff;'>" + feature.attributes.code + "</div>" +
        "<div style='font-size:10px;width:150px;'>" + rs + "</div>" +
        "<div style=' font-weight:lighter; font-size:14px;'>" + "当前单位 ：" + feature.attributes.area + "</div>" +
        "</td>" +
        "</tr> </tbody></table>" +
        "<table style='width:100%;font-size: 10px;border: 0 solid black;padding: 0;margin: 0;border-spacing: 0;'>" +
        "<tbody>" +
        "<tr>" +
        "<td style='font-weight:bold;width:45px;'></td><td style='font-weight:bold;width:51px;' align='center' nowrap='true'>当前</td>" +
        "<td  style=' font-weight:bold;width:49px;' align='center' nowrap='true'>最小</td>" +
        "<td style='font-weight:bold;width:49px;' align='center' nowrap='true'>最大</td> " +
        "</tr>" +
        "<tr style='height: 23px;'><td style='padding-left: 0;padding-right: 0'><div style='width:46px;'><span style='font-weight:bold;'>计划</span></div></td>" +
        "<td style='font-size:11px;' align='center'>" + feature.attributes.Planned + "</td>" +
        "<td style='color:#0086c8;font-size:11px;' align='center'>" + statisticsData.minNum + "</td>" +
        "<td  style='color:#ce3c3a;font-size:11px;' align='center'>" + statisticsData.maxNum + "</td>" +
        "</tr>" +
        "<tr style='height: 23px;'><td style='padding-left: 0;padding-right: 0'><div style='width:46px;'><span style='font-weight:bold;'>实际</span></div></td>" +
        "<td style='font-size:11px;' align='center'>" + feature.attributes.Actual + "</td>" +
        "<td style='color:#0086c8;font-size:11px;' align='center'>" + statisticsData.minActual + "</td>" +
        "<td  style='color:#ce3c3a;font-size:11px;' align='center'>" + statisticsData.maxActual + "</td>" +
        "</tr>" +

        "</tr></tbody> </table></div></td></tr></tbody> </table>";

    var latLng = getLatLng(feature.attributes.lon, feature.attributes.lat);

   var label =  layer.msg(contentHTML, {
        time: 0 //不自动关闭
        , btn:['关闭'],
        yes: function (index) {
            layer.close(index);
        }

    });

    



    //设置弹框内容颜色
    var groups = themeSource.styleGroups;
    for (var i = 0; i < groups.length; i++) {
        if (feature.attributes.Actual >= groups[0].start && feature.attributes.Actual < groups[0].end) {
            setColor("#6ACD06");
        } else if (feature.attributes.Actual >= groups[1].start && feature.attributes.Actual < groups[1].end) {
            setColor("#FBD12A");
        } else if (feature.attributes.Actual >= groups[2].start && feature.attributes.Actual < groups[2].end) {
            setColor("#FE8800");
        } else if (feature.attributes.Actual >= groups[3].start && feature.attributes.Actual < groups[3].end) {
            setColor("#FF0000");
        } else if (feature.attributes.Actual >= groups[4].start && feature.attributes.Actual < groups[4].end) {
            setColor("#CC0000");
        } else if (feature.attributes.Actual >= groups[5].start && feature.attributes.Actual < groups[5].end) {
            setColor("#960453");
        }
    }

    function setColor(color) {
        document.getElementById("contentBoxlabel").style.backgroundColor = color;
        // document.getElementById("textID").style.color = color;
    }

    function getLatLng(latLng) {
        // var latLng = latLng.split(",");
        return [parseFloat(themeData.lon), parseFloat(themeData.lat)]
    }
}




function getStatisticsData() {
    if (this.statisticsData) {
        return this.statisticsData;
    }
    //遍历数组，获取单个属性。组成新的数组
    var Planned = [],
        Actuals = [];
    for (var i = 0; i < themeData.length; i++) {
        Actuals.push(themeData[i].Planned);
        Planned.push(themeData[i].Actual);

    }
    //获取单个属性的最大最小值
    this.statisticsData = {
        maxNum: Math.max.apply(Math, Planned),
        minNum: Math.min.apply(Math, Planned),
        maxActual: Math.max.apply(Math, Actuals),
        minActual: Math.min.apply(Math, Actuals),

    };
    return this.statisticsData;

}

function handleMouseOver(e) {
    if (e.target && e.target.refDataID) {
        var fid = e.target.refDataID;
        var fea = themeSource.getFeatureById(fid);
        if (fea) {
            updateInfoView(fea);
        }
    } else {
        //  removePopup();
    }
}
```
## 3最后
数据从后台ajax请求
要素点击事件加不上，点击其实是模拟的一个鼠标点击然后抬起的过程。
参考超图iclient for openlayers 的标签专题图
[点击跳转iClient for openlayers 标签专题图](https://iclient.supermap.io/examples/openlayers/editor.html#labelThemeLayer)
