---
title: CSS 波浪页脚
description: CSS
date: 2023-02-19
tags:
  - CSS
---
# CSS 波浪页脚
 
<page-view :url="'../../www/CSS波浪页脚.html'" />

<script setup>
import PageView from '../../components/PageView.vue'
</script>
## 代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>飞雪前端艺术</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        * {
            padding: 0;
            margin: 0;
        }

        h1 {
            font-weight: 300;
            letter-spacing: 2px;
            font-size: 48px;
        }

        p {
            font-family: 'Lato', sans-serif;
            letter-spacing: 1px;
            font-size: 30px;
            color: #333333;
        }

        .header {
            position: relative;
            text-align: center;
            background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
            color: white;
        }

        .inner-header {
            height: 65vh;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .flex {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .waves {
            position: relative;
            width: 100%;
            height: 15vh;
            margin-bottom: -7px;
            min-height: 100px;
            max-height: 150px;
        }

        .content {
            position: relative;
            height: 20vh;
            text-align: center;
            background-color: white;
        }

        .parallax>use {
            /* 使use元素执行move-forever动画 */
            animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
        }

        .parallax>use:nth-child(1) {
            /* 延迟2秒启动动画  */
            animation-delay: -2s;
            /* 设置动画持续时间为7秒 */
            animation-duration: 7s;
        }

        .parallax>use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
        }

        .parallax>use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
        }

        .parallax>use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
        }

        @keyframes move-forever {
            0% {
                transform: translate3d(-90px, 0, 0);
            }

            100% {
                transform: translate3d(85px, 0, 0);
            }
        }

        @media (max-width: 768px) {
            .waves {
                height: 40px;
                min-height: 40px;
            }

            .content {
                height: 30vh;
            }

            h1 {
                font-size: 24px;
            }
        }

    </style>
</head>

<body>
    <div class="header">
        <div class="inner-header flex"></div>
        <div>
            <!--
                xmlns:SVG命名看见URI
                viewBox:定义当前视口（viewbox）中绘制区域的位置大小
                preserveeAspectRatio：定义了绘制区域在视口中的对齐方式
                shape-rendering：定义了形状的渲染方式（如何呈现头像的锯齿效果）
             -->
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <!-- 定义一个defs元素，用于存储各种元素的定义，可以被其他元素引用。
                    在defs元素中定义了一个名为“gentle-wave”的路径元素，用于描述波浪形状
                    改路径秒苏联一系列二次贝塞尔曲线的控制点坐标，从而实现了波浪形状 -->
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <!-- 定义一个g元素，用于讲多个图形组合在一期，并应用一些样式
                    在g元素中使用use元素多次引用了赚钱定义的名为gentle-wave的路径元素
                    通过设置不同的x，y坐标和填充颜色，实现了波浪形状和渐变效果 -->
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>

            </svg>
        </div>
    </div>
    <div class="content flex">
        <p>footer</p>
    </div>
</body>

</html> 
```