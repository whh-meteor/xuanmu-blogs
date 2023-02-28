import{_ as s,o as a,c as n,a as e}from"./app.e87dd955.js";const l="/xuanmu-blogs/assets/img-2023-02-23-09-45-46.2c1b8fe5.png",p="/xuanmu-blogs/assets/img-2023-02-23-09-50-39.7f733b60.png",o="/xuanmu-blogs/assets/img-2023-02-23-09-58-55.c73aa5e6.png",b=JSON.parse('{"title":"Docker 搭建私有仓库","description":"","frontmatter":{},"headers":[{"level":2,"title":"使用registry构建镜像","slug":"使用registry构建镜像","link":"#使用registry构建镜像","children":[]},{"level":2,"title":"修改Docker daemon","slug":"修改docker-daemon","link":"#修改docker-daemon","children":[]},{"level":2,"title":"打标签","slug":"打标签","link":"#打标签","children":[]},{"level":2,"title":"上传镜像","slug":"上传镜像","link":"#上传镜像","children":[]},{"level":2,"title":"拉取镜像","slug":"拉取镜像","link":"#拉取镜像","children":[]}],"relativePath":"blogs/06.Docker/搭建私有仓库.md"}'),c={name:"blogs/06.Docker/搭建私有仓库.md"},t=e(`<h1 id="docker-搭建私有仓库" tabindex="-1">Docker 搭建私有仓库 <a class="header-anchor" href="#docker-搭建私有仓库" aria-hidden="true">#</a></h1><h2 id="使用registry构建镜像" tabindex="-1">使用registry构建镜像 <a class="header-anchor" href="#使用registry构建镜像" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> docker run -d -p 5000:5000 registry:2</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>自动下载并启动一个registry容器</p><h2 id="修改docker-daemon" tabindex="-1">修改Docker daemon <a class="header-anchor" href="#修改docker-daemon" aria-hidden="true">#</a></h2><p>内部使用的私有仓库，可以自行配置证书或者关闭对仓库的安全性检查 <img src="`+l+`" alt=""></p><h2 id="打标签" tabindex="-1">打标签 <a class="header-anchor" href="#打标签" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">wanghaihang@WangHaiHangdeMacBook-Air Desktop % docker images</span></span>
<span class="line"><span style="color:#A6ACCD;">REPOSITORY                                        TAG       IMAGE ID       CREATED        SIZE</span></span>
<span class="line"><span style="color:#A6ACCD;">lcc_pca_kmeans                                    v4        6c013cc72266   38 hours ago   1.41GB</span></span>
<span class="line"><span style="color:#A6ACCD;">172.31.41.123:5000/lcc_pca_kmeans_v4              latest    6c013cc72266   38 hours ago   1.41GB</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;none&gt;                                            &lt;none&gt;    27c3101da701   40 hours ago   908MB</span></span>
<span class="line"><span style="color:#A6ACCD;">lcc_pca_kmeans                                    v2        1f9669ef8ab9   40 hours ago   1.41GB</span></span>
<span class="line"><span style="color:#A6ACCD;">lcc_pca_kmeans                                    v1        1233e044cd21   41 hours ago   1.41GB</span></span>
<span class="line"><span style="color:#A6ACCD;">demo_cd                                           vv3       0d3af8082037   7 days ago     1.39GB</span></span>
<span class="line"><span style="color:#A6ACCD;">demo_cd                                           vv2       b3f5ec2f535a   7 days ago     1.39GB</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;none&gt;                                            &lt;none&gt;    6c11711b93ba   7 days ago     897MB</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;none&gt;                                            &lt;none&gt;    d00639061d32   7 days ago     897MB</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;none&gt;                                            &lt;none&gt;    12664fb896b1   7 days ago     897MB</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;none&gt;                                            &lt;none&gt;    b0e18ac87ae2   7 days ago     897MB</span></span>
<span class="line"><span style="color:#A6ACCD;">python                                            3.8       b8eb001ea805   13 days ago    858MB</span></span>
<span class="line"><span style="color:#A6ACCD;">cva_multibands                                    v1        99dd4b8c4643   3 months ago   107MB</span></span>
<span class="line"><span style="color:#A6ACCD;">python/sate                                       v1        01f45f89367c   4 months ago   1.46GB</span></span>
<span class="line"><span style="color:#A6ACCD;">demo_flask3                                       v3        53ac1b697c50   4 months ago   1.18GB</span></span>
<span class="line"><span style="color:#A6ACCD;">demo_flask                                        v1        89a1d9b7410c   4 months ago   901MB</span></span>
<span class="line"><span style="color:#A6ACCD;">alpine/git                                        latest    8bfbb50cd816   4 months ago   43.4MB</span></span>
<span class="line"><span style="color:#A6ACCD;">python                                            3.7       955229705921   4 months ago   854MB</span></span>
<span class="line"><span style="color:#A6ACCD;">python                                            3.9       6a871b644d21   4 months ago   862MB</span></span>
<span class="line"><span style="color:#A6ACCD;">mayan31370/openjdk-alpine-with-chinese-timezone   8-jdk     70e61b8bb388   5 years ago    101MB</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>使用docker tag命令标记镜像172.31.41.119:5000/为私有仓库地址</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> docker tag lcc_pca_kmeans:v4 172.31.41.119:5000/lcc_pca_kmeans_v4</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="上传镜像" tabindex="-1">上传镜像 <a class="header-anchor" href="#上传镜像" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">wanghaihang@WangHaiHangdeMacBook-Air Desktop % docker push 172.31.41.119:5000/lcc_pca_kmeans_v4</span></span>
<span class="line"><span style="color:#A6ACCD;">Using default tag: latest</span></span>
<span class="line"><span style="color:#A6ACCD;">The push refers to repository [172.31.41.119:5000/lcc_pca_kmeans_v4]</span></span>
<span class="line"><span style="color:#A6ACCD;">1214155e1b92: Pushing [=========&gt;                                         ]  91.74MB/498.1MB</span></span>
<span class="line"><span style="color:#A6ACCD;">c014d61e197e: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">daa7980b04d3: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">63990fc74c1f: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">2a415cbabd02: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">a4ac6623bedc: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">d7c757e0bebf: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">edc43eb2bdb6: Pushing [==&gt;                                                ]  20.41MB/488MB</span></span>
<span class="line"><span style="color:#A6ACCD;">765e013775a6: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">beaf68924af7: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">791bbde8b96b: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;">29284a104249: Pushed </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>如果报错显示503 需要proxy代理，检查registry：2 仓库是否在运行？</strong><img src="`+p+`" alt=""></p><h2 id="拉取镜像" tabindex="-1">拉取镜像 <a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">wanghaihang@WangHaiHangdeMacBook-Air Desktop % docker pull 172.31.41.119:5000/test</span></span>
<span class="line"><span style="color:#A6ACCD;">Using default tag: latest</span></span>
<span class="line"><span style="color:#A6ACCD;">latest: Pulling from test</span></span>
<span class="line"><span style="color:#A6ACCD;">Digest: sha256:c3762b4d0858be64b473306022c3bae8df38a5a634b1dd669afcada0dbcd1e24</span></span>
<span class="line"><span style="color:#A6ACCD;">Status: Downloaded newer image for 172.31.41.119:5000/test:latest</span></span>
<span class="line"><span style="color:#A6ACCD;">172.31.41.119:5000/test:latest</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="`+o+'" alt=""></p>',16),r=[t];function i(d,C,A,g,h,y){return a(),n("div",null,r)}const _=s(c,[["render",i]]);export{b as __pageData,_ as default};
