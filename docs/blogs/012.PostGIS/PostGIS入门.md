# PostGIS 入门


PostGIS：提供地理图形数据的支持；提供大量成熟的 SQL 函数以便进行分析和转换地理数据

## 一、创建和基本使用

### 1.1 创建数据库 
![](img/PostGIS入门/img-2023-08-16-19-59-50.png)

### 1.2 创建数据扩展

在架构上右键运行sql查询，会有智能提示

![](img/PostGIS入门/img-2023-08-16-20-00-17.png)

### 1.3 通过查询版本号查看是否创建成功
![](img/PostGIS入门/img-2023-08-16-20-00-42.png)

### 1.4 创建数据点 作为结果 并转为geojson格式。
![](img/PostGIS入门/img-2023-08-16-20-00-55.png)


## 二、QGIS连接数据库并存储矢量数据

### 2.1 在QGIS中添加连接

![](img/PostGIS入门/img-2023-08-16-20-01-12.png)

### 2.2 在数据管理器中打开

一般不要把数据放在public架构中，新建basedata

![](img/PostGIS入门/img-2023-08-16-20-01-26.png)
![](img/PostGIS入门/img-2023-08-16-20-01-39.png)

### 2.3 选中并导入图层，一般勾选创建空间索引即可

![](img/PostGIS入门/img-2023-08-16-20-01-53.png)

### 2.4 从数据库中拖拽即可查看存储的数据

![](img/PostGIS入门/img-2023-08-16-20-02-04.png)

## 三、数据格式

常用输出与输入：

    postgis 中常用的数据格式文本类型：WKT（ST_AsText） / geojson（ST_AsGeoJSON）

        二进制类型：WKB（ST_AsBinary）

### 3.1 构建点（实际上是geometry）

![](img/PostGIS入门/img-2023-08-16-20-02-16.png)

### 3.2 转wkt输出

![](img/PostGIS入门/img-2023-08-16-20-02-28.png)

### 3.3 转二进制输出

![](img/PostGIS入门/img-2023-08-16-20-02-42.png)

 ### 3.4 转经纬度文本

 ![](img/PostGIS入门/img-2023-08-16-20-02-55.png)

  ### 3.5 转geojson

![](img/PostGIS入门/img-2023-08-16-20-06-20.png)

### 3.6 输入 ‘sql语句中字符串用单引号’

输入转postgis的geometry类型

![](img/PostGIS入门/img-2023-08-16-20-06-08.png)
### 3.7 再次输出为wkt类型

![](img/PostGIS入门/img-2023-08-16-20-05-14.png)

### 3.8 再转为geojson。可以多次嵌套转换格式

 
![](img/PostGIS入门/img-2023-08-16-20-05-34.png)
官方文档的8.8 /8.9节可查格式

## 四、补充

    三维几何点

    WKT、 WKB 和 EWKT、 EWKB 

    自动解析与类型转换

### 4.1 WKT只能支持二维格式，因此postgis提供了新的格式支持三维，并且加入了三维坐标ID的定义- EWKT，EWKB，与最新的格式规范的区别是多了ID定义。

### 4.2 st_makepoint()构造EWKT三维点 帮助文档8.3.5章

![](img/PostGIS入门/img-2023-08-16-20-06-40.png)

### 4.3 坐标SRID

![](img/PostGIS入门/img-2023-08-16-20-06-49.png)

### 4.4 去掉Z 也是可以查到的 但是去掉SRID不行

![](img/PostGIS入门/img-2023-08-16-20-06-57.png)

### 4.5 类型转换，允许直接把某种格式解析到几何，8.1.3 章节

![](img/PostGIS入门/img-2023-08-16-20-07-04.png)

### 4.6 需要明确的类型转换，在后面加上：：


![](img/PostGIS入门/img-2023-08-16-20-07-11.png)


![](img/PostGIS入门/img-2023-08-16-20-07-22.png)

### 4.7 加上SRID
![](img/PostGIS入门/img-2023-08-16-20-07-26.png)


### 4.8 自动解析，直接解析输入成geometry并且转为wkt

![](img/PostGIS入门/img-2023-08-16-20-07-34.png)



## 五、几何（Geometry）

有别于 geography， geometry 是更普遍意义上的几何图形(点、线、面)，原则上是笛卡尔空间直角坐标系：而 geography 类型的数据则定义在地球椭球体表面的经纬度上。

可以互相转换，但是在特殊计算时有明显区别。

几何是某一个地理对象的形状，即空间部分，非空间信息部分是普通属性数据。

### 5.1 简单几何的构造 （8.3章节）

• 点-线串-多边形-几何集

• 特殊的几何构造

还有一批输入函数可以创建几何: ST_Point；ST_MakePoint；ST LineFromMultiPoint；ST_MakeLine;ST MakePolygon；ST_Polygon

### 5.2 点串线

![](img/PostGIS入门/img-2023-08-16-20-07-47.png)
### 5.3 自动解析 换成wkt的点，仍然可以执行

![](img/PostGIS入门/img-2023-08-16-20-07-53.png)

### 5.4 几何集（Collection） 把一堆几何放到一个几何里面输出

![](img/PostGIS入门/img-2023-08-16-20-07-59.png)

### 5.5 范围框 ST_MakeEnvelope （8.3.3）

由四个xy的最大最小值+坐标系，输出范围框

![](img/PostGIS入门/img-2023-08-16-20-08-07.png)

### 5.6 输出EWKT

![](img/PostGIS入门/img-2023-08-16-20-08-13.png)

### 5.7 Web墨卡托 瓦片计算范围 ST_TileEnvelope（8.3.10）

缩放等级为2时，X方向的第一个，Y方向的第一个瓦片

给出四个角点的坐标

![](img/PostGIS入门/img-2023-08-16-20-08-22.png)



