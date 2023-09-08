代码：
```html

<template>
  <div class="container">
    <div id="map">
      <div class="btnbox">
        <div class="flow" @click="flow">
          <img class="" src="../../assets/images/liuliang.png" alt="流量" />
          <div class="tips">
            流量告警
            <p class="animated bounce">5</p>
            处
          </div>
          <!-- <p></p> -->
        </div>
        <div class="rainfall" @click="rainfall">
          <img class="" src="../../assets/images/yuliang.png" alt="雨量" />
          <!-- <p></p> -->
          <div class="tips">
            雨量告警
            <p class="animated bounce">5</p>
            处
          </div>
        </div>
        <div class="stage" @click="stage">
          <img class="" src="../../assets/images/shuiwei.png" alt="水位" />
          <!-- <p></p> -->
          <div class="tips">
            水位告警
            <p class="animated bounce">5</p>
            处
          </div>
        </div>
      </div>
      <div class="legendbox" v-if="isExample" :style="[{ right: rightwidth ? 32.5 + 'rem' : 20 + 'px' }]">
        <div class="legend">
          <div>图例</div>
        </div>
        <div class="line"></div>
        <div class="listbox">
          <el-checkbox label="yuliang" v-model="yuliang" @change="changeyuliang">
            <div class="content">
              <div class="icon yuliang"></div>
              <div class="name">雨量站</div>
            </div>
          </el-checkbox>
          <el-checkbox label="dxskdw" v-model="dxskdw" @change="changedxskdw">
            <div class="content">
              <div class="icon yuliang"></div>
              <div class="name">大型水库点位</div>
            </div>
          </el-checkbox>
          <el-checkbox label="hedao" v-model="hedao" @change="changehedao">
            <div class="content">
              <div class="icon shuizhi"></div>
              <div class="name">河道</div>
            </div>
          </el-checkbox>
          <el-checkbox label="shuiwang" v-model="shuiwang" @change="changeshuiwang">
            <div class="content">
              <div class="icon shuizhi"></div>
              <div class="name">水网</div>
            </div>
          </el-checkbox>
          <el-checkbox label="lybj" v-model="lybj" @change="changelybj">
            <div class="content">
              <div class="icon liuliang"></div>
              <div class="name">流域边界</div>
            </div>
          </el-checkbox>
          <el-checkbox label="shuiku" v-model="shuiku" @change="changeshuiku">
            <div class="content">
              <div class="icon qushui"></div>
              <div class="name">水库</div>
            </div>
          </el-checkbox>
          <el-checkbox label="shuiwenzhan" v-model="shuiwenzhan" @change="changeswz">
            <div class="content">
              <div class="icon jiankong"></div>
              <div class="name">水文站</div>
            </div>
          </el-checkbox>
          <el-checkbox label="zhaba" v-model="zhaba" @change="changezhaba">
            <div class="content">
              <div class="icon shuiwei"></div>
              <div class="name">闸把</div>
            </div>
          </el-checkbox>
          <el-checkbox label="zdfzc" v-model="zdfzc" @change="changezdfzc">
            <div class="content">
              <div class="icon shuiwei"></div>
              <div class="name">重点防治村</div>
            </div>
          </el-checkbox>
          <!-- <el-checkbox
            label="zdfzcfw"
            v-model="zdfzcfw"
            @change="changezdfzcfw"
          >
            <div class="content">
              <div class="icon shuiwei"></div>
              <div class="name">重点防治村范围</div>
            </div>
          </el-checkbox> -->
          <!-- <el-checkbox label="zyjz" v-model="zyjz" @change="changezyjz">
            <div class="content">
              <div class="icon shuiwei"></div>
              <div class="name">重要集镇</div>
            </div>
          </el-checkbox> -->
        </div>
      </div>
      <div class="mapbottom" :style="[{ right: rightwidth ? 32.5 + 'rem' : 20 + 'px' }]">
        <div class="switch" v-if="isSites">
          <div v-for="(item, index) in mapway" :key="index" @click="switchWay(index)"
            :class="mapwayIndex == index ? 'active' : ''">
            {{ item }}
          </div>
        </div>
        <div class="site">
          <img @click="showSites" src="../../assets/images/site.png" alt="定位" />
        </div>
        <div class="example">
          <div @click="showExample">例</div>
        </div>
      </div>
      <div class="coordinate" :style="[{ left: leftwidth ? 32.5 + 'rem' : 20 + 'px' }]">
        <div>{{ coordinate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import Icon from "./Marker.png";
import icon1 from "leaflet/dist/images/marker-icon.png";
export default {
  props: ["leftwidth", "rightwidth"],
  data() {
    return {
      // 地图
      map: null,
      // 地图展示形式
      mapway: ["电子地图", "地形图"],
      mapwayIndex: 1,
      // 当前经纬度
      coordinate: "经度:" + 36.5 + " " + "纬度：" + 119.5,
      yuliang: false,
      // 闸把
      zhaba: false,
      zhabaGroup: null,
      layers: [],
      myGroup: null,
      // 大型水库点位
      dxskdw: false,
      dxskdwGroup: null,
      yllayers: [],
      ylGroup: null,
      // 河道
      hedao: false,
      hedaoGroup: null,
      szlayers: [],
      szGroup: null,
      // 流域边界
      lybj: false,
      lybjGroup: null,
      lllayers: [],
      llGroup: null,
      // 水库
      shuiku: false,
      shuikuGroup: null,
      qslayers: [],
      qsGroup: null,
      //  雨量站
      // yuliangzhan: false,
      ylzGroup: null,
      // 水文站
      shuiwenzhan: false,
      swzGroup: null,
      jklayers: [],
      jkGroup: null,
      //重点防治村
      zdfzc: false,
      zdfzcGroup: null,
      //水网
      shuiwang: false,
      shuiwangGroup: null,
      //重点防治村范围
      zdfzcfw: false,
      zdfzcfwGroup: null,
      //重要集镇
      zyjz: false,
      zyjzGroup: null,
      // 流量警报
      isflow: false,
      flowlayers: [],
      flowGroup: null,
      // 雨量警报
      israinfall: false,
      rainfalllayers: [],
      rainfallGroup: null,
      // 水位警报
      isstage: false,
      stagelayers: [],
      stageGroup: null,
      // 图例
      isExample: false,
      isSites: false,
      geojson: {
        // 贴入GeoJSON对象
      },
    };
  },
  created() {
    window.showDetail = this.showDetail;
  },
  mounted() {
    this.getMap();
    this.addLayers();
    this.mouseLight();
  },
  methods: {
    //鼠标移动高亮
    mouseLight() {
      this.map.on("mousemove ", function (e) {
        // //移动位置处的坐标
        // var coordinate2 = e.latlng;
        // console.log(coordinate2);
      });
    },
    loadwfs(URL, LAYER) {
      let url = URL;
      const layer = LAYER;
      const params = {
        service: "WFS",
        version: "1.1.0",
        request: "GetFeature",
        typeName: layer,
        outputFormat: "application/json",
        srsName: "EPSG:4326",
      };
      const url_str = url + L.Util.getParamString(params, url);
      var _this = this;
      axios({
        method: "get",
        url: url_str,
        responseType: "json",
      }).then((res) => {
        this.geojson = res.data;
        console.log(this.geojson.features[0]);
        const myIcon = L.icon({
          iconUrl: icon1,
          iconAnchor: [10, 41],
        });

        const geojsonLayer = L.geoJSON(this.geojson, {
          pointToLayer: function (feature, latlng) {
            const popupContent = _this.popupContent(feature, LAYER);
            const marker = L.marker(latlng, { icon: myIcon }).bindPopup(
              popupContent
            );

            return marker;
          },
        });
        if (LAYER === "xiaoliuyusiyu:shuiwenzhan") {
          // const clusters = L.markerClusterGroup({
          this.swzGroup = L.markerClusterGroup({
            maxClusterRadius: 80,
            disableClusteringAtZoom: 14,
            iconCreateFunction: function (cluster) {
              return L.divIcon({
                html:
                  '<img style="width:48px;height:48px" src="' +
                  Icon +
                  '">' +
                  cluster.getChildCount(),
                className: "marker-cluster",
                iconSize: L.point(40, 40),
              });
            },
          });
          this.swzGroup.addLayer(geojsonLayer);
          this.map.addLayer(this.swzGroup);
        } else if (LAYER === "xiaoliuyusiyu:yuliangzhan") {
          this.ylzGroup = L.markerClusterGroup({
            maxClusterRadius: 80,
            disableClusteringAtZoom: 14,
            iconCreateFunction: function (cluster) {
              return L.divIcon({
                html:
                  '<img style="width:48px;height:48px" src="' +
                  Icon +
                  '">' +
                  cluster.getChildCount(),
                className: "marker-cluster",
                iconSize: L.point(40, 40),
              });
            },
          });
          this.ylzGroup.addLayer(geojsonLayer);
          this.map.addLayer(this.ylzGroup);
        } else if (LAYER === "xiaoliuyusiyu:zhaba") {
          this.zhabaGroup = L.markerClusterGroup({
            maxClusterRadius: 0,
            disableClusteringAtZoom: 14,
            iconCreateFunction: function (cluster) {
              return L.divIcon({
                html:
                  '<img style="width:48px;height:48px" src="' +
                  Icon +
                  '">' +
                  cluster.getChildCount(),
                className: "marker-cluster",
                iconSize: L.point(40, 40),
              });
            },
          });
          this.zhabaGroup.addLayer(geojsonLayer);
          this.map.addLayer(this.zhabaGroup);
        } 
      });
    },

    popupContent(feature, layername) {
      var content = "";
      if (layername === "xiaoliuyusiyu:shuiwenzhan") {
        content = `
        <div>测站名：${feature.properties.测站名}</div>
        <div>测站编：${feature.properties.测站编}</div>
        <div>流域_区：${feature.properties.流域_区}</div>
        <div>水系：${feature.properties.水系}</div>
        <div>河流：${feature.properties.河流}</div>
        <div>测站地：${feature.properties.测站地}</div>
        <div>测站__17：${feature.properties.测站__17}</div>
        <div>测站__18：${feature.properties.测站__18}</div>
        <div>测站__19：${feature.properties.测站__19}</div>
        <div>测站__20：${feature.properties.测站__20}</div>
      `;
      } else if (layername === "xiaoliuyusiyu:yuliangzhan") {
        content = `
        <div>测站名：${feature.properties.测站名}</div>
        <div>测站编：${feature.properties.测站编}</div>
        <div>流域_区：${feature.properties.流域_区}</div>
        <div>测站地：${feature.properties.测站地}</div>
        <div>测站_1：${feature.properties.测站_1}</div>
        <div>测站_12；${feature.properties.测站_12}</div>
        <div>测站__13：${feature.properties.测站__13}</div>
        <div>测站__14：${feature.properties.测站__14}</div>

      `;
      } else if (layername === "xiaoliuyusiyu:zhaba") {
        content = `
        <div>name：${feature.properties.name}</div>
        <div>所在市：${feature.properties.所在市}</div>
        <div>所在县：${feature.properties.所在县}</div>
      `;
      } else if (layername === "xiaoliuyusiyu:wa_sys") {
        content = `
        <div>riv_id：${feature.properties.riv_id}</div>
        <div>河流段名：${feature.properties.河流_段_名}</div>
        <div>河流等级：${feature.properties.河流等级}</div>
      `;
      }

      return content;
    },
    //加载数据1
    addLayers() {
      var shandongshijie = L.tileLayer.wms(
        "http://192.168.16.89:7074/geoserver/wms?authkey=bd1c862a5d58adf31b675210fb831bb2",
        {
          layers: "xiaoliuyusiyu:shandongshijie", // 要加载的图层名
          format: "image/png", //返回的数据格式
          transparent: true,
          crs: L.CRS.epsg4326,
        }
      );
      this.map.addLayer(shandongshijie);
    },
    // 地图
    getMap() {
      let map = L.map("map", {
        crs: L.CRS.EPSG4326,
        center: [36.5, 119.5],
        maxZoom: 17,
        minZoom: 5,
        zoom: 7,
        // 缩放按钮
        zoomControl: false,
        // 右下角版权
        attributionControl: false,
        // 禁用双击
        doubleClickZoom: false,
        closePopupOnClick: false,
      });
      this.map = map;
      L.supermap
        .tiandituTileLayer({
          layerType: this.mapwayIndex == 1 ? "ter" : "img",
          key: "55c172ba397d8de2a0259f800427e50d",
        })
        .addTo(map);
      L.supermap
        .tiandituTileLayer({
          layerType: this.mapwayIndex == 1 ? "ter" : "img",
          isLabel: true,
          key: "55c172ba397d8de2a0259f800427e50d",
        })
        .addTo(map);
      // 隐藏右下角logo
      document.getElementsByClassName("iclient-leaflet-logo")[0].style.display =
        "none";

      map.on("mousemove", (e) => {
        this.coordinate =
          "经度:" +
          e.latlng.lng.toFixed(2) +
          " " +
          "纬度：" +
          e.latlng.lat.toFixed(2);
      });
    },
    //水网
    changeshuiwang(e) {
      const url =
        "http://192.168.16.89:7074/geoserver/XXSK_ztt/ows?authkey=74492cb3559438242760f24251062ddd";
      const params = {
        service: "WFS",
        version: "1.1.0",
        request: "GetFeature",
        typeName: "XXSK_ztt:wa_sys",
        outputFormat: "application/json",
        srsName: "EPSG:4326",
      };
      const url_str = url + L.Util.getParamString(params, url);
      console.log(url_str);
      if (e) {
        axios({
          method: "get",
          url: url_str,
          responseType: "json",
        }).then((res) => {
          this.geojson = res.data;
          console.log(this.geojson.features);
          var _this = this
          const geojsonLayer = L.geoJSON(this.geojson, {
            style: {
              color: "#2f8ffc", //外边框颜色
              fillOpacity: 1, //填充透明度
            },
            onEachFeature: (feature, layer) => {
              const content = _this. popupContent(feature, "xiaoliuyusiyu:wa_sys")
              layer.on({
                //鼠标移入方法
                mouseover: (e) => {
                  var layer = e.target;
                  //点击的时候给每个layer的name赋值，如果为空就有鼠标移上去的效果，如果不为空就无鼠标 移入的效果;
                  if (e.target.name == undefined) {
                    layer.setStyle({
                      weight: 3,
                      color: "#FF0000",
                      fillOpacity: 1,
                    });
                  }
                  if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                  }
                },
                //鼠标移出方法
                mouseout: (e) => {
                  var layer = e.target;
                  if (e.target.name == undefined) {
                    layer.setStyle({
                      color: "#2f8ffc", //外边框颜色
                      fillOpacity: 1, //填充透明度
                    });
                  }
                },
              }).bindPopup(content);
            },
          }).addTo(this.map);

 
          // this.shuiwangGroup.addLayer([geojsonLayer]);
          // this.map.addLayer(this.shuiwangGroup);
        });
      } else {
        if (this.shuiwangGroup) {
          this.shuiwangGroup.clearLayers();
        }
      }
    },
    changezhaba(e) {
      if (e) {
        this.loadwfs(
          "http://192.168.16.89:7074/geoserver/xiaoliuyusiyu/ows",
          "xiaoliuyusiyu:zhaba"
        );
      } else {
        if (this.zhabaGroup) {
          this.zhabaGroup.clearLayers();
        }
      }
    },
    changeyuliang(e) {
      if (e) {
        // this.loadwfs(
        //   "http://192.168.16.89:7074/geoserver/xiaoliuyusiyu/ows",
        //   "xiaoliuyusiyu:yuliangzhan"
        // );
      } else {
        if (this.ylzGroup) {
          this.ylzGroup.clearLayers();
        }
      }
    },
    changedxskdw(e) {
      var dxskdw = L.tileLayer.wms("http://192.168.16.89:7074/geoserver/wms", {
        layers: "xiaoliuyusiyu:daxingshuikudianwei", // 要加载的图层名
        format: "image/png", //返回的数据格式
        transparent: true,
        crs: L.CRS.epsg4326,
      });
      if (e) {
        this.dxskdwGroup = L.layerGroup([dxskdw]);
        this.map.addLayer(this.dxskdwGroup);
      } else {
        if (this.dxskdwGroup) {
          this.dxskdwGroup.clearLayers();
        }
      }
    },
    changehedao(e) {
      var hedao = L.tileLayer.wms("http://192.168.16.89:7074/geoserver/wms", {
        layers: "xiaoliuyusiyu:hedao", // 要加载的图层名
        format: "image/png", //返回的数据格式
        transparent: true,
        crs: L.CRS.epsg4326,
      });
      if (e) {
        this.hedaoGroup = L.layerGroup([hedao]);
        this.map.addLayer(this.hedaoGroup);
      } else {
        if (this.hedaoGroup) {
          this.hedaoGroup.clearLayers();
        }
      }
    },
    changelybj(e) {
      var liuyubianjie = L.tileLayer.wms(
        "http://192.168.16.89:7074/geoserver/wms",
        {
          layers: "xiaoliuyusiyu:liuyubianjie", // 要加载的图层名
          format: "image/png", //返回的数据格式
          transparent: true,
          crs: L.CRS.epsg4326,
        }
      );
      if (e) {
        this.lybjGroup = L.layerGroup([liuyubianjie]);
        this.map.addLayer(this.lybjGroup);
      } else {
        if (this.lybjGroup) {
          this.lybjGroup.clearLayers();
        }
      }
    },
    changeshuiku(e) {
      var shuiku = L.tileLayer.wms("http://192.168.16.89:7074/geoserver/wms", {
        layers: "xiaoliuyusiyu:shuiku", // 要加载的图层名
        format: "image/png", //返回的数据格式
        transparent: true,
        crs: L.CRS.epsg4326,
      });
      if (e) {
        this.shuikuGroup = L.layerGroup([shuiku]);
        this.map.addLayer(this.shuikuGroup);
      } else {
        if (this.shuikuGroup) {
          this.shuikuGroup.clearLayers();
        }
      }
    },
    changeswz(e) {
      if (e) {
        this.loadwfs(
          "http://192.168.16.89:7074/geoserver/xiaoliuyusiyu/ows",
          "xiaoliuyusiyu:shuiwenzhan"
        );
      } else {
        if (this.swzGroup) {
          this.swzGroup.clearLayers();
        }
      }
    },
    changezdfzc(e) { },
    changezdfzcfw(e) {
      var zdfzcfw = L.tileLayer.wms("http://192.168.16.89:7074/geoserver/wms", {
        layers: "xiaoliuyusiyu:zhongdianfangzhicunfanwei", // 要加载的图层名
        format: "image/png", //返回的数据格式
        transparent: true,
        crs: L.CRS.epsg4326,
      });
      if (e) {
        this.zdfzcfwGroup = L.layerGroup([zdfzcfw]);
        this.map.addLayer(this.zdfzcfwGroup);
      } else {
        if (this.zdfzcfwGroup) {
          this.zdfzcfwGroup.clearLayers();
        }
      }
    },
    changezyjz(e) { },

    // 流量警报
    flow() {
      this.isflow = !this.isflow;
      this.israinfall = false;
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.14, 88.76],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.07, 88.74],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.14, 88.66],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.18, 88.47],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.98, 88.43],
        },
      ];
      let temp;
      if (this.isflow) {
        this.liuliang = true;
        this.changeliuliang(true);
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/circular.png"),
              iconSize: [26, 26],
              shadowSize: [26, 26],
              iconAnchor: [18, 18],
            }),
          });

          this.flowlayers.push(temp);
        });

        this.flowGroup = L.layerGroup(this.flowlayers);
        this.map.addLayer(this.flowGroup);
      } else {
        if (this.flowGroup) {
          this.liuliang = false;
          this.changeliuliang(false);
          this.flowGroup.clearLayers();
        }
      }
    },
    // 雨量警报
    rainfall() {
      this.israinfall = !this.israinfall;
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.53, 88.08],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.62, 88.05],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.68, 88.1],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.7, 88.24],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.84, 88.21],
        },
      ];
      let temp;
      if (this.israinfall) {
        this.yuliang = true;
        this.changeyuliang(true);
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/circular.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          });

          this.rainfalllayers.push(temp);
        });

        this.rainfallGroup = L.layerGroup(this.rainfalllayers);
        this.map.addLayer(this.rainfallGroup);
      } else {
        if (this.rainfallGroup) {
          this.yuliang = false;
          this.changeyuliang(false);
          this.rainfallGroup.clearLayers();
        }
      }
    },
    // 水位警报
    stage() {
      this.isstage = !this.isstage;
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.96, 88.18],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.36, 88.56],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.36, 88.75],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.43, 88.26],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.34, 88.14],
        },
      ];
      let temp;
      if (this.isstage) {
        this.shuiwei = true;
        // this.changeshuiwei(true);
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/circular.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          });

          this.stagelayers.push(temp);
        });

        this.stageGroup = L.layerGroup(this.stagelayers);
        this.map.addLayer(this.stageGroup);
      } else {
        if (this.stageGroup) {
          this.shuiwei = false;
          // this.changeshuiwei(false);
          this.stageGroup.clearLayers();
        }
      }
    },
    switchWay(e) {
      this.mapwayIndex = e;
      L.supermap
        .tiandituTileLayer({
          layerType: this.mapwayIndex == 1 ? "ter" : "img",
          key: "55c172ba397d8de2a0259f800427e50d",
        })
        .addTo(this.map);
      L.supermap
        .tiandituTileLayer({
          layerType: this.mapwayIndex == 1 ? "ter" : "img",
          isLabel: true,
          key: "55c172ba397d8de2a0259f800427e50d",
        })
        .addTo(this.map);
    },

    changeshuizhi(e) {
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.32, 88.96],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.31, 88.09],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.33, 88.28],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.31, 88.48],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.58, 88.3],
        },
      ];
      let temp;
      if (e) {
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/shuizhi.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          }).bindPopup(
            `<div class="popbox">
                <div class="poptitle">
                  <div class="titlebox">
                    <div> ${v.title} </div>
                    <div onclick="showDetail('sz')">查看详情</div>
                  </div>
                  <p></p>
                </div>
                <div class="content">
                  <div>所属水系：${v.shuixi}</div>
                  <div>生态流量控制指标：37m³/s</div>
                  <div>实时流量：42.3m³/s</div>
                </div>
              </div>`
          );

          this.szlayers.push(temp);
        });

        this.szGroup = L.layerGroup(this.szlayers);
        this.map.addLayer(this.szGroup);
      } else {
        if (this.szGroup) {
          this.szGroup.clearLayers();
        }
      }
    },
    changeliuliang(e) {
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.14, 88.76],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.07, 88.74],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.14, 88.66],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.18, 88.47],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.98, 88.43],
        },
      ];
      let temp;
      if (e) {
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/liuliang2.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          }).bindPopup(
            `<div class="popbox">
                <div class="poptitle">
                  <div class="titlebox">
                    <div> ${v.title} </div>
                    <div onclick="showDetail('ll')">查看详情</div>
                  </div>
                  <p></p>
                </div>
                <div class="content">
                  <div>所属水系：${v.shuixi}</div>
                  <div>生态流量控制指标：37m³/s</div>
                  <div>实时流量：42.3m³/s</div>
                </div>
              </div>`
          );

          this.lllayers.push(temp);
        });

        this.llGroup = L.layerGroup(this.lllayers);
        this.map.addLayer(this.llGroup);
      } else {
        if (this.llGroup) {
          this.llGroup.clearLayers();
        }
      }
    },
    changequshui(e) {
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.78, 88.9],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.85, 88.81],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.76, 88.16],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.58, 88.28],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.83, 88.02],
        },
      ];
      let temp;
      if (e) {
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/qushui.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          }).bindPopup(
            `<div class="popbox">
                <div class="poptitle">
                  <div class="titlebox">
                    <div> ${v.title} </div>
                    <div onclick="showDetail('qs')">查看详情</div>
                  </div>
                  <p></p>
                </div>
                <div class="content">
                  <div>所属水系：${v.shuixi}</div>
                  <div>生态流量控制指标：37m³/s</div>
                  <div>实时流量：42.3m³/s</div>
                </div>
              </div>`
          );

          this.qslayers.push(temp);
        });

        this.qsGroup = L.layerGroup(this.qslayers);
        this.map.addLayer(this.qsGroup);
      } else {
        if (this.qsGroup) {
          this.qsGroup.clearLayers();
        }
      }
    },
    changejiankong(e) {
      let list = [
        {
          title: "监测点21",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.18, 88.01],
        },
        {
          title: "监测点22",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.2, 88.23],
        },
        {
          title: "监测点23",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.1, 88.31],
        },
        {
          title: "监测点24",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.99, 88.58],
        },
        {
          title: "监测点25",
          shuixi: "多雄藏布",
          zhibiao: "37m³/s",
          liuliang: "42.3m³/s",
          points: [29.13, 88.55],
        },
      ];
      let temp;
      if (e) {
        list.forEach((v) => {
          temp = L.marker(v.points, {
            icon: new L.Icon({
              className: "lmap-icon",
              iconUrl: require("../../assets/images/jiankong.png"),
              iconSize: [22, 22],
              iconAnchor: [16, 16],
            }),
          }).bindPopup(
            `<div class="popbox">
                <div class="poptitle">
                  <div class="titlebox">
                    <div> ${v.title} </div>
                    <div onclick="showDetail('jk')">查看详情</div>
                  </div>
                  <p></p>
                </div>
                <div class="content">
                  <div>所属水系：${v.shuixi}</div>
                  <div>生态流量控制指标：37m³/s</div>
                  <div>实时流量：42.3m³/s</div>
                </div>
              </div>`
          );

          this.jklayers.push(temp);
        });

        this.jkGroup = L.layerGroup(this.jklayers);
        this.map.addLayer(this.jkGroup);
      } else {
        if (this.jkGroup) {
          this.jkGroup.clearLayers();
        }
      }
    },
    showDetail(e) {
      if (e == "sw") {
        this.$parent.isStage = true;
        this.$nextTick(() => {
          this.$parent.showStage("0");
        });
      } else if (e == "yl") {
        this.$parent.isRainfall = true;
        this.$nextTick(() => {
          this.$parent.showRainfall("0");
        });
      } else if (e == "sz") {
        this.$parent.isQuality = true;
        this.$nextTick(() => {
          this.$parent.showQuality("0");
        });
      } else if (e == "ll") {
        this.$parent.isDischarge = true;
        this.$nextTick(() => {
          this.$parent.showDischarge("0");
        });
      } else if (e == "qs") {
        this.$parent.isIntaking = true;
        this.$nextTick(() => {
          this.$parent.showIntake("0");
        });
      } else if (e == "jk") {
      }
    },
    showExample() {
      this.isExample = !this.isExample;
    },
    showSites() {
      this.isSites = !this.isSites;
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}

.btnbox {
  // width: 100%;
  // height: 100%;
  // position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  position: absolute;
  left: 0px;
  top: 0;
  right: 0;

  .flow,
  .rainfall,
  .stage {
    z-index: 401;
    width: 139px;
    height: 38px;
    position: relative;
    cursor: pointer;
    margin: 0 20px;

    img {
      width: 100%;
      height: 100%;
    }

    .tips {
      position: absolute;
      bottom: 5px;
      left: 45px;
      line-height: 16px;
      font-size: 16px;
      color: #fff;
      white-space: nowrap;

      span,
      p {
        font-size: 32px;
        color: red;
        display: inline-block;
      }
    }

    // p {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 30px;
    //   line-height: 16px;
    //   font-size: 16px;
    //   color: #fff;
    // }
  }
}

.legendbox {
  z-index: 401;
  position: absolute;
  // right: 28%;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  background-color: rgba($color: #1253b6, $alpha: 0.9);
  width: 180px;

  .legend {
    font-size: 20px;
    line-height: 20px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    padding: 12px 0;
  }

  .line {
    background-image: url("../../assets/images/line.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    width: 100%;
    height: 11px;
  }

  .listbox {
    display: flex;
    flex-direction: column;
    padding: 3px 22px 12px;

    .el-checkbox {
      display: flex;
      align-items: center;
    }

    .content {
      display: flex;
      align-items: center;
      color: #fff;
      padding: 8px 0;

      .icon {
        width: 21px;
        height: 21px;
        margin-right: 6px;
        background-size: 100%;

        &.shuiwei {
          background-image: url("../../assets/images/shuiwei2.png");
        }

        &.yuliang {
          background-image: url("../../assets/images/yuliang2.png");
        }

        &.shuizhi {
          background-image: url("../../assets/images/shuizhi.png");
        }

        &.liuliang {
          background-image: url("../../assets/images/liuliang2.png");
        }

        &.qushui {
          background-image: url("../../assets/images/qushui.png");
        }

        &.jiankong {
          background-image: url("../../assets/images/jiankong.png");
        }
      }

      .name {
        font-size: 16px;
        line-height: 16px;
        color: #fff;
      }
    }
  }
}

.mapbottom {
  z-index: 401;
  position: absolute;
  // right: 28%;
  bottom: 10px;
  display: flex;
  align-items: center;

  .switch {
    display: flex;
    align-items: center;
    background-color: #1253b6;
    padding: 0 6px;
    background-image: url("../../assets/images/miniline.png");
    background-repeat: no-repeat;
    background-position: 107px center;
    height: 37px;

    div {
      color: #fff;
      font-size: 16px;
      line-height: 16px;
      padding: 6px 16px;

      &:nth-child(1) {
        //   border-right: 1px solid #fff;
        margin-right: 5px;
      }

      &:nth-child(2) {
        margin-left: 5px;
      }

      &.active {
        background-color: #0078ff;
      }
    }
  }

  .site {
    width: 37px;
    height: 37px;
    background-color: #2e6cc0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
    cursor: pointer;
  }

  .example {
    width: 37px;
    height: 37px;
    background-color: #2e6cc0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
}

.coordinate {
  z-index: 401;
  position: absolute;
  // left: 28%;
  bottom: 10px;
  display: flex;
  align-items: center;
  background-color: rgba($color: #1253b6, $alpha: 0.9);

  div {
    font-size: 13px;
    line-height: 13px;
    color: #fff;
    padding: 5px 15px;
  }
}

::v-deep .leaflet-popup-content-wrapper,
::v-deep .leaflet-popup-tip {
  border: 1px solid #4ce0db;
  background-color: rgba($color: #1253b6, $alpha: 0.8);
  color: #fff;
}

::v-deep .leaflet-popup-tip {
  position: fixed;
  border-left: transparent;
  border-top: transparent;
  left: 50%;
  bottom: 0;
  margin-left: -13px;
  margin-bottom: -7px;
  box-shadow: none;
  background-color: rgba($color: #1253b6, $alpha: 0.8);
}

::v-deep .leaflet-popup-content {
  .popbox {
    .poptitle {
      .titlebox {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
          font-size: 16px;
          line-height: 16px;

          &:nth-child(2) {
            cursor: pointer;
          }
        }
      }

      p {
        background-color: #37f3ff;
        margin: 8px 0 6px -19px;
        width: 90px;
        height: 1px;
      }
    }

    .content {
      div {
        font-size: 14px;
        line-height: 14px;
        padding: 6px 0;
      }
    }
  }
}
</style>


```