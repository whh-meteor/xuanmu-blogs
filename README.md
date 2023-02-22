# xuanmu-blogs

## 介绍
{**以下是 Gitee 平台说明，您可以替换此简介**
 该博客主要用于个人使用。内容不限于个人经验，网络教程，如内容侵权请联系v：xuanmu9878！

## 软件架构
vitepress、Gitee


## 安装教程
### vscode 插件安装
、Paste Image、Markdown Previre Github、Markdown All in One
### 使用命令
1.  git clone 
2.  npm install 
3.   npm run build
4.   npm run serve

## 使用说明

### 组件修改 
   自动生成目录组件 vitepress-plugin-autobar

   加入第三个参数 SeconDir
   ```javascript
    // Return sidebar config for given baseDir.
    function side(baseDir, options,SeconDir) {
        var mdFiles = getChildren(baseDir, options === null || options === void 0 ? void 0 : options.ignoreMDFiles);
        console.info("mdFiles:"+mdFiles)
        var sidebars = [];
        // strip number of folder's name
        mdFiles.forEach(function (item) {
        
            var _a;
            var dirName = getDirName(item);
            if (((_a = options === null || options === void 0 ? void 0 : options.ignoreDirectory) === null || _a === void 0 ? void 0 : _a.length)
                && (options === null || options === void 0 ? void 0 : options.ignoreDirectory.findIndex(function (item) { return getDirName(item) === dirName; })) !== -1) {
                return;
            }
            var mdFileName = getName(item);
       
            var sidebarItemIndex = sidebars.findIndex(function (sidebar) { return sidebar.text === dirName; });
            if (sidebarItemIndex !== -1) {
                sidebars[sidebarItemIndex].items.push({
                    text: mdFileName,
                    link: SeconDir+item,
                });
            }
            else {
                sidebars.push({
                    text: dirName,
                    collapsible: true,//添加收缩
                    items: [{
                            text: mdFileName,
                            link: SeconDir+item,
                        }],
                });
            }
        });
        console.info('sidebar is create:', JSON.stringify(sidebars));
        return sidebars;
    }
       /**
     * Returns `sidebar` configuration for VitePress calculated using structure of directory and files in given path.
     * @param   {String}    rootDir   - Directory to get configuration for.
     * @param   {Options}    options   - Option to create configuration.
     */
    var getSideBar = function (rootDir, options,SeconDir) {
    
        if (rootDir === void 0) { rootDir = './'; }
        return side(rootDir, options,SeconDir);
    };
    exports.getSideBar = getSideBar;

   ```

   在vitepress中就可以设置不同页面的不同目录
   ```javascript
     // 左侧边栏配置
            sidebar: {
                '/blogs/':getSideBar("./docs/blogs/",{  ignoreMDFiles : [ 'index' ] , 
                ignoreDirectory : [ 'node_modules' ]  },  "/blogs/" ),
                '/knowledge/':getSideBar("./docs/knowledge/",{ ignoreMDFiles : [ 'index' ] , 
                ignoreDirectory : [ 'node_modules' ] },"/knowledge/"),
                '/idea/':getSideBar("./docs/idea/",{ ignoreMDFiles : [ 'index' ] , 
                ignoreDirectory : [ 'node_modules' ] },"/idea/")
            },
   ```
### 样式修改：
    在docs/.vitepress/theme/style
3.  npm run dev 测试环境
4.  npm run serve 发布环境

## 参与贡献

1.  旋木：页面搭建、日常维护、内容更新 E-mail： martleth@163.com

 