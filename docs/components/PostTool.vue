<template>
    <div>
      <!-- <input type="file" ref="fileInput" @change="onFileChange" /> -->
      <textarea v-model="textInput1"></textarea>
      <textarea v-model="textInput2"></textarea>
      <button @click="submit">提交</button>
      <img :src="resultImg" alt="结果图片" />
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        fileInput: null,
        textInput1: '',
        textInput2: '',
        resultImg: ''
      }
    },
    methods: {
      onFileChange () {
        this.fileInput = this.$refs.fileInput.files[0];
      },
      async submit () {
        // 创建 FormData 对象，用于发送 POST 请求
        const formData = new FormData();
        // 将文件和文本数据添加到 FormData 对象中
        formData.append('file', this.textInput1);
        formData.append('text', this.textInput2);
  
        // 发送 POST 请求
        const response = await fetch('http://127.0.0.1:3859/post', {
          method: 'POST',
          body: formData
        });
  
        // 解析返回的数据
         const data = await response.blob();
        // this.resultImg = URL.createObjectURL(data);

        
      }
    }
  }
  </script>
  