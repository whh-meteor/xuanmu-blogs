import{_ as s,o as n,c as a,d as e}from"./app.96260a0d.js";const p="/xuanmu-blogs/assets/img-2023-02-23-17-28-13.a5da6078.png",l="/xuanmu-blogs/assets/img-2023-02-23-17-27-36.1243199b.png",t="/xuanmu-blogs/assets/img-2023-02-23-17-32-09.bcaab902.png",o="/xuanmu-blogs/assets/img-2023-02-23-17-51-26.6ce63cae.png",_=JSON.parse('{"title":"旋木博客 仓库架构","description":"","frontmatter":{},"headers":[{"level":2,"title":"1.代码提交到Gitee","slug":"_1-代码提交到gitee","link":"#_1-代码提交到gitee","children":[]},{"level":2,"title":"2.Github 自动化","slug":"_2-github-自动化","link":"#_2-github-自动化","children":[]},{"level":2,"title":"Github pages自动部署","slug":"github-pages自动部署","link":"#github-pages自动部署","children":[]},{"level":2,"title":"报错 403 分支部署 无权限","slug":"报错-403-分支部署-无权限","link":"#报错-403-分支部署-无权限","children":[]}],"relativePath":"blogs/01.博客搭建/博客架构.md"}'),c={name:"blogs/01.博客搭建/博客架构.md"},i=e('<h1 id="旋木博客-仓库架构" tabindex="-1">旋木博客 仓库架构 <a class="header-anchor" href="#旋木博客-仓库架构" aria-hidden="true">#</a></h1><h2 id="_1-代码提交到gitee" tabindex="-1">1.代码提交到Gitee <a class="header-anchor" href="#_1-代码提交到gitee" aria-hidden="true">#</a></h2><p>在ignore中忽略依赖和系统文件</p><p><img src="'+p+'" alt=""></p><p>开启镜像仓库-将Gitee代码同步到Github仓库</p><p><img src="'+l+`" alt=""></p><h2 id="_2-github-自动化" tabindex="-1">2.Github 自动化 <a class="header-anchor" href="#_2-github-自动化" aria-hidden="true">#</a></h2><p>事件监听，当page build 时，自动部署dist目录到gitee page中，避免手动部署。</p><p>sync.yml</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">name: Sync</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">on: page_build</span></span>
<span class="line"><span style="color:#A6ACCD;"># on:</span></span>
<span class="line"><span style="color:#A6ACCD;">#   branch_protection_rule:</span></span>
<span class="line"><span style="color:#A6ACCD;">#     types: [created,edited, deleted]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  build:</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">      # - name: Sync to Gitee</span></span>
<span class="line"><span style="color:#A6ACCD;">      #   uses: wearerequired/git-mirror-action@master</span></span>
<span class="line"><span style="color:#A6ACCD;">      #   env:</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     # 注意在 Settings-&gt;Secrets 配置 GITEE_RSA_PRIVATE_KEY</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     SSH_PRIVATE_KEY: \${{ secrets.GITEE_RSA_PRIVATE_KEY }}</span></span>
<span class="line"><span style="color:#A6ACCD;">      #   with:</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     # 注意替换为你的 GitHub 源仓库地址</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     source-repo: git@github.com:whh-meteor/xuanmu-blogs.git</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     # 注意替换为你的 Gitee 目标仓库地址</span></span>
<span class="line"><span style="color:#A6ACCD;">      #     destination-repo: git@gitee.com:martleth/xuanmu-blogs.git</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      - name: Build Gitee Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">        uses: yanglbme/gitee-pages-action@main</span></span>
<span class="line"><span style="color:#A6ACCD;">        with:</span></span>
<span class="line"><span style="color:#A6ACCD;">          # 注意替换为你的 Gitee 用户名</span></span>
<span class="line"><span style="color:#A6ACCD;">          gitee-username: martleth</span></span>
<span class="line"><span style="color:#A6ACCD;">          # 注意在 Settings-&gt;Secrets 配置 GITEE_PASSWORD</span></span>
<span class="line"><span style="color:#A6ACCD;">          gitee-password: \${{ secrets.GITEE_PASSWORD }}</span></span>
<span class="line"><span style="color:#A6ACCD;">          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错</span></span>
<span class="line"><span style="color:#A6ACCD;">          gitee-repo: martleth/xuanmu-blogs</span></span>
<span class="line"><span style="color:#A6ACCD;">          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）</span></span>
<span class="line"><span style="color:#A6ACCD;">          branch: master</span></span>
<span class="line"><span style="color:#A6ACCD;">          directory: docs/.vitepress/dist/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="github-pages自动部署" tabindex="-1">Github pages自动部署 <a class="header-anchor" href="#github-pages自动部署" aria-hidden="true">#</a></h2><p>由于仓库存储整个项目文件，github page 只能访问到root 或者 docs目录</p><p>因此我们在gitee中新建分支gh-pages 并且镜像到github中</p><p><img src="`+t+`" alt=""></p><p>再由Github Action 进行页面部署</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">name: Deploy to GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">on:</span></span>
<span class="line"><span style="color:#A6ACCD;">  push:	</span></span>
<span class="line"><span style="color:#A6ACCD;">    branches:	</span></span>
<span class="line"><span style="color:#A6ACCD;">      - master</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">jobs:</span></span>
<span class="line"><span style="color:#A6ACCD;">  deploy:</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: Deploy to GitHub Pages</span></span>
<span class="line"><span style="color:#A6ACCD;">    runs-on: ubuntu-latest</span></span>
<span class="line"><span style="color:#A6ACCD;">    steps:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - uses: actions/checkout@master</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    - name: Deploy</span></span>
<span class="line"><span style="color:#A6ACCD;">      uses: s0/git-publish-subdir-action@develop</span></span>
<span class="line"><span style="color:#A6ACCD;">      env:</span></span>
<span class="line"><span style="color:#A6ACCD;">        REPO: self</span></span>
<span class="line"><span style="color:#A6ACCD;">        BRANCH: gh-pages</span></span>
<span class="line"><span style="color:#A6ACCD;">        FOLDER: docs/.vitepress/dist</span></span>
<span class="line"><span style="color:#A6ACCD;">        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="报错-403-分支部署-无权限" tabindex="-1">报错 403 分支部署 无权限 <a class="header-anchor" href="#报错-403-分支部署-无权限" aria-hidden="true">#</a></h2><p>放开读写权限 <img src="`+o+'" alt=""></p><p>成功访问</p>',19),r=[i];function A(C,g,u,d,h,y){return n(),a("div",null,r)}const b=s(c,[["render",A]]);export{_ as __pageData,b as default};
