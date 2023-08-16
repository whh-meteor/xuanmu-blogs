# 多文件上传
多个文件上传，element ui + vue + SpringBoot

## vue 

```html
  <!-- 文件上传 -->
   <el-form ref="dataForm" v-loading="formLoading" :model="temp" :inline="true" label-position="right" 
          label-width="80px" style="width: 630px; margin-left: 100px" >

          <el-form-item>
            <el-upload ref="upload" class="upload-files" action="" name="files" drag multiple :auto-upload="false"
              :file-list="fileList" :on-change="handleChange" style="display: inline;float:right;">
              <!-- <el-button slot="trigger" type="primary">选取文件</el-button> -->
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传tiff文件，且不超过1000M</div>
            </el-upload>
          </el-form-item>
        </el-form>
```


## data 

```js
  data() {
    return {//  header: { Authorization: token },
      uploading: false,
      formLoading: false,

      fileList: [],
      temp: {
        id: void 0,
        fileName: '',
        fileType: void 0
      },
    }}
```


## methods
```js
// methods方法
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    submitUpload() {
      const formData = new FormData()
      this.fileList.forEach(item => {
        formData.append('files', item.raw)
        console.log(item.raw, item)
      })

      this.MultipartFile(formData)  //后端上传接口

    },
    MultipartFile(formData) {
      axios.post("http://localhost:8003/geoserver/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(resUpLoadFiles => {
      
       
        //上传成功后开始发布数据
         this.postdata(resUpLoadFiles)


      }).catch(err => {
        
        this.$message('文件上传失败：'+err);
      })
    }
```


## springboot

```java

    /**
     * 上传文件到服务器
     * @param files
     * @return 返回 url fullpath name
     */
    @RequestMapping("/upload")
    public Map<String, Object> upload(@RequestParam("files") MultipartFile[] files) {

        List<Map<String, String>> results = new ArrayList<>();

        for (MultipartFile file : files) {

            String fileName = saveUpload(file);

            Map<String, String> fileInfo = new HashMap<>();
            fileInfo.put("url", sourceDirup + fileName);
            fileInfo.put("fullpath", sourceDirup + fileName);
            fileInfo.put("name", fileName);

            results.add(fileInfo);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("files", results);
        return result;

    }

    private String saveUpload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("上传失败，请选择文件");
        }

        String fileName = file.getOriginalFilename();
        File dest = new File(sourceDirup + fileName);
        try {
            file.transferTo(dest);
            log.info("上传成功");
            return fileName;
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }
```