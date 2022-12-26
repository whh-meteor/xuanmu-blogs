# OpenLayers记录（六）模糊查询数据，列表显示并点击定位
### 1实现效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200726192848331.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTkwMDIx,size_16,color_FFFFFF,t_70)


### 2实现代码

```javascript
/**************模糊查询**************/
//监听回车事件
function onKey(e) {
    var eve = e || window.event;
    if (eve.keyCode == 13) {
        //  layer.msg('监听成功');
        fuzzySearch()
    }


};
//查询功能
function fuzzySearch() {
    var count = 400;
    var infects = new Array(count);
    var cures = new Array(count);
    var code = new Array(count);
    var lon = new Array(count);
    var Name = new Array(count);
    var coordinates = new Array(count);
    var lat = new Array(count);
    var dataSource = new Array(count);
    var oTxt = document.getElementById('searchInput');
    var oList = document.getElementById('fuzzySearchResults');
    $.ajax({
        url: "js/dat.json",
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(results) {
            dataSource = results;
            for (var i = 0; i < results.length; i++) {
                code[i] = results[i][0];
                Name[i] = results[i][1];
                infects[i] = results[i][2];
                cures[i] = results[i][3];
                lat[i] = results[i][4];
                lon[i] = (1) * results[i][5]; //坐标偏移处理

                coordinates[i] = ol.proj.fromLonLat([lat[i], lon[i]], 'EPSG:3857', 'EPSG:3857');

                if (infects[i] == "" || infects[i] == null) {
                    infects[i] = "暂无数据";
                } else if (cures[i] == " " || cures[i] == null) {
                    cures[i] = "暂无数据";
                } else if (lat[i] == "" || lat[i] == null) {
                    lat[i] = "暂无数据";
                } else if (lon[i] == "" || lon[i] == null) {
                    lon[i] = "暂无数据";
                }
            }
        }
    });
    var fruits = new Array(count);
    for (i = 0; i < count; i++) {
        fruits[i] = [
            code[i],
            Name[i],
            infects[i],
            cures[i],
            lat[i],
            lon[i]
        ]
    };
    /**查询结果
     * 开始  */
    var keyWord = oTxt.value;
    var fruitList = searchByRegExp(keyWord, fruits);
    renderFruits(fruitList);

    function renderFruits(list) {
        if (!(list instanceof Array)) {
            return;
        }
        oList.innerHTML = '';
        var len = list.length;
        var item = null;
        for (var i = 0; i < len; i++) {
            //创建ul1容器
            ul1 = document.createElement('ul');
            ul1.className = "fuzzySearchUL";
            ul1.id = "fuzzySearchUL";

            oList.appendChild(ul1);

            //创建 icon+标题    加入到ul1中
            item1 = document.createElement('li');
            item1.innerHTML = "<img src='css/markerflag.png' width='25' height='25' '>" + list[i][1];
            ul1.appendChild(item1);
            //换行
            item = document.createElement('br');
            ul1.appendChild(item);

            //添加节水代码， 加入到ul1中
            item0 = document.createElement('li');
            item0.innerHTML = "ID：" + list[i][0];
            ul1.appendChild(item0);
            //添加地址， 加入到ul1中
            item4 = document.createElement('li');
            item4.innerHTML = "治愈人数:" + list[i][3];
            ul1.appendChild(item4);
            //添加地址， 加入到ul1中
            item5 = document.createElement('li');
            item5.innerHTML = "累计人数:" + list[i][2];
            ul1.appendChild(item5);

            //添加经度， 加入到ul1中
            item2 = document.createElement('li');
            item2.innerHTML = "经度:" + list[i][4] + " <input type='hidden' value=" + list[i][4] + " name='lon' /> ";
            ul1.appendChild(item2);
            //添加纬度， 加入到ul1中
            item3 = document.createElement('li');
            item3.innerHTML = "纬度:" + list[i][5] + " <input type='hidden' value=" + list[i][5] + " name='lat' />";
            ul1.appendChild(item3);
        }
        //$('#fuzzySearchResults').append(title + center + end);
    }
    //模糊匹配的时候如果不区分大小写，可以使用toLowerCase()或者toUpperCase()转换之后去匹配。

    //模糊查询1:利用字符串的indexOf方法
    function searchByIndexOf(keyWord, list) {
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (list[i].indexOf(keyWord) >= 0) {
                arr.push(list[i]);
            }
        }
        return arr;
    }
    //模糊查询2:正则匹配
    function searchByRegExp(keyWord, list) {
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var arr = [];
        var reg = new RegExp(keyWord);
        for (var i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (reg.test(list[i])) {
                arr.push(list[i]);
            }
        }
        return arr;
    }
    // renderFruits(fruits);
    /****************点击搜索结果定位***************************/

    $('#fuzzySearchResults').on('click', 'ul', function() {
        function Position() {
            var lat1 = (1) * lat; //处理坐标
            var lon1 = (1) * lon; //处理坐标
            var view = map.getView();
            view.setZoom(12);

            view.setCenter(ol.proj.transform([lon1, lat1], 'EPSG:4326', 'EPSG:4326'));
            map.render();

        };
        var lon = $(this).find("input[name='lon']").val();
        var lat = $(this).find("input[name='lat']").val();
        //$(this).find("img").attr("src","image/1.png");
        //定位中心点
        //   alert(1);
        //  console.log("经度:" + lon + "纬度:" + lat);
        if (lon == null) {
            alert("请检查坐标!");

        } else if (lat == null) {
            alert("请检查坐标!");

        } else if (lon == 0) {
            alert("请检查坐标!");

        } else if (lat == 0) {
            alert("请检查坐标!");

        } else if (lon == null && lat == null) {
            alert("请检查坐标!");

        }

        Position();
    })
}
```
