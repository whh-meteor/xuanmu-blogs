# 文件上传方法


## 1 纯JS
不使用HTML中的`<input>` ，但要使用文件虚拟路径，可以用tomecat解决
```js
···
   //设置路径
      const Step1Path = "http://172.31.41.119:8080/ILCSData/PAMC_Chain/Step1/";
      const file = ['out1.tif', 'out2.tif']
      //创建formdata
      this.formDataS2 = new FormData();
      var _fm2 = this.formDataS2
      console.log(_fm2)
      //循环读取两张图片
      for (let i = 0; i < 2; i++) {

        fetch(Step1Path + file[i]).then(response => {
          //相应为arrayBuffer格式
          return response.arrayBuffer();
        }).then(arrayBuffer => {
          //构建文件
          const file = new File([arrayBuffer], 'out' + [i + 1] + '.tif', { type: "image/tiff" });
          console.log(file)
          //添加到formdata中
          _fm2.append('img' + [i + 1], file);
          console.log(_fm2.getAll('img' + [i + 1]))
        }).catch(error => {
          console.log(error)
        });
      }
      console.log(_fm2.getAll('img1'))
      //URL
      let url = 'http://localhost:5008/PCA_KMeans'
      let headers = {
        'Content-Type': 'multipart/form-data'
      }
      setTimeout(() => {
        //发送请求
        this.$axios.post(url, _fm2, { headers: headers })
          .then(res => { console.log(res) })
          .catch(function (error) { console.log(error) })
      }, 1000);

```

## 2 html+ js
multiple 可以选择多个文件
```html
   <input
          id="upload_file"
          type="file"
          multiple
          @change="v_upload_files"
          directory
        />
```
```js

 console.log("执行上传!")
      let files = e.target.files
      console.log(files)
      let formData = new FormData()
      // formData重复的往一个值添加数据并不会被覆盖掉，可以全部接收到，可以通过formData.getAll('files')来查看所有插入的数据
      for (let i = 0; i < files.length; i++) {
        //同时上传两个文件，命名为img1和img2 配合后端接收文件
        formData.append('img' + [i + 1], files[i])
      }
      console.log(formData.getAll('img1'))
      //url
      let url = 'http://localhost:5050/cliptif'
      let headers = {
        'Content-Type': 'multipart/form-data'
      }

      //发送请求
      this.$axios.post(url, formData, { headers: headers })
        .then(res => {
          console.log(res)
          this.Step2()
        })
        .catch(function (error) { console.log(error) })
```


## 3 Form表单实现上传文件

```html

 <iframe
    src=""
    frameborder="0"
    name="frameName"
    style="display: none"
>
</iframe>

  <form 
    action="/PCA_KMeans" 
    method="post"
    target="frameName"
    enctype="multipart/form-data">
    <label>T1 IMAGE: <input type="file" name="img1" multiple><label>
    <br>
    <label>T2 IMAGE: <input type="file" name="img2" multiple></label>
    <button type="submit">Submit</button>
</form>
```

好处是不需要js，可以使用`target="frameName"`来避免页面跳转