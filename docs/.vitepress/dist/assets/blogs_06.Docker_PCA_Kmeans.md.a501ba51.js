import{_ as s,o as n,c as a,d as l}from"./app.8d7c829b.js";const p="/xuanmu-blogs/assets/img-2023-02-21-21-47-11.a363e1fb.png",e="/xuanmu-blogs/assets/img-2023-02-21-21-47-52.76682d86.png",o="/xuanmu-blogs/assets/img-2023-03-10-16-23-11.efbce323.png",g=JSON.parse('{"title":"变化检测 PCA+KMeans算法封装","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.准备","slug":"_1-准备","link":"#_1-准备","children":[{"level":3,"title":"1.1 Dockerfile","slug":"_1-1-dockerfile","link":"#_1-1-dockerfile","children":[]},{"level":3,"title":"1.2 requirements.txt","slug":"_1-2-requirements-txt","link":"#_1-2-requirements-txt","children":[]},{"level":3,"title":"1.3 gunicorn.conf.py","slug":"_1-3-gunicorn-conf-py","link":"#_1-3-gunicorn-conf-py","children":[]},{"level":3,"title":"1.4 index.html","slug":"_1-4-index-html","link":"#_1-4-index-html","children":[]},{"level":3,"title":"1.5 post.html","slug":"_1-5-post-html","link":"#_1-5-post-html","children":[]}]},{"level":2,"title":"2 打包模型","slug":"_2-打包模型","link":"#_2-打包模型","children":[]},{"level":2,"title":"3以特定端口号运行容器","slug":"_3以特定端口号运行容器","link":"#_3以特定端口号运行容器","children":[]},{"level":2,"title":"4 其他","slug":"_4-其他","link":"#_4-其他","children":[]},{"level":2,"title":"5 内存处理","slug":"_5-内存处理","link":"#_5-内存处理","children":[]},{"level":2,"title":"迁移与部署","slug":"迁移与部署","link":"#迁移与部署","children":[]}],"relativePath":"blogs/06.Docker/PCA+Kmeans.md"}'),t={name:"blogs/06.Docker/PCA+Kmeans.md"},c=l(`<h1 id="变化检测-pca-kmeans算法封装" tabindex="-1">变化检测 PCA+KMeans算法封装 <a class="header-anchor" href="#变化检测-pca-kmeans算法封装" aria-hidden="true">#</a></h1><h2 id="_1-准备" tabindex="-1">1.准备 <a class="header-anchor" href="#_1-准备" aria-hidden="true">#</a></h2><h3 id="_1-1-dockerfile" tabindex="-1">1.1 Dockerfile <a class="header-anchor" href="#_1-1-dockerfile" aria-hidden="true">#</a></h3><p>Dockerfile</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># 配置环境</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM python:3.8</span></span>
<span class="line"><span style="color:#A6ACCD;"># 工作目录</span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR ./Docker_Python_PCA_KMeans</span></span>
<span class="line"><span style="color:#A6ACCD;"># 从本来的路径拷贝到容器指定路径，这么写最省事</span></span>
<span class="line"><span style="color:#A6ACCD;">ADD . .</span></span>
<span class="line"><span style="color:#A6ACCD;"># 配置python环境库</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/</span></span>
<span class="line"><span style="color:#A6ACCD;"># 启动后台服务</span></span>
<span class="line"><span style="color:#A6ACCD;">ENTRYPOINT gunicorn run_predict:app -c gunicorn.conf.py</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_1-2-requirements-txt" tabindex="-1">1.2 requirements.txt <a class="header-anchor" href="#_1-2-requirements-txt" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">chardet==5.1.0</span></span>
<span class="line"><span style="color:#A6ACCD;">Flask==2.2.2</span></span>
<span class="line"><span style="color:#A6ACCD;">imageio==2.25.1</span></span>
<span class="line"><span style="color:#A6ACCD;">matplotlib==3.5.3</span></span>
<span class="line"><span style="color:#A6ACCD;">numpy==1.21.5</span></span>
<span class="line"><span style="color:#A6ACCD;">opencv_python_headless==4.6.0.66</span></span>
<span class="line"><span style="color:#A6ACCD;">Pillow==9.4.0</span></span>
<span class="line"><span style="color:#A6ACCD;">scikit_learn==1.2.1</span></span>
<span class="line"><span style="color:#A6ACCD;">scipy==1.10.0</span></span>
<span class="line"><span style="color:#A6ACCD;">gunicorn==20.1.0</span></span>
<span class="line"><span style="color:#A6ACCD;">gevent==21.12.0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_1-3-gunicorn-conf-py" tabindex="-1">1.3 <a href="http://gunicorn.conf.py" target="_blank" rel="noreferrer">gunicorn.conf.py</a> <a class="header-anchor" href="#_1-3-gunicorn-conf-py" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">workers = 1 # 定义同时开启的处理请求的进程数量，根据网站流量适当调整</span></span>
<span class="line"><span style="color:#A6ACCD;">worker_class = &quot;gevent&quot;   # 采用gevent库，支持异步处理请求，提高吞吐量</span></span>
<span class="line"><span style="color:#A6ACCD;">bind = &quot;0.0.0.0:5000&quot; # 这个还只能是0.0.0.0</span></span>
<span class="line"><span style="color:#A6ACCD;">timeout = 3600  # 设置超时时间为 120 秒</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_1-4-index-html" tabindex="-1">1.4 index.html <a class="header-anchor" href="#_1-4-index-html" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;title&gt;Flask Show Image&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;img style=&quot;width:800px&quot; src=&quot;data:;base64,{{ img_stream }}&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_1-5-post-html" tabindex="-1">1.5 post.html <a class="header-anchor" href="#_1-5-post-html" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;title&gt;变化检测&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- &lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    h1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">        color: blue;</span></span>
<span class="line"><span style="color:#A6ACCD;">        font-size: 24px;</span></span>
<span class="line"><span style="color:#A6ACCD;">        font-family: Arial, sans-serif;</span></span>
<span class="line"><span style="color:#A6ACCD;">        text-align: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span></span>
<span class="line"><span style="color:#A6ACCD;">    /* 表单元素的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">    form {</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 500px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #fafafa;</span></span>
<span class="line"><span style="color:#A6ACCD;">      box-shadow: 0 0 10px rgba(0,0,0,0.2);</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 10px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* 表单标签的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">    label {</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: block;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin-bottom: 8px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-size: 16px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: #333;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* 表单输入框的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">    input[type=&quot;text&quot;], input[type=&quot;email&quot;], input[type=&quot;password&quot;] {</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: block;</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 100%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 8px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-size: 16px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: #333;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border: 1px solid #ddd;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 5px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    /* 表单按钮的样式 */</span></span>
<span class="line"><span style="color:#A6ACCD;">    button {</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: block;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 120px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 8px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-size: 16px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #337ab7;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 5px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      cursor: pointer;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    img[src=&quot;https://www.example.com/placeholder.jpg&quot;] {</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/style&gt; --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;style&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">    body {</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-family: Arial, sans-serif;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #f2f2f2;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    h1 {</span></span>
<span class="line"><span style="color:#A6ACCD;">      text-align: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin-top: 50px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    form {</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: 50px auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: 80%;</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">      flex-direction: column;</span></span>
<span class="line"><span style="color:#A6ACCD;">      align-items: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">      justify-content: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: white;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 10px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    label {</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: 10px 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-size: 18px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    input[type=&quot;file&quot;] {</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: 10px 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    button[type=&quot;submit&quot;] {</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin-top: 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #4CAF50;</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: white;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">      padding: 10px 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 5px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      font-size: 18px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      cursor: pointer;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    button[type=&quot;submit&quot;]:hover {</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: #3e8e41;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    img {</span></span>
<span class="line"><span style="color:#A6ACCD;">      margin: 20px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 5px;</span></span>
<span class="line"><span style="color:#A6ACCD;">      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;h1&gt;PCA+Kmean变化检测&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;form action=&quot;http://127.0.0.1:5000/PCA_KMeans&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;label&gt;T1 IMAGE: &lt;input type=&quot;file&quot; name=&quot;img1&quot; multiple&gt;&lt;/label&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;br&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;label&gt;T2 IMAGE: &lt;input type=&quot;file&quot; name=&quot;img2&quot; multiple&gt;&lt;/label&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/form&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div style=&quot;text-align: center&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;img src=&quot;data:;base64,{{ T1_Steam }}&quot; alt=&quot; &quot; onerror=&quot;this.style.display=&#39;none&#39;&quot;  style=&quot;display: inline-block; width: 300px;  &quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;img src=&quot;data:;base64,{{ T2_Steam }}&quot; alt=&quot; &quot; onerror=&quot;this.style.display=&#39;none&#39;&quot;  style=&quot;display: inline-block; width: 300px;  &quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;img src=&quot;data:;base64,{{ img_stream }}&quot;alt=&quot; &quot; onerror=&quot;this.style.display=&#39;none&#39;&quot;  style=&quot;display: inline-block; width: 300px;  &quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;img src=&quot;data:;base64,{{ img_stream2 }}&quot; alt=&quot; &quot;onerror=&quot;this.style.display=&#39;none&#39;&quot;  style=&quot;display: inline-block; width: 300px;  &quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_2-打包模型" tabindex="-1">2 打包模型 <a class="header-anchor" href="#_2-打包模型" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">docker build -t lcc_pca_kmeans:v1 .</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>Successfully built 1233e044cd21 Successfully tagged lcc_pca_kmeans:v1</p><h2 id="_3以特定端口号运行容器" tabindex="-1">3以特定端口号运行容器 <a class="header-anchor" href="#_3以特定端口号运行容器" aria-hidden="true">#</a></h2><p>docker run -itd -p 5004:5000 lcc_pca_kmeans:v4</p><p><img src="`+p+'" alt=""><img src="'+e+'" alt=""></p><h2 id="_4-其他" tabindex="-1">4 其他 <a class="header-anchor" href="#_4-其他" aria-hidden="true">#</a></h2><p>Python已经取消scipy库中imread，imresize，imsave三个函数的使用,在文件中直接写入imresize函数源代码。</p><p>高效准确处理scipy.misc 中imresize、imread导入错误问题 <a href="https://blog.csdn.net/qq_43561314/article/details/126211227" target="_blank" rel="noreferrer">https://blog.csdn.net/qq_43561314/article/details/126211227</a></p><h2 id="_5-内存处理" tabindex="-1">5 内存处理 <a class="header-anchor" href="#_5-内存处理" aria-hidden="true">#</a></h2><ul><li><p>构建 <code>sudo docker build -t lcc_pca_kmeans:v6 .</code></p></li><li><p>执行 <code>docker run -itd -p 5006:5000 lcc_pca_kmeans:v6 </code></p></li><li><p>监控状态 <code>sudo docker stats a890458eaa9367b72c210aeae814e755077cea81f463966ac69c79f361213340</code></p></li><li><p>资源拉满导致任务终止 <img src="'+o+'" alt=""></p></li><li><p>限制内存到14并监控状态 <code>docker run -itd -p 5006:5000 -m 14g lcc_pca_kmeans:v6 </code></p></li></ul><h2 id="迁移与部署" tabindex="-1">迁移与部署 <a class="header-anchor" href="#迁移与部署" aria-hidden="true">#</a></h2><p>待更新</p>',26),i=[c];function r(C,A,y,d,u,D){return n(),a("div",null,i)}const m=s(t,[["render",r]]);export{g as __pageData,m as default};
