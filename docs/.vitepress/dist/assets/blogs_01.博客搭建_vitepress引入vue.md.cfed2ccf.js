import{_ as s,o as e,c as a,d as n}from"./app.e15b8adf.js";const A=JSON.parse('{"title":"vitepress 引入vue组件","description":"","frontmatter":{},"headers":[{"level":2,"title":"编写VUE组件","slug":"编写vue组件","link":"#编写vue组件","children":[]},{"level":2,"title":"在md界面中使用Vue","slug":"在md界面中使用vue","link":"#在md界面中使用vue","children":[]}],"relativePath":"blogs/01.博客搭建/vitepress引入vue.md"}'),l={name:"blogs/01.博客搭建/vitepress引入vue.md"},t=n(`<h1 id="vitepress-引入vue组件" tabindex="-1">vitepress 引入vue组件 <a class="header-anchor" href="#vitepress-引入vue组件" aria-hidden="true">#</a></h1><h2 id="编写vue组件" tabindex="-1">编写VUE组件 <a class="header-anchor" href="#编写vue组件" aria-hidden="true">#</a></h2><p>首先要明确的一点就是，Vitepress和Vuepress等工具都是尤大团队开发的方便Vue用户进行个人站点搭建的工具，本质上的Vue生态的一部分，所以想要个性化自己的网站，需要先学习Vue，Vitepress是基于Vite和Vue3.x进行开发的，所以这里的开发需要使用Vue3.x的内容。</p><p>我们在整个目录中新建一个compement文件夹，在其中新建一个.vue文件。</p><h2 id="在md界面中使用vue" tabindex="-1">在md界面中使用Vue <a class="header-anchor" href="#在md界面中使用vue" aria-hidden="true">#</a></h2><div class="language-markdown"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#F07178;">title</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">开源项目</span></span>
<span class="line"><span style="color:#F07178;">layout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">home</span></span>
<span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;div class=&quot;test&quot;&gt; 测试一下哈哈哈哈哈 &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;TheProject /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import TheProject from &#39;../../compoment/TheProject.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.test{</span></span>
<span class="line"><span style="color:#A6ACCD;">    color:red</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"></span></code></pre></div>`,6),p=[t];function o(r,c,i,d,u,C){return e(),a("div",null,p)}const h=s(l,[["render",o]]);export{A as __pageData,h as default};
