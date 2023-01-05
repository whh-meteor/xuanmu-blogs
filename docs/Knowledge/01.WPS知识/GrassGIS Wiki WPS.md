##  GrassGIS Wiki WPS

## 基于 GRASS 的 OGC Web 处理服务 (WPS) 标准实现
OGC Web 处理服务 (WPS) Web 处理服务接口标准提供了用于标准化如何将地理空间处理服务作为 Web 服务调用的输入和输出（请求和响应）的规则。
GRASS GIS 可在多个 WPS 服务框架中用作后端。

## 链接到 WPS 服务器
已经开发了一个框架来尽可能轻松地将 GRASS GIS 7 集成到 WPS 服务器中。该框架称为 wps-grass-bridge，可在此处获得：
- wps-grass-bridge: http://code.google.com/p/wps-grass-bridge/
该框架目前支持 PyWPS、ZOO WPS，并被 52North WPS 服务器使用。许多 GRASS GIS 7 模块可以开箱即用。
目前还有其他几种 WPS 实现使用 GRASS 作为 GIS 主干：
- PyWPS: http://pywps.wald.intevation.org/
- PyWPS 和 wps-grass-bridge 连接器: http://code.google.com/p/wps-grass-bridge/wiki/PyWPS_Integration
- Gallery (http://pywps.wald.intevation.org/gallery/index.html 活生生的例子)
- PyWPS 和 GRASS Wiki: http://pywps.wikispaces.com/GRASS
- WPS by 52N: http://52north.org/maven/project-sites/wps/52n-wps-site/
- 开箱即用连接到 GRASS: http://52north.org/maven/project-sites/wps/52n-wps-webapp/
- 52N-WPS-GRASS Demo     http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService?REQUEST=GetCapabilities&SERVICE=WPS&VERSION=1.0.0
- ZOO 项目 - 开放 OSW 平台：http://www.zoo-project.org/
- ZOO-WPS with GRASS and QGIS](http://zoo-project.org/trac/wiki/ZooWebSite/QGIS_WPS_Client)
- R and WPS: WPS class

## GRASS 7 内部
在 GRASS7 中，可以使用选项“--wps-process-description”自动生成 WPS 进程描述。见公告http://lists.osgeo.org/pipermail/grass-dev/2009-November/047133.html。

例子：

`r.grow --wps-process-description`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<wps:ProcessDescriptions xmlns:wps="http://www.opengis.net/wps/1.0.0"
xmlns:ows="http://www.opengis.net/ows/1.1"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.opengis.net/wps/1.0.0
 http://schemas.opengis.net/wps/1.0.0/wpsDescribeProcess_response.xsd"
 service="WPS" version="1.0.0" xml:lang="en-US">
        <ProcessDescription wps:processVersion="1" storeSupported="true" statusSupported="true">
                <ows:Identifier>r.grow</ows:Identifier>
                <ows:Title>Generates a raster map layer with contiguous areas grown by one cell.</ows:Title>
                <ows:Abstract>The manual page of this module is available here: http://grass.osgeo.org/grass70/manuals/html70_user/r.grow.html</ows:Abstract>
                <ows:Metadata xlink:title="raster" />
                <DataInputs>
                        <Input minOccurs="1" maxOccurs="1">
                                <ows:Identifier>input</ows:Identifier>
                                <ows:Title>Name of input raster map</ows:Title>
                                <ComplexData maximumMegabytes="2048">
                                        <Default>
                                                <Format>
                                                        <MimeType>image/tiff</MimeType>
                                                </Format>
                                        </Default>
                                        <Supported>
                                                <Format>
                                                        <MimeType>image/tiff</MimeType>
                                                </Format>
[...]
                                                <Format>
                                                        <MimeType>application/x-netcdf</MimeType>
                                                </Format>
                                        </Supported>
                                </ComplexData>
                        </Input>
                        <Input minOccurs="0" maxOccurs="1">
                                <ows:Identifier>radius</ows:Identifier>
                                <ows:Title>Radius of buffer in raster cells</ows:Title>
                                <LiteralData>
                                        <ows:DataType ows:reference="xs:float">float</ows:DataType>
                                        <ows:AnyValue/>
                                        <DefaultValue>1.01</DefaultValue>
                                </LiteralData>
                        </Input>
                        <Input minOccurs="0" maxOccurs="1">
                                <ows:Identifier>metric</ows:Identifier>
[...]
                         </Input>
                        <Input minOccurs="0" maxOccurs="1">
                                <ows:Identifier>grass_band_number</ows:Identifier>
                                <ows:Title>Band to select for processing (default is all bands)</ows:Title>
                                <ows:Abstract>This parameter defines band number of the input raster files which should be processed. As default all bands are processed and used as single and multiple inputs for raster modules.</ows:Abstract>
                                <LiteralData>
                                        <ows:DataType ows:reference="xs:integer">integer</ows:DataType>
                                        <ows:AnyValue/>
                                </LiteralData>
                        </Input>
                </DataInputs>
                <ProcessOutputs>
                        <Output>
                                <ows:Identifier>output</ows:Identifier>
                                <ows:Title>Name for output raster map</ows:Title>
                                <ComplexOutput>
                                        <Default>
                                                <Format>
                                                        <MimeType>image/tiff</MimeType>
                                                </Format>
                                        </Default>
                                        <Supported>
                                                <Format>
                                                        <MimeType>image/tiff</MimeType>
                                                </Format>
[...]
                                                <Format>
                                                        <MimeType>application/x-netcdf</MimeType>
                                                </Format>
                                        </Supported>
                                </ComplexOutput>
                        </Output>
                </ProcessOutputs>
        </ProcessDescription>
</wps:ProcessDescriptions>
```
## WPS工作流程理念
外部栅格地图可以通过 r.external (https://grass.osgeo.org/grass70/manuals/r.external.html)直接链接到 GRASS 中，从而节省时间和磁盘空间。

此外，不再需要以内部 GRASS 格式存储结果 - 使用 r.external.out (https://grass.osgeo.org/grass70/manuals/r.external.out.html)将结果映射直接写入 GDAL 支持的格式。
准备工作

只需定义一组变量，即可自动使用 GRASS。请参阅此处了解 GRASS 和 Shell(https://grasswiki.osgeo.org/wiki/GRASS_and_Shell#Setting_the_variables) 设置以及 GRASS 和 Python(https://grasswiki.osgeo.org/wiki/GRASS_and_Python#Creating_Python_scripts_that_call_GRASS_functionality_from_outside)。
```  
# register (rather than import) a GeoTIFF file in GRASS GIS:
r.external input=terra_lst1km20030314.LST_Day.tif output=modis_celsius
 
# define output directory for files resulting from subsequent calculations:
r.external.out directory=$HOME/gisoutput/ format="GTiff"
 
# perform calculations (here: extract pixels > 20 deg C)
# store output directly as GeoTIFF file, hence add the .tif extension:
r.mapcalc "warm.tif = if(modis_celsius > 20.0, modis_celsius, null() )"
 
# cease GDAL output connection and turn back to write standard GRASS raster files:
r.external.out -r
 
# use the result elsewhere
qgis $HOME/gisoutput/warm.tif
```
## 参考:
- List of GRASS-WPS articles
- PyWPS GRASS GIS 7 and QGIS with WPS plugin in action
- PyWPS integration
## 视频：
- PyWPS GRASS GIS 7 and QGIS with WPS plugin in action
- Development of an Open Cloud GIS with GRASS GIS, PyWPS, the wps-grass-bridge and QGIS
## 历史记录：GRASSLinks 作为 WPS 的前身
GRASSLinks 最初由 Susan Huse 博士于 1994-98 年在环境规划和 GIS 研究计划 (REGIS) 中开发，在加州大学伯克利分校。据称这是第一个功能齐全的在线 GIS 软件包，可提供对环境和地理数据的公共领域访问。
OSU IPPC GRASSLinks 3.5beta：GRASS GIS 5.x 版的网络界面
OSU IPPC GRASSLinks 3.5beta: A web interface for GRASS GIS version 5.x