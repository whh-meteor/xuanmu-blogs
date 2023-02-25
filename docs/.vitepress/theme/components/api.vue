<script  >
import axios from "axios";
// var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
// //https://cdn.jsdelivr.net/gh/fz6m/china-lantern@1.1/dist/china-lantern.min.js
//         httpRequest.open('GET', 'https://api.vvhan.com/api/yinghua', true);//第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
//         httpRequest.send();//第三步：发送请求  将请求参数写在URL中
//         /**
//          * 获取数据后的处理程序
//          */
//         httpRequest.onreadystatechange = function () {
//             if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//                 var json = httpRequest.responseText;//获取到json字符串，还需解析
//                 console.log(json);
//             }
//         };

export default {
   mounted:function (){

      this.getdata();

    },
  methods: {
    
    getdata() {
      axios
         
        .get("https://api.vvhan.com/api/yinghua")
         
        .then((data) => {
          console.log(data);
        })
         
        .catch((err) => {
          console.log(err);
        });
    },
   
  },
};
</script>

<template>
<div>
 123
</div>

</template>

<style>
 
</style>