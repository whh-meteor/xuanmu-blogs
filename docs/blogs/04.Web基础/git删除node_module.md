# git删除已上传的node_modules文件

新建项目没配置gitignore文件，导致node_modules文件上传到了git仓库，下面是解决方法，可以删除仓库已上传的node_modules文件：

按顺序执行以下命令：

git rm -r --cached node_modules
git commit -m 'delete node_modules file'
git push origin master

