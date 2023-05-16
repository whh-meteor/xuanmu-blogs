## 1.下载 ngrok

运行exe 
在网站授权帐户信息到本地配置

![](img/Python部署一个GEE应用/img-2023-01-05-22-32-42.png)

## 2.下载 voila
`mamba install -c conda-forge voila`

![](img/Python部署一个GEE应用/img-2023-01-05-22-33-10.png)

volia 运行程序文件 端口号显示8866  voila --no-browser 28_voila.ipynb

![](img/Python部署一个GEE应用/img-2023-01-05-22-33-23.png)

ngrok 穿透8866    ngrok http 8866


![](img/Python部署一个GEE应用/img-2023-01-05-22-33-30.png)




![](img/Python部署一个GEE应用/img-2023-01-05-22-33-41.png)

![](img/Python部署一个GEE应用/img-2023-01-05-22-33-52.png)

![](img/Python部署一个GEE应用/img-2023-01-05-22-34-00.png)





## 缺点：
1、需要梯子
2、内网穿透访问速度慢
3、依赖于特定端口号（再解决）