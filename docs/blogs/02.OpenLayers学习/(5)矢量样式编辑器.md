# Open layer记录（五）矢量样式编辑器

### 1样式面板
![在这里插入图片描述](https://img-blog.csdnimg.cn/202007161637568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
### 2修改样式
面板修改包括填充样式、边界样式，自定义颜色面板（需要用到一个js插件）
![在这里插入图片描述](https://img-blog.csdnimg.cn/202007161639163.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)
### 3实现代码
#### 3.1 html代码

```javascript
   <div id="aboutContainer">
            <div id="aboutTitle">矢量图层样式<span id="closeBtn" onclick="hideAbout()">X</span></div>
            <div id="aboutContent">
                <div class="style-box" style="">
                    <ul>
                        <li>
                            <h5>
                                <input type="checkbox" name="islabel" id="islabel">显示标注
                            </h5>
                        </li>
                        <li>
                            <h5>填充颜色：</h5>
                            <input type="radio" name="fillcolor" value="#000000">黑色
                            <input type="radio" name="fillcolor" value="#0000ff" checked="checked">蓝色
                            <input type="radio" name="fillcolor" value="#ff0000">红色
                            <input type="radio" name="fillcolor" value="">自定义
                            <input type="color" id="fillcolor" value="#0000ff" style="display: none;" />
                        </li>
                        <li>
                            <h5>填充透明度：</h5>
                            <input type="number" id="opacity" value="0.3" min="0" max="1" step="0.1" style="width: 50%;">
                        </li>
                        <li>
                            <h5>线条颜色：</h5>
                            <input type="radio" name="linecolor" value="#000000">黑色
                            <input type="radio" name="linecolor" value="#0000ff" checked="checked">蓝色
                            <input type="radio" name="linecolor" value="#ff0000">红色
                            <input type="radio" name="linecolor" value="">自定义
                            <input type="color" id="linecolor" value="#0000ff" style="display: none;" />
                        </li>
                        <li>
                            <h5>线条类型：</h5>
                            <input type="radio" name="linetype" value="false">实线
                            <input type="radio" name="linetype" value="true" checked="checked">虚线
                        </li>
                        <li>
                            <h5>线条宽度：</h5>
                            <input type="number" name="linewidth" value="2" min="1" max="5" style="width:50%;">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

```
#### 3.2  JavaScript代码

```javascript
//线的颜色
$("input[name='linecolor']").on("change", function() {
    var _color = $(this).val();
    if (_color === "") {
        $("#linecolor").show();
    } else {
        $("#linecolor").attr("value", _color).hide();
    }
    vectorJSON.setStyle(getStyle());
    vector_L.setStyle(getStyle());
     vectorJSON_sdxz.setStyle(getStyle());
});
//填充颜色
$("input[name='fillcolor']").on("change", function() {
    var _color = $(this).val();
    if (_color === "") {
        $("#fillcolor").show();
    } else {
        $("#fillcolor").attr("value", _color).hide();
    }
    vectorJSON.setStyle(getStyle());
    vector_L.setStyle(getStyle());
    vectorJSON_sdxz.setStyle(getStyle());
});
//透明度，线的颜色，填充颜色，线条类型，线条宽度
$("input[name='linetype'], input[name='linewidth'], #islabel").on("change", function() {
    vectorJSON.setStyle(getStyle());
    vector_L.setStyle(getStyle());
     vectorJSON_sdxz.setStyle(getStyle());
});
$("#opacity, #linecolor, #fillcolor").on("input propertychange", function() {
    vectorJSON.setStyle(getStyle());
    vector_L.setStyle(getStyle());
     vectorJSON_sdxz.setStyle(getStyle());
});

//控制样式生成
function getStyle() {
    var opacityDef = $("#opacity").val();
    var color = $("input[name='linecolor']:checked").val();

    if (color === "") {
        color = $("#linecolor").val();
    }

    var fillColor = $("input[name='fillcolor']:checked").val();

    if (fillColor === "") {
        fillColor = $("#fillcolor").val().colorRgb();
        fillColor = fillColor.substr(0, fillColor.length - 1);
        fillColor = fillColor + "," + opacityDef + ")";
    } else {

        fillColor = fillColor.colorRgb();
        fillColor = fillColor.substr(0, fillColor.length - 1);
        fillColor = fillColor + "," + opacityDef + ")";
    }
    //var _fillColor = "RGBA(" + fillColor[5]  + "," + fillColor[8] + "," + fillColor[9]+ "," + opacity + ")";

    var dash = $("input[name='linetype']:checked").val();
    var width = parseInt($("input[name='linewidth']").val());
    var _dash = dash === "true" ? 3 * width : 0;
    var islabel = $("#islabel")[0].checked;
    return function(feature, resolution) {
        var name = feature.get("name");
        var lblcolor = '#000000';
        if (!islabel) lblcolor = 'rgba(0,0,0,0)';
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                lineDash: [_dash, _dash],
                width: width
            }),
            fill: new ol.style.Fill({
                color: fillColor,
                opacity: opacityDef,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            }),
            text: new ol.style.Text({
                text: name,
                fill: new ol.style.Fill({
                    color: lblcolor
                })
            })
        });
    }
}
```
### 4 自定义颜色选择器

```javascript
//十六进制颜色值域RGB格式颜色值之间的相互转换

//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function () {
    var that = this;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};

//-------------------------------------------------

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function () {
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};
```
