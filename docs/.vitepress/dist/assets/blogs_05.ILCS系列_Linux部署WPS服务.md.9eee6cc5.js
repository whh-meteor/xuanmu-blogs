import{_ as s,o as a,c as n,d as l}from"./app.d2608a1e.js";const p="/xuanmu-blogs/assets/img-2023-08-26-21-57-50.faa60df5.png",e="/xuanmu-blogs/assets/img-2023-08-27-00-29-01.7e662d5a.png",h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"安装jdk","slug":"安装jdk","link":"#安装jdk","children":[]},{"level":2,"title":"安装Marlab Component Runtime （MCR）","slug":"安装marlab-component-runtime-mcr","link":"#安装marlab-component-runtime-mcr","children":[]},{"level":2,"title":"Docker拉取 Tomcat","slug":"docker拉取-tomcat","link":"#docker拉取-tomcat","children":[]},{"level":2,"title":"WPS服务执行Matlab配置","slug":"wps服务执行matlab配置","link":"#wps服务执行matlab配置","children":[]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"高版本 tomcat webapp访问目录无权限","slug":"高版本-tomcat-webapp访问目录无权限","link":"#高版本-tomcat-webapp访问目录无权限","children":[]}]},{"level":2,"title":"安装本地tomcat","slug":"安装本地tomcat","link":"#安装本地tomcat","children":[]},{"level":2,"title":"Linux重新打包jar包","slug":"linux重新打包jar包","link":"#linux重新打包jar包","children":[]},{"level":2,"title":"虚拟机安装Linux CentOS7","slug":"虚拟机安装linux-centos7","link":"#虚拟机安装linux-centos7","children":[{"level":3,"title":"安装Matlab","slug":"安装matlab","link":"#安装matlab","children":[]}]},{"level":2,"title":"centos安装Docker","slug":"centos安装docker","link":"#centos安装docker","children":[{"level":3,"title":"安装jdk","slug":"安装jdk-1","link":"#安装jdk-1","children":[]}]},{"level":2,"title":"docker","slug":"docker","link":"#docker","children":[{"level":3,"title":"dockerfile","slug":"dockerfile","link":"#dockerfile","children":[]},{"level":3,"title":"matlab在arm64下无法执行","slug":"matlab在arm64下无法执行","link":"#matlab在arm64下无法执行","children":[]}]}],"relativePath":"blogs/05.ILCS系列/Linux部署WPS服务.md"}'),o={name:"blogs/05.ILCS系列/Linux部署WPS服务.md"},c=l(`<h2 id="安装jdk" tabindex="-1">安装jdk <a class="header-anchor" href="#安装jdk" aria-hidden="true">#</a></h2><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">#进入usr文件目录</span></span>
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
<span class="line"></span></code></pre></div>`,100),t=[c];function r(i,C,A,d,u,m){return a(),n("div",null,t)}const D=s(o,[["render",r]]);export{h as __pageData,D as default};
