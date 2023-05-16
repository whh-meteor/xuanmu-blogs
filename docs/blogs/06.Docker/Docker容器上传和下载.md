# docker 容器的上传和下载

## 1、上传文件到容器
`docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH `

参数说明：
    - OPTIONS： 可选参数为 -L，表示保持源目标中的链接；
    - SRC_PATH：为主机中要上传到容器的文件路径；
    - CONTAINER：为容器ID或容器名称；
    - DEST_PATH：为要存放上传文件的容器路径；

例如： `docker cp /home/temp.txt redis:/data/` 表示上传主机目录为 `/home/temp.txt` 的文件到 redis 容器的 `/data/` 路径下。

## 2、从容器中下载文件

`docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH`
参数说明：

- OPTIONS： 可选参数为 -L，表示保持源目标中的链接；
- CONTAINER：为容器ID或容器名称；
- SRC_PATH：为容器的文件路径；
- DEST_PATH：为存放下载文件的主机目录路径；
  
比如： `docker cp redis:/data/temp.txt /home/` 表示下载 redis 容器中路径为 `/data/temp.txt` 的文件到主键目录 /home/ 中。

