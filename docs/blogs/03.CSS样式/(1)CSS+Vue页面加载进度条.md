# CSS+Vue实现页面加载进度条
## 一、动画样式

```css
#global_loading{

  background: linear-gradient(to right,rgb(73, 149, 221),#fff,rgb(173, 203, 231));
  height: 4px;
  position: fixed;
  z-index:999;
  width: 0;
  top: 0;
  left: 0;
  animation: grow 1.5s infinite forwards;//重复动画
}
@keyframes grow{
  from{
    width: 0;
  }
  to{

    width: 100%;
  }

}
```
## 二、在路由设置中实现
页面加载钱创建div容器
加载完成后隐藏显示display=none
```javascript

router.beforeEach((to, from, next) => {
    //页面加载前，显示加载条
    let loadingBar = document.getElementById('global_loading')
    if (!loadingBar) {
        loadingBar = document.createElement('div')
        loadingBar.id = 'global_loading'
        document.body.append(loadingBar)
    } else {
        loadingBar.style.display = 'block'
    }
    //0.5秒后跳转下一步
    setTimeout(() => {
        next()
    }, 500)

})
router.afterEach((to, from) => {
    //页面加载完成，顶部加载条消失
    let loadingBar = document.getElementById('global_loading')
    if (loadingBar) {
        loadingBar.style.display = 'none'
    }

})
```

## 三、动画效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206220057869.gif#pic_center)
