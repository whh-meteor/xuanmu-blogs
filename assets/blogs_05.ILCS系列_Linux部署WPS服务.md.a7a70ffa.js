import{_ as a,o as s,c as n,d as l}from"./app.397286ce.js";const p="/xuanmu-blogs/assets/img-2023-08-26-21-57-50.faa60df5.png",e="/xuanmu-blogs/assets/img-2023-08-27-00-29-01.7e662d5a.png",c="/xuanmu-blogs/assets/img-2023-09-06-10-26-34.41fe9bc1.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"安装jdk","slug":"安装jdk","link":"#安装jdk","children":[]},{"level":2,"title":"安装Marlab Component Runtime （MCR）","slug":"安装marlab-component-runtime-mcr","link":"#安装marlab-component-runtime-mcr","children":[]},{"level":2,"title":"Docker拉取 Tomcat","slug":"docker拉取-tomcat","link":"#docker拉取-tomcat","children":[]},{"level":2,"title":"WPS服务执行Matlab配置","slug":"wps服务执行matlab配置","link":"#wps服务执行matlab配置","children":[]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"高版本 tomcat webapp访问目录无权限","slug":"高版本-tomcat-webapp访问目录无权限","link":"#高版本-tomcat-webapp访问目录无权限","children":[]}]},{"level":2,"title":"安装本地tomcat","slug":"安装本地tomcat","link":"#安装本地tomcat","children":[]},{"level":2,"title":"Linux重新打包jar包","slug":"linux重新打包jar包","link":"#linux重新打包jar包","children":[]},{"level":2,"title":"虚拟机安装Linux CentOS7","slug":"虚拟机安装linux-centos7","link":"#虚拟机安装linux-centos7","children":[{"level":3,"title":"安装Matlab","slug":"安装matlab","link":"#安装matlab","children":[]}]},{"level":2,"title":"centos安装Docker","slug":"centos安装docker","link":"#centos安装docker","children":[{"level":3,"title":"安装jdk","slug":"安装jdk-1","link":"#安装jdk-1","children":[]}]},{"level":2,"title":"docker","slug":"docker","link":"#docker","children":[{"level":3,"title":"dockerfile","slug":"dockerfile","link":"#dockerfile","children":[]},{"level":3,"title":"matlab在arm64下无法执行","slug":"matlab在arm64下无法执行","link":"#matlab在arm64下无法执行","children":[]}]},{"level":2,"title":"容器不足清理废弃镜像","slug":"容器不足清理废弃镜像","link":"#容器不足清理废弃镜像","children":[]},{"level":2,"title":"问题：Dockfile中的CMD命令只对最后一条生效，因此使用sh脚本同时启动tomcat和jar","slug":"问题-dockfile中的cmd命令只对最后一条生效-因此使用sh脚本同时启动tomcat和jar","link":"#问题-dockfile中的cmd命令只对最后一条生效-因此使用sh脚本同时启动tomcat和jar","children":[]},{"level":2,"title":"导出容器包-在服务上导入并执行","slug":"导出容器包-在服务上导入并执行","link":"#导出容器包-在服务上导入并执行","children":[]}],"relativePath":"blogs/05.ILCS系列/Linux部署WPS服务.md"}'),o={name:"blogs/05.ILCS系列/Linux部署WPS服务.md"},t=l(`<h2 id="安装jdk" tabindex="-1">安装jdk <a class="header-anchor" href="#安装jdk" aria-hidden="true">#</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#进入usr文件目录</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> /usr</span></span>
<span class="line"><span style="color:#676E95;">#创建Java文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">tar -zxvf jdk-11_linux-x64_bin.tar</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>配置环境</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">进入配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">vi /etc/profile</span></span>
<span class="line"><span style="color:#A6ACCD;">输入i进入编辑模式</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> JAVA_HOME=/usr/java/jdk-11 </span></span>
<span class="line"><span style="color:#676E95;">#后接JDK的路径</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> PATH=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">JAVA_HOME/bin:</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">PATH</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">按ESC 退出按钮，输入:wq 退出和保存文件</span></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">刷新配置文件</span></span>
<span class="line"><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> /etc/profile</span></span>
<span class="line"></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">测试java版本</span></span>
<span class="line"><span style="color:#A6ACCD;">java -version</span></span>
<span class="line"></span></code></pre></div><h2 id="安装marlab-component-runtime-mcr" tabindex="-1">安装Marlab Component Runtime （MCR） <a class="header-anchor" href="#安装marlab-component-runtime-mcr" aria-hidden="true">#</a></h2><p>解压MCR文件</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">unzip MCR_R2017a_glnxa64_installer.zip</span></span>
<span class="line"></span></code></pre></div><p>如果-bash: unzip: 未找到命令</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo yum install unzip </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">CentOS</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo apt-get install unzip</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">Ubuntu</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>静默安装</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">./install -mode silent -agreeToLicense yes</span></span>
<span class="line"></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Preparing installation files ...</span></span>
<span class="line"><span style="color:#A6ACCD;">Installing ...</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) ##################################################################</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) #</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) # Today&#39;s Date: </span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Thu Aug 24 09:13:46 CST 2023</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) </span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) System Info</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) OS: Linux 3.10.0-1160.88.1.el7.x86_64</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Arch: amd64</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Data Model: 64</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Language: zh</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Java Vendor: Oracle Corporation</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Java Home: /tmp/mathworks_5013/sys/java/jre/glnxa64/jre</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Java Version: 1.7.0_60</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Java VM Name: Java HotSpot(TM) 64-Bit Server VM</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Java Class Path: /tmp/mathworks_5013/java/config/installagent/pathlist.jar</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) User Name: root</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Current Directory: /tmp/mathworks_5013</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) Input arguments: </span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) root /usr/mcr</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) libdir /tmp/mathworks_5013</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) mode silent</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) agreeToLicense yes</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) standalone true</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:46) connectionMode OFFLINE_ONLY</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:47) Starting local product/component search in download directory</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) Searching for archives...</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) Reading /usr/mcr/archives</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) 正在汇集产品列表...</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) 1467 files found in /usr/mcr/archives</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) Reading /usr/mcr</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) 9 files found in /usr/mcr</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:48) Archive search complete.  1476 total files found.</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Completed local product/component search</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Starting local product/component search in download directory</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Searching for archives...</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) /usr/local/MATLAB/MATLAB_Runtime/v92/archives doesn&#39;t exist ... skipping.</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Archive search complete.  0 total files found.</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Completed local product/component search</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:50) Installing Product: MATLAB Runtime - Builder JA 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:13:52) Installing Product: MATLAB Runtime - Core 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:12) Installing Product: MATLAB Runtime - GPU 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - Hadoop And Spark 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - NET And XL 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - Numerics 9.2</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:38) Notes: </span></span>
<span class="line"><span style="color:#A6ACCD;">在目标计算机上，将以下内容追加到环境变量 LD_LIBRARY_PATH 的末尾:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:38) Exiting with status 0</span></span>
<span class="line"><span style="color:#A6ACCD;">(八月 24, 2023 09:14:38) End - Successful.</span></span>
<span class="line"><span style="color:#A6ACCD;">Finished</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>可以在末尾处添加</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">export LD_LIBRARY_PATH=/usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>刷新环境变量</p><p><code>source /etc/profile</code></p><h2 id="docker拉取-tomcat" tabindex="-1">Docker拉取 Tomcat <a class="header-anchor" href="#docker拉取-tomcat" aria-hidden="true">#</a></h2><p>拉取docker镜像</p><p><code>docker pull tomcat:9.0.34</code></p><p>挂载数据卷</p><p><code>docker run --name gdsp-wps -d -p 8088:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps docker.io/tomcat:9.0.43</code></p><p>以root权限进入容器 <code>docker exec -it --user=root 6bc6 /bin/sh </code></p><p>查看日志 <code>tail -f catalina.2023-08-24.log -n 1000</code></p><h2 id="wps服务执行matlab配置" tabindex="-1">WPS服务执行Matlab配置 <a class="header-anchor" href="#wps服务执行matlab配置" aria-hidden="true">#</a></h2><p>java builder 放入lib并挂载到docker中</p><p><code>docker run --name gdsp-wps -d -p 8088:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps -v /opt/wanghaihang/lib:/usr/local/tomcat/lib docker.io/tomcat:9.0.43</code></p><p>docker run --name wps -d -p 8087:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps -v /opt/wanghaihang/lib:/usr/local/tomcat/lib <a href="http://docker.io/tomcat:9.0.43" target="_blank" rel="noreferrer">docker.io/tomcat:9.0.43</a></p><p>cp -r lib/* warPackage</p><p>cp -r webapps/javabuilder.jar lib</p><p>disk full</p><p>更换文件夹</p><p>docker run --name wps2 -d -p 8088:8080 -v /home/wanghaihang/warPackage:/usr/local/tomcat/webapps -v /home/wanghaihang/Arithmetic:/usr/local/arithmetic <a href="http://docker.io/tomcat:9.0.43" target="_blank" rel="noreferrer">docker.io/tomcat:9.0.43</a></p><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-hidden="true">#</a></h2><h3 id="高版本-tomcat-webapp访问目录无权限" tabindex="-1">高版本 tomcat webapp访问目录无权限 <a class="header-anchor" href="#高版本-tomcat-webapp访问目录无权限" aria-hidden="true">#</a></h3><p>cp -r webapps.dist/* webapps</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">cp: cannot create directory &#39;webapps/ROOT&#39;: Permission denied</span></span>
<span class="line"><span style="color:#A6ACCD;">cp: cannot create directory &#39;webapps/docs&#39;: Permission denied</span></span>
<span class="line"><span style="color:#A6ACCD;">cp: cannot create directory &#39;webapps/examples&#39;: Permission denied</span></span>
<span class="line"><span style="color:#A6ACCD;">cp: cannot create directory &#39;webapps/host-manager&#39;: Permission denied</span></span>
<span class="line"><span style="color:#A6ACCD;">cp: cannot create directory &#39;webapps/manager&#39;: Permission denied</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>查看webapps提示没有权限。</p><p>原因：</p><p>centos7中安全模块selinux把权限禁掉了。</p><p>有三种方法解决：</p><p>1.在运行时加 --privileged=true</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">xuhaixing@localhost tomcat</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">$ docker run -d -p 9091:8080 -v /home/XXXX/docker/tomcat/webapps/:/usr/local/tomcat/webapps/ --privileged=true --name managertomcat XXXX/mytomcat</span></span>
<span class="line"><span style="color:#A6ACCD;">c512137b74f3366da73ff80fc1fd232cc76c95b52a4bab01f1f5d89d28185b28</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">xuhaixing@localhost tomcat</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">$ ls</span></span>
<span class="line"></span></code></pre></div><p>2.临时关闭selinux然后再打开</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost tomcat</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># setenforce 0</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost tomcat</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># setenforce 1</span></span>
<span class="line"></span></code></pre></div><p>3.添加linux规则，把要挂载的目录添加到selinux白名单</p><p>更改安全性文本的格式如下 <code>chcon [-R] [-t type] [-u user] [-r role] 文件或者目录</code></p><p>选顷不参数： -R ：该目录下的所有目录也同时修改； -t ：后面接安全性本文的类型字段，例如 httpd_sys_content_t ； -u ：后面接身份识别，例如 system_u； -r ：后面街觇色，例如 system_r 执行：</p><p><code>chcon -Rt svirt_sandbox_file_t /home/XXXX/docker/tomcat/webapps/</code></p><p>chcon -Rt svirt_sandbox_file_t /home/wanghaihang/warPackage/ILCSData/</p><h2 id="安装本地tomcat" tabindex="-1">安装本地tomcat <a class="header-anchor" href="#安装本地tomcat" aria-hidden="true">#</a></h2><p>./ <a href="http://startup.sh" target="_blank" rel="noreferrer">startup.sh</a></p><p>netstat -nltp | grep 8080</p><p>启动后无法访问 如果在Linux上开启了防火墙，可能会阻止Tomcat的访问。可以通过以下命令关闭防火墙：</p><p>systemctl stop firewalld</p><p>关闭防火墙后，Tomcat能够正常访问，则需要针对Tomcat开启端口：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost bin</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># systemctl stop firewalld</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost bin</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># firewall-cmd --add-port=8080/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">FirewallD is not running</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost bin</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># systemctl start firewalld</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost bin</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># firewall-cmd --add-port=8080/tcp --permanent</span></span>
<span class="line"><span style="color:#A6ACCD;">success</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h2 id="linux重新打包jar包" tabindex="-1">Linux重新打包jar包 <a class="header-anchor" href="#linux重新打包jar包" aria-hidden="true">#</a></h2><p>需要到Linux环境下编译成jar包，通用。Java是一次编写。不代表所有的class都能用。不同环境的机器需要重新编译。</p><p>mcc -W &#39;java:matlab.CVAMulBands,Matlab&#39; -a &#39;/home/wanghaihang/matlab/*&#39; -d &#39;/home/wanghaihang/matlab/mcc&#39; CVAMulBands.m</p><h2 id="虚拟机安装linux-centos7" tabindex="-1">虚拟机安装Linux CentOS7 <a class="header-anchor" href="#虚拟机安装linux-centos7" aria-hidden="true">#</a></h2><h3 id="安装matlab" tabindex="-1">安装Matlab <a class="header-anchor" href="#安装matlab" aria-hidden="true">#</a></h3><p>目前 M1 芯片下 arm64 虚拟机无法安装matlabr2017a r2017b</p><p><img src="`+p+'" alt=""></p><h2 id="centos安装docker" tabindex="-1">centos安装Docker <a class="header-anchor" href="#centos安装docker" aria-hidden="true">#</a></h2><p>CentOS系统中安装Docker可以按照以下步骤进行：</p><p>更新系统和安装所需依赖：</p><p>sudo yum update sudo yum install -y yum-utils device-mapper-persistent-data lvm2</p><p>配置Docker的稳定仓库：</p><p>sudo yum-config-manager --add-repo <a href="https://download.docker.com/linux/centos/docker-ce.repo" target="_blank" rel="noreferrer">https://download.docker.com/linux/centos/docker-ce.repo</a></p><p>安装Docker：</p><p>sudo yum install -y docker-ce</p><p>启动Docker服务并设置为开机自启：</p><p>sudo systemctl start docker sudo systemctl enable docker</p><p>验证Docker安装是否成功：</p><p>docker version</p><p>如果以上步骤没问题并显示了Docker的版本信息，那么说明Docker已成功安装在CentOS系统中。</p><p>如果您想使用Docker的话，可能还需要执行以下额外步骤：</p><p>将当前用户加入docker用户组，以便于使用docker命令时无需使用sudo：</p><p>sudo usermod -aG docker $USER</p><p>退出当前终端会话并重新登录，使用户组的更改生效。</p><p>验证docker命令是否可以使用无需sudo：</p><p>docker run hello-world</p><p>docker save -o ./matlab2022.tar mathworks/matlab:r2022b</p><p>docker run --init -it --rm -p 5901:5901 -p 6080:6080 --shm-size=512M mathworks/matlab:r2022b -vnc</p><p>docker commit --change &#39;ENTRYPOINT [&quot;/bin/run.sh&quot;]&#39; 71e4e80b1677 matlabwithtoolboxes:r2022b</p><p>挂载目录 <img src="'+e+`" alt=""></p><p>docker run --init -it -p 5902:5901 -p 6082:6080 -v D:\\王海航-资料-勿动\\4-ILCS开发资料\\ILCS依赖环境\\ILCS4MatlabService:/home/matlab/Documents/MATLAB --shm-size=512M matlabwithtoolboxes:r2022b -vnc</p><p>mcc -W &#39;java:matlab.CVAMulBands,Matlab&#39; -a &#39;/home/wanghaihang/Matlab/*&#39; -d &#39;/home/wanghaihang/Matlab/mcc&#39; CVAMulBands.m</p><h3 id="安装jdk-1" tabindex="-1">安装jdk <a class="header-anchor" href="#安装jdk-1" aria-hidden="true">#</a></h3><p>sudo teamviewer --daenon start</p><p><a href="https://www.xjx100.cn/news/402563.html?action=onClick" target="_blank" rel="noreferrer">https://www.xjx100.cn/news/402563.html?action=onClick</a></p><h2 id="docker" tabindex="-1">docker <a class="header-anchor" href="#docker" aria-hidden="true">#</a></h2><p>MacM1 安装Docker 提示Command not found 用vim打开该文件 ~/.zprofile 然后在文本最后插入下面这一行 export PATH=&quot;$PATH:/Applications/Docker.app/Contents/Resources/bin/&quot; 然后写入并退出vim，执行下面这行来应用该环境变量 source ~/.zprofile 最后，执行docker --version，查看结果</p><p>sudo docker build --platform linux/amd64 -t mcr2017_jdk8:v1 .</p><h3 id="dockerfile" tabindex="-1">dockerfile <a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a></h3><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> adoptopenjdk/openjdk8:jre8u282-b08</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># ADD matlab.txt /mcr-install/matlab.txt</span></span>
<span class="line"><span style="color:#676E95;"># COPY MCR_R2017a_glnxa64_installer.zip /mcr-install/MCR_R2017a_glnxa64_installer.zip</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># RUN apt-get update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	apt-get install -y curl wget unzip xorg &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	cd /mcr-install  &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	unzip MCR_R2017a_glnxa64_installer.zip &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	mkdir /opt/mcr &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	./install -inputFile matlab.txt &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	cd / &amp;&amp; \\</span></span>
<span class="line"><span style="color:#676E95;"># 	rm -rf mcr-install</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	apt-get install -y curl wget unzip xorg </span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> mkdir /usr/local/MATLAB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> mkdir /usr/local/MATLAB/MATLAB_Runtime</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/local/MATLAB</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> MCR_R2017a_glnxa64_installer.zip /usr/local/MATLAB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> cd /usr/local/MATLAB</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;">  unzip MCR_R2017a_glnxa64_installer.zip </span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> ./install -mode silent -agreeToLicense yes</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> rm -rf /usr/local/MATLAB</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> LD_LIBRARY_PATH /usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/extern/bin/glnxa64</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> XAPPLRESDIR /usr/local/MATLAB/MATLAB_Runtime/v92/X11/app-defaults</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./apache-tomcat-9.0.34.tar.gz /usr/local</span></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./javabuilder.jar /usr/local/apache-tomcat-9.0.34/lib</span></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./wps.war /usr/local/apache-tomcat-9.0.34/webapps</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> mkdir /usr/local/apache-tomcat-9.0.34/webapps/ILCSData</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> mkdir /opt/lib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./CVAMulBands.jar /opt/lib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/local</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> TOMCAT_HOME=/usr/local/apache-tomcat-9.0.34</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> PATH=$PATH:$TOMCAT_HOME/bin</span></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8080</span></span>
<span class="line"><span style="color:#F78C6C;">CMD</span><span style="color:#A6ACCD;"> startup.sh &amp;&amp; tail -F /usr/local/apache-tomcat-9.0.34/logs/catalina.out</span></span>
<span class="line"><span style="color:#A6ACCD;"> �</span></span>
<span class="line"></span></code></pre></div><h3 id="matlab在arm64下无法执行" tabindex="-1">matlab在arm64下无法执行 <a class="header-anchor" href="#matlab在arm64下无法执行" aria-hidden="true">#</a></h3><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> adoptopenjdk/openjdk8:jre8u282-b08</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	apt-get install -y curl wget unzip xorg &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    mkdir /usr/local/MATLAB &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	mkdir /usr/local/MATLAB/MATLAB_Runtime </span></span>
<span class="line"><span style="color:#A6ACCD;">	</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/local/MATLAB</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> MCR_R2017a_glnxa64_installer.zip /usr/local/MATLAB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> cd /usr/local/MATLAB &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	unzip MCR_R2017a_glnxa64_installer.zip  &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	./install -mode silent -agreeToLicense yes &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm   MCR_R2017a_glnxa64_installer.zip</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> LD_LIBRARY_PATH /usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/extern/bin/glnxa64</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> XAPPLRESDIR /usr/local/MATLAB/MATLAB_Runtime/v92/X11/app-defaults</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./apache-tomcat-9.0.34.tar.gz /usr/local</span></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./javabuilder.jar /usr/local/apache-tomcat-9.0.34/lib</span></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./wps.war /usr/local/apache-tomcat-9.0.34/webapps</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/local</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> TOMCAT_HOME=/usr/local/apache-tomcat-9.0.34</span></span>
<span class="line"><span style="color:#F78C6C;">ENV</span><span style="color:#A6ACCD;"> PATH=$PATH:$TOMCAT_HOME/bin</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> mkdir /usr/local/apache-tomcat-9.0.34/webapps/ILCSData  &amp;&amp; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	mkdir /opt/lib</span></span>
<span class="line"><span style="color:#F78C6C;">ADD</span><span style="color:#A6ACCD;"> ./CVAMulBands.jar /opt/lib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8080</span></span>
<span class="line"><span style="color:#F78C6C;">CMD</span><span style="color:#A6ACCD;"> startup.sh &amp;&amp; tail -F /usr/local/apache-tomcat-9.0.34/logs/catalina.out</span></span>
<span class="line"><span style="color:#A6ACCD;"> �</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="容器不足清理废弃镜像" tabindex="-1">容器不足清理废弃镜像 <a class="header-anchor" href="#容器不足清理废弃镜像" aria-hidden="true">#</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost /</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># docker system prune</span></span>
<span class="line"><span style="color:#A6ACCD;">WARNING</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;"> This will remove:</span></span>
<span class="line"><span style="color:#A6ACCD;">        - all stopped containers</span></span>
<span class="line"><span style="color:#A6ACCD;">        - all volumes not used by at least one container</span></span>
<span class="line"><span style="color:#A6ACCD;">        - all networks not used by at least one container</span></span>
<span class="line"><span style="color:#A6ACCD;">        - all dangling images</span></span>
<span class="line"><span style="color:#A6ACCD;">Are you sure you want to continue</span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">y/N</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> y</span></span>
<span class="line"><span style="color:#A6ACCD;">Deleted Volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">2f77f41a78d4562b3b952ede5e1f914f1f9748815417117e1dbe267311c84625</span></span>
<span class="line"><span style="color:#A6ACCD;">4e0ebfbe34964053c5f3474a32bb6546e3f94d9e38730b6994e6d0e8f3355971</span></span>
<span class="line"><span style="color:#A6ACCD;">0ee40870d0bd9c63801d3e0607341c7aebc595cd6c2743284b5b5e68a5a20736</span></span>
<span class="line"><span style="color:#A6ACCD;">4757ea45f325ed2523324f931a6015657c3e9a7b0eabb00eb22b4b39d2a87c62</span></span>
<span class="line"><span style="color:#A6ACCD;">f029ea4bf2c25d7962415733f9c80c31a1a6fc113f1a3a64da9683183fb23b28</span></span>
<span class="line"><span style="color:#A6ACCD;">f55927dc01d653612c77d15ae8ab0f0e377d74d36b912c74d16a4afc333ced10</span></span>
<span class="line"><span style="color:#A6ACCD;">portainer_db</span></span>
<span class="line"><span style="color:#A6ACCD;">25ec614bcd741e79c712d4786dab5c0b24f028aa31c2f835a24bdcd018971078</span></span>
<span class="line"><span style="color:#A6ACCD;">45a5acd1ea45503901d6fd778a012c7f5e5e0639bf29a52972358ca4eb0b365b</span></span>
<span class="line"><span style="color:#A6ACCD;">e473236b5d2bc10afc89115fa308687f5c323b73e0bda674221a7a26c6270576</span></span>
<span class="line"><span style="color:#A6ACCD;">f9a8be8a27154e2e481d873b334f5f4822595a5773c72978c4867d4a6800d559</span></span>
<span class="line"><span style="color:#A6ACCD;">fd5f0fd72d0a947eba9041ac9fe74b1e944f06cbb1333b51b825b99582687c53</span></span>
<span class="line"><span style="color:#A6ACCD;">0b888f102e65ef15a95aab410532782c25257a2f12f08b69dd418196d1fada11</span></span>
<span class="line"><span style="color:#A6ACCD;">43107a8f99dbd0452992eb82f9fc593f1e2382a155b57a11033cbef35ee6323c</span></span>
<span class="line"><span style="color:#A6ACCD;">758e9e1570116858f1262c8f4d61725f44a693be2a7e93580e9dc47781d5d304</span></span>
<span class="line"><span style="color:#A6ACCD;">e9b67a5f95aa857ec4acc2031593930b5eb982f18ecc9230206ccb6f3190f435</span></span>
<span class="line"><span style="color:#A6ACCD;">1ae7107d792dc0486c927fd66ec7755b2a141e6f9b8a812d89237b854895687e</span></span>
<span class="line"><span style="color:#A6ACCD;">b08a9401cc8d0847e553792a3301256f591f98f64ad93e70b61962b081f55c43</span></span>
<span class="line"><span style="color:#A6ACCD;">073a77c06cd7cb61c70861ca5a95e81f265b87f9ebb061168f0980e57d0ffb47</span></span>
<span class="line"><span style="color:#A6ACCD;">e74c929cfb07e440fa319dfd93ff722e6c4bec33d43d1e1387979af493224a1b</span></span>
<span class="line"><span style="color:#A6ACCD;">4765c2d52ee0162518c6757bece9c26b797041460d32e1228e9824309b848417</span></span>
<span class="line"><span style="color:#A6ACCD;">4cc3f10b07ab4f6c1cf531323924972e1ad51a5162a32f556c9aeeed9f4d3046</span></span>
<span class="line"><span style="color:#A6ACCD;">8dd8e9c898fc9d040c45e9b75a61ba1a20215c451cc5f126bd3b96189982ae25</span></span>
<span class="line"><span style="color:#A6ACCD;">cca1414a12c7ad1f86c175d02c65ba30af6730905a1e0e0e3ccba1f8e7a22470</span></span>
<span class="line"><span style="color:#A6ACCD;">2d1040eadebf504b43b9eb1c9dc3d513e27270d36bcae303dd40415682281c18</span></span>
<span class="line"><span style="color:#A6ACCD;">8c5cb2365eb01542cb3d761c2dd2c853cb60d4c3e8f34b228e8aecc5b7917e1d</span></span>
<span class="line"><span style="color:#A6ACCD;">26070861235fa8295c9913affd78072606fd3bcebd461b14f70516ce64291766</span></span>
<span class="line"><span style="color:#A6ACCD;">4813db41e2eb4b4aad197e7ba9fbd648bbab4d91ff8ccc7a9d5adfccee66a978</span></span>
<span class="line"><span style="color:#A6ACCD;">bc0eb896d8e334565f39a814fc07ca47d9a1e503342e85477a7afeaae80f811a</span></span>
<span class="line"><span style="color:#A6ACCD;">81ef2af4e177d55973dc95d21ecf901e175d39718016d6462a6e1ab408f32639</span></span>
<span class="line"><span style="color:#A6ACCD;">dd733ed9e98c2c4add0abb873875c53a2273c7a99d50613402bc0a55f021bd2b</span></span>
<span class="line"><span style="color:#A6ACCD;">37a8d36fa4d46f12c98f5751c415b25afaced9980badea5e3bebe4972a465577</span></span>
<span class="line"><span style="color:#A6ACCD;">f647d7e07ed9777146afefa66f0d4b788464bcc92deb2c4cd11d0e6fec8b090b</span></span>
<span class="line"><span style="color:#A6ACCD;">db3e34455fb2bc103db95b0e95203f4ae138a61705259c6ceddc878fdaa91132</span></span>
<span class="line"><span style="color:#A6ACCD;">4c8bd97edd46ff4be1a6670b93a5b943cb191e8920561d6bce2a8d8843e70f0d</span></span>
<span class="line"><span style="color:#A6ACCD;">5ad355d434e2d67efae9af62d8d6a70c27afa54990e8d768516db150ae0bf74e</span></span>
<span class="line"><span style="color:#A6ACCD;">ab8bcdeb47832b74b21308918e21501f45f8d47ad93fd5478660f3a490cda763</span></span>
<span class="line"><span style="color:#A6ACCD;">cfdd8be8aea8145a628b8361b7d0b35d393039bc71b303693b6b947c8eaa7f03</span></span>
<span class="line"><span style="color:#A6ACCD;">eb075afa9db89d5e295d8e8580973b70070fd56385d1177431435ecf4c6c0832</span></span>
<span class="line"><span style="color:#A6ACCD;">336cd97a951d11454f751177a4f7ce765bfb289373250f67de6e014d1e2d4471</span></span>
<span class="line"><span style="color:#A6ACCD;">47334748d3f9783b19e9ffb8369729356a8a7433bb0ff13d9a3421ff4a69cc38</span></span>
<span class="line"><span style="color:#A6ACCD;">4ab96fe814b608441af726ee878a9963785e6e7b0977ea172e9d37b5139f7e04</span></span>
<span class="line"><span style="color:#A6ACCD;">opt_db-data</span></span>
<span class="line"><span style="color:#A6ACCD;">8736810a0a9dc33d54fbbb0fccb2df22c61b15dbe901290138011fb38b70c54b</span></span>
<span class="line"><span style="color:#A6ACCD;">886ea9a437e1cdd24dbc24834da6241c0d3053090c7e33dd99ef22e947166da4</span></span>
<span class="line"><span style="color:#A6ACCD;">88fa6f6b5ea3fe4e33d02a2b3e6a0514a87f98a9f0515e4d47b70fc733aba014</span></span>
<span class="line"><span style="color:#A6ACCD;">a419378381890c40c55931d93405da071599d8ed90d2396730d5a4fc2a331746</span></span>
<span class="line"><span style="color:#A6ACCD;">a5ad4f8b1abe866ea5dc8abedb321607773daa376f2cae69e4cd7da7ecc2dc54</span></span>
<span class="line"><span style="color:#A6ACCD;">b479fbe1bf60c442b05bc06b3194b679b88860845d26675e678c6287dc788350</span></span>
<span class="line"><span style="color:#A6ACCD;">d4298bc19bfa0a35d6ea433b339f536900d03bfab421452f3d76883116bbe246</span></span>
<span class="line"><span style="color:#A6ACCD;">fe1e397e85044a31d3426acb28c0e32f8bf1da16cece7f06c620fdc0411b5a06</span></span>
<span class="line"><span style="color:#A6ACCD;">23c47dd545413a6edff4e0944436f373dc208861584e9b4e120d26e33a4a8d14</span></span>
<span class="line"><span style="color:#A6ACCD;">875efb17ea787569e3becba22355f949810c24f7838bbe5e5b69bb9d24f81b14</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Deleted Networks:</span></span>
<span class="line"><span style="color:#A6ACCD;">root_default</span></span>
<span class="line"><span style="color:#A6ACCD;">opt_default</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Total reclaimed space: 3.778 GB</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">root@localhost /</span><span style="color:#89DDFF;">]</span><span style="color:#676E95;"># </span></span>
<span class="line"></span></code></pre></div><h2 id="问题-dockfile中的cmd命令只对最后一条生效-因此使用sh脚本同时启动tomcat和jar" tabindex="-1">问题：Dockfile中的CMD命令只对最后一条生效，因此使用sh脚本同时启动tomcat和jar <a class="header-anchor" href="#问题-dockfile中的cmd命令只对最后一条生效-因此使用sh脚本同时启动tomcat和jar" aria-hidden="true">#</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#!/bin/bash</span></span>
<span class="line"><span style="color:#A6ACCD;">java -jar /opt/jarpackage/serviceback.jar </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> wps-1ogs.log </span><span style="color:#89DDFF;">2&gt;&amp;1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/local/apache-tomcat-9.0.34/bin/startup.sh run </span><span style="color:#89DDFF;">&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">tail -F /usr/local/apache-tomcat-9.0.34/logs/catalina.out </span><span style="color:#89DDFF;">&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">tail -F /opt/jarpackage/wps-1ogs.log</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>然后再执行脚本 并且暴露端口号 ，要给sh脚本执行权限</p><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> ./start.sh /opt/start.sh</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> chmod +x /opt/start.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8080</span></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8003</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># CMD  startup.sh &amp;&amp; tail -F /usr/local/apache-tomcat-9.0.34/logs/catalina.out </span></span>
<span class="line"><span style="color:#F78C6C;">CMD</span><span style="color:#A6ACCD;"> [</span><span style="color:#C3E88D;">&quot;/opt/start.sh&quot;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h2 id="导出容器包-在服务上导入并执行" tabindex="-1">导出容器包-在服务上导入并执行 <a class="header-anchor" href="#导出容器包-在服务上导入并执行" aria-hidden="true">#</a></h2><p>docker save -o mcr_jdk_v20.tar mcr2017jdk8:v20</p><p>docker load -i mcr_jdk_v20.tar</p><p>docker run -d -p 8085:8080 -p 8086:8003 -v /home/wanghaihang/webapps:/usr/local/apache-tomcat-9.0.34/webapps -v /home/wanghaihang/jarpackage:/opt/jarpackage --restart=always</p><p>docker run -d -p 8085:8080 -p 8086:8003 -v /home/wanghaihang/webapps:/usr/local/apache-tomcat-9.0.34/webapps -v /home/wanghaihang/jarpackage:/opt/jarpackage -v /home/wanghaihang/lib:/opt/lib --restart=always mcr2017_jdk8:v20</p><p>docker run -d -p 8085:8080 -p 8086:8003 -v /home/wanghaihang/webapps:/usr/local/apache-tomcat-9.0.34/webapps -v /home/wanghaihang/jarpackage:/opt/jarpackage -v /home/wanghaihang/lib:/opt/lib -v /home/wanghaihang/lib:/opt/lib --restart=always mcr2017_jdk8:v20</p><p><img src="`+c+'" alt=""></p><p>去掉char()重新编译 k_(&#39;/home/wanghaihang/Matlab/clay_/clay_.tif&#39;,&#39;/home/wanghaihang/Matlab/clay_/sand_.tif&#39;,&#39;/home/wanghaihang/Matlab/clay_/silt_.tif&#39;,&#39;/home/wanghaihang/Matlab/clay_/soc_.tif&#39;,&#39;/home/wanghaihang/Matlab/clay_/res.tif&#39;)</p><p>docker run -d -p 8085:8080 -p 8086:8003 -v /home/wanghaihang/webapps:/usr/local/apache-tomcat-9.0.34/webapps -v /home/wanghaihang/jarpackage:/opt/jarpackage -v /home/wanghaihang/lib:/opt/lib -v /home/wanghaihang/lib:/opt/lib -v /home/wanghaihang/upload:/opt/upload --restart=always mcr_jdk_py:v23</p>',115),r=[t];function i(d,C,A,y,b,h){return s(),n("div",null,r)}const D=a(o,[["render",i]]);export{u as __pageData,D as default};
