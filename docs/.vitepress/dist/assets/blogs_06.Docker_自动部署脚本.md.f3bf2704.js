import{_ as s,o as n,c as a,d as l}from"./app.46024d5b.js";const F=JSON.parse('{"title":"Docker 自动部署脚本","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/06.Docker/自动部署脚本.md"}'),p={name:"blogs/06.Docker/自动部署脚本.md"},o=l(`<h1 id="docker-自动部署脚本" tabindex="-1">Docker 自动部署脚本 <a class="header-anchor" href="#docker-自动部署脚本" aria-hidden="true">#</a></h1><pre><code>Ps:需要将上述的脚本、Dockerfile文件和jar包放在同一路径下，然后执行自动脚本即可自动部署项目，如果项目有更新删除jar包重新上传再执行自动话脚本即可。
</code></pre><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#源算法路径 (此处指定到要部署的算法包所在文件夹即可)</span></span>
<span class="line"><span style="color:#A6ACCD;">SOURCE_PATH=/usr/lv/algorithm/demo</span></span>
<span class="line"><span style="color:#676E95;">#docker 镜像/容器名字或者jar名字 这里都命名为这个</span></span>
<span class="line"><span style="color:#A6ACCD;">SERVER_NAME=demo</span></span>
<span class="line"><span style="color:#676E95;">#版本号</span></span>
<span class="line"><span style="color:#A6ACCD;">TAG=latest</span></span>
<span class="line"><span style="color:#676E95;">#容器映射出来的端口号</span></span>
<span class="line"><span style="color:#A6ACCD;">SERVER_PORT=5271</span></span>
<span class="line"><span style="color:#676E95;">#容器id</span></span>
<span class="line"><span style="color:#A6ACCD;">CID=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">docker ps </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> grep </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> awk </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{print $1}</span><span style="color:#89DDFF;">&#39;)</span></span>
<span class="line"><span style="color:#676E95;">#镜像id</span></span>
<span class="line"><span style="color:#A6ACCD;">IID=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">docker images </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> grep </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">TAG</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> awk </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{print $3}</span><span style="color:#89DDFF;">&#39;)</span></span>
<span class="line"><span style="color:#676E95;">#这里是容器是否已经存在的判断，如果存在就先stop容器再rm容器</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">CID</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">];</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">then</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">存在容器</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#C3E88D;">, CID-</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">CID</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker stop </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">CID</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker rm </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">CID</span></span>
<span class="line"><span style="color:#89DDFF;">fi</span></span>
<span class="line"><span style="color:#676E95;">#构建docker镜像，同样做是否存在的判断</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-n</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">IID</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">];</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">then</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">存在</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">TAG</span><span style="color:#C3E88D;">镜像，IID=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">IID</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker rmi </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">IID</span></span>
<span class="line"><span style="color:#89DDFF;">else</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">不存在</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#C3E88D;">:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">TAG</span><span style="color:#C3E88D;">镜像，开始构建镜像</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SOURCE_PATH</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker build -t </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">TAG </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#89DDFF;">fi</span></span>
<span class="line"><span style="color:#676E95;"># 运行docker容器</span></span>
<span class="line"><span style="color:#A6ACCD;">docker run -v /etc/localtime:/etc/localtime -v /etc/timezone:/etc/timezone:ro --name </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME -d -p </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_PORT:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_PORT </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">SERVER_NAME:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">TAG</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">SERVER_NAME</span><span style="color:#C3E88D;">容器创建完成</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">SOURCE_PATH=/usr/lv/algorithm/demo</span></span>
<span class="line"><span style="color:#A6ACCD;">SERVER_NAME=demo</span></span>
<span class="line"><span style="color:#A6ACCD;">TAG=latest</span></span>
<span class="line"><span style="color:#A6ACCD;">SERVER_PORT=5002</span></span>
<span class="line"><span style="color:#A6ACCD;">CID=$(docker ps | grep &quot;$SERVER_NAME&quot; | awk &#39;{print $1}&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">IID=$(docker images | grep &quot;$SERVER_NAME:$TAG&quot; | awk &#39;{print $3}&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">if [ -n &quot;$CID&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">  echo &quot;Exists$SERVER_NAME, CID-$CID&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker stop $CID</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker rm $CID</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;">if [ -n &quot;$IID&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">  echo &quot; Exists $SERVER_NAME:$TAG image，IID=$IID&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker rmi $IID</span></span>
<span class="line"><span style="color:#A6ACCD;">else</span></span>
<span class="line"><span style="color:#A6ACCD;">  echo &quot; No $SERVER_NAME:$TAG image exists. Start building the image. &quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  cd $SOURCE_PATH</span></span>
<span class="line"><span style="color:#A6ACCD;">  docker build -t $SERVER_NAME:$TAG .</span></span>
<span class="line"><span style="color:#A6ACCD;">fi </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">docker run -v /etc/localtime:/etc/localtime -v /etc/timezone:/etc/timezone:ro </span></span>
<span class="line"><span style="color:#A6ACCD;">--name $SERVER_NAME -d -p $SERVER_PORT:$SERVER_PORT $SERVER_NAME:$TAG</span></span>
<span class="line"><span style="color:#A6ACCD;">echo &quot;$SERVER_NAME container creation complete&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">services:</span></span>
<span class="line"><span style="color:#A6ACCD;">  service-c:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: 172.31.41.119:5000/gdal_crop:v2</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">     - 5002: 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">    networks :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - counter-net</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - type: volume</span></span>
<span class="line"><span style="color:#A6ACCD;">       source: E:/Tomcat/webapps/ILCSData/PAMC_Chain/Step1</span></span>
<span class="line"><span style="color:#A6ACCD;">       target: /GDAL_Docker_Clip/Results</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    hostname: Image Matching</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  service-a:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: 172.31.41.119:5000/lcc_pca_kmeans:v8</span></span>
<span class="line"><span style="color:#A6ACCD;">    depends_on:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - service-c</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">     - 5008: 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">    networks :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - counter-net</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - type: volume</span></span>
<span class="line"><span style="color:#A6ACCD;">       source: E:/Tomcat/webapps/ILCSData/PAMC_Chain/Step2</span></span>
<span class="line"><span style="color:#A6ACCD;">       target: /Docker_Python_PCA_KMeans/Results</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    hostname: Change Detection</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  service-b:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: 172.31.41.119:5000/r_shiny-ebimage:v20</span></span>
<span class="line"><span style="color:#A6ACCD;">    depends_on:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - service-a</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">     - 5020: 5000</span></span>
<span class="line"><span style="color:#A6ACCD;">    networks :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - counter-net</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes :</span></span>
<span class="line"><span style="color:#A6ACCD;">     - type: volume</span></span>
<span class="line"><span style="color:#A6ACCD;">       source: E:/Tomcat//webapps/ILCSData/PAMC_Chain/Step3</span></span>
<span class="line"><span style="color:#A6ACCD;">       target: /Docker_R_EBImage/Results</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    hostname: Pass Filter</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,5),e=[o];function c(t,r,A,C,D,y){return n(),a("div",null,e)}const E=s(p,[["render",c]]);export{F as __pageData,E as default};
