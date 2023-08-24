## 安装jdk


```sh
#进入usr文件目录
cd /usr
#创建Java文件夹
mkdir java

tar -zxvf jdk-11_linux-x64_bin.tar

```

配置环境

```sh
进入配置文件
vi /etc/profile
输入i进入编辑模式
export JAVA_HOME=/usr/java/jdk-11 
#后接JDK的路径
export PATH=$JAVA_HOME/bin:$PATH
 
按ESC 退出按钮，输入:wq 退出和保存文件
```


```sh
刷新配置文件
source /etc/profile
```


```sh
测试java版本
java -version
```

## 安装Marlab Component Runtime （MCR）


解压MCR文件
```sh
unzip MCR_R2017a_glnxa64_installer.zip
```

如果-bash: unzip: 未找到命令

```sh
sudo yum install unzip (CentOS)
sudo apt-get install unzip(Ubuntu)
```
静默安装
```sh
./install -mode silent -agreeToLicense yes
```

```
Preparing installation files ...
Installing ...
(八月 24, 2023 09:13:46) ##################################################################
(八月 24, 2023 09:13:46) #
(八月 24, 2023 09:13:46) # Today's Date: 
(八月 24, 2023 09:13:46) Thu Aug 24 09:13:46 CST 2023
(八月 24, 2023 09:13:46) 
(八月 24, 2023 09:13:46) System Info
(八月 24, 2023 09:13:46) OS: Linux 3.10.0-1160.88.1.el7.x86_64
(八月 24, 2023 09:13:46) Arch: amd64
(八月 24, 2023 09:13:46) Data Model: 64
(八月 24, 2023 09:13:46) Language: zh
(八月 24, 2023 09:13:46) Java Vendor: Oracle Corporation
(八月 24, 2023 09:13:46) Java Home: /tmp/mathworks_5013/sys/java/jre/glnxa64/jre
(八月 24, 2023 09:13:46) Java Version: 1.7.0_60
(八月 24, 2023 09:13:46) Java VM Name: Java HotSpot(TM) 64-Bit Server VM
(八月 24, 2023 09:13:46) Java Class Path: /tmp/mathworks_5013/java/config/installagent/pathlist.jar
(八月 24, 2023 09:13:46) User Name: root
(八月 24, 2023 09:13:46) Current Directory: /tmp/mathworks_5013
(八月 24, 2023 09:13:46) Input arguments: 
(八月 24, 2023 09:13:46) root /usr/mcr
(八月 24, 2023 09:13:46) libdir /tmp/mathworks_5013
(八月 24, 2023 09:13:46) mode silent
(八月 24, 2023 09:13:46) agreeToLicense yes
(八月 24, 2023 09:13:46) standalone true
(八月 24, 2023 09:13:46) connectionMode OFFLINE_ONLY
(八月 24, 2023 09:13:47) Starting local product/component search in download directory
(八月 24, 2023 09:13:48) Searching for archives...
(八月 24, 2023 09:13:48) Reading /usr/mcr/archives
(八月 24, 2023 09:13:48) 正在汇集产品列表...
(八月 24, 2023 09:13:48) 1467 files found in /usr/mcr/archives
(八月 24, 2023 09:13:48) Reading /usr/mcr
(八月 24, 2023 09:13:48) 9 files found in /usr/mcr
(八月 24, 2023 09:13:48) Archive search complete.  1476 total files found.
(八月 24, 2023 09:13:50) Completed local product/component search
(八月 24, 2023 09:13:50) Starting local product/component search in download directory
(八月 24, 2023 09:13:50) Searching for archives...
(八月 24, 2023 09:13:50) /usr/local/MATLAB/MATLAB_Runtime/v92/archives doesn't exist ... skipping.
(八月 24, 2023 09:13:50) Archive search complete.  0 total files found.
(八月 24, 2023 09:13:50) Completed local product/component search
(八月 24, 2023 09:13:50) Installing Product: MATLAB Runtime - Builder JA 9.2
(八月 24, 2023 09:13:52) Installing Product: MATLAB Runtime - Core 9.2
(八月 24, 2023 09:14:12) Installing Product: MATLAB Runtime - GPU 9.2
(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - Hadoop And Spark 9.2
(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - NET And XL 9.2
(八月 24, 2023 09:14:26) Installing Product: MATLAB Runtime - Numerics 9.2
(八月 24, 2023 09:14:38) Notes: 
在目标计算机上，将以下内容追加到环境变量 LD_LIBRARY_PATH 的末尾:

/usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:


(八月 24, 2023 09:14:38) Exiting with status 0
(八月 24, 2023 09:14:38) End - Successful.
Finished
```


可以在末尾处添加

```
export LD_LIBRARY_PATH=/usr/local/MATLAB/MATLAB_Runtime/v92/runtime/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/bin/glnxa64:/usr/local/MATLAB/MATLAB_Runtime/v92/sys/os/glnxa64:
```


刷新环境变量

```source /etc/profile```

## Docker拉取 Tomcat
拉取docker镜像

`docker pull tomcat:9.0.34`
 
 挂载数据卷


`docker run --name gdsp-wps -d -p 8088:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps  docker.io/tomcat:9.0.43`


以root权限进入容器
`docker exec -it --user=root 6bc6 /bin/sh `


查看日志
`tail -f catalina.2023-08-24.log -n 1000`






## WPS服务执行Matlab配置

java builder 放入lib并挂载到docker中


`docker run --name gdsp-wps -d -p 8088:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps  -v /opt/wanghaihang/lib:/usr/local/tomcat/lib docker.io/tomcat:9.0.43`

docker run --name wps -d -p 8087:8080 -v /opt/wanghaihang/warPackage:/usr/local/tomcat/webapps -v /opt/wanghaihang/lib:/usr/local/tomcat/lib  docker.io/tomcat:9.0.43

## 问题
### 高版本 tomcat webapp访问目录无权限
 cp -r webapps.dist/* webapps
```
cp: cannot create directory 'webapps/ROOT': Permission denied
cp: cannot create directory 'webapps/docs': Permission denied
cp: cannot create directory 'webapps/examples': Permission denied
cp: cannot create directory 'webapps/host-manager': Permission denied
cp: cannot create directory 'webapps/manager': Permission denied
```

查看webapps提示没有权限。


原因：

centos7中安全模块selinux把权限禁掉了。

有三种方法解决：

1.在运行时加 --privileged=true

```sh
[xuhaixing@localhost tomcat]$ docker run -d -p 9091:8080 -v /home/XXXX/docker/tomcat/webapps/:/usr/local/tomcat/webapps/ --privileged=true --name managertomcat XXXX/mytomcat
c512137b74f3366da73ff80fc1fd232cc76c95b52a4bab01f1f5d89d28185b28
[xuhaixing@localhost tomcat]$ ls
```
 

2.临时关闭selinux然后再打开
    
 

```sh
[root@localhost tomcat]# setenforce 0
[root@localhost tomcat]# setenforce 1
```
 

3.添加linux规则，把要挂载的目录添加到selinux白名单

更改安全性文本的格式如下
`chcon [-R] [-t type] [-u user] [-r role] 文件或者目录`

选顷不参数： 
-R  ：该目录下的所有目录也同时修改； 
-t  ：后面接安全性本文的类型字段，例如 httpd_sys_content_t ； 
-u  ：后面接身份识别，例如 system_u； 
-r  ：后面街觇色，例如 system_r
执行：

`chcon -Rt svirt_sandbox_file_t /home/XXXX/docker/tomcat/webapps/`