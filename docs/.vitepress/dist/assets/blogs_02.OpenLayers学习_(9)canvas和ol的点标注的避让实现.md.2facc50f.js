import{_ as s,o as n,c as a,d as l}from"./app.8d7c829b.js";const p="/xuanmu-blogs/assets/img-2023-01-05-00-12-26.2f328560.png",e="/xuanmu-blogs/assets/img-2023-01-05-00-12-48.eb0efd12.png",t="/xuanmu-blogs/assets/img-2023-01-05-00-13-36.e2dd7314.png",x=JSON.parse('{"title":"基于canvas和ol的点标注的避让实现","description":"","frontmatter":{},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"效果","slug":"效果","link":"#效果","children":[]},{"level":2,"title":"实现","slug":"实现","link":"#实现","children":[]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"实现代码","slug":"实现代码","link":"#实现代码","children":[]}],"relativePath":"blogs/02.OpenLayers学习/(9)canvas和ol的点标注的避让实现.md"}'),o={name:"blogs/02.OpenLayers学习/(9)canvas和ol的点标注的避让实现.md"},c=l('<h1 id="基于canvas和ol的点标注的避让实现" tabindex="-1">基于canvas和ol的点标注的避让实现 <a class="header-anchor" href="#基于canvas和ol的点标注的避让实现" aria-hidden="true">#</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-hidden="true">#</a></h2><p>在做地图的时候，点的标注展示是一个非常常见的功能，但是实际中点在某些区域比较密集是非常常见的，但是业务表达中却需要将之展示出来。基于此需求，本文结合canvas和ol做一简单的实现。</p><h2 id="效果" tabindex="-1">效果 <a class="header-anchor" href="#效果" aria-hidden="true">#</a></h2><p><img src="'+p+'" alt=""></p><p><img src="'+e+'" alt=""></p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-hidden="true">#</a></h2><p>1.密集区点的标注通过牵引线的方式引出展示； 2.地图放大的时候更新展示；</p><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-hidden="true">#</a></h2><p><img src="'+t+`" alt=""></p><h2 id="实现代码" tabindex="-1">实现代码 <a class="header-anchor" href="#实现代码" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const points = [</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应该&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 110.15558, 19.91038 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 113.52309, 22.21177 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应该&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 114.23454, 22.21177 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测该很长&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 119.35695, 26.06293 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应该称应该&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 120.11582, 30.07927 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 121.49129, 31.14058 ] } },</span></span>
<span class="line"><span style="color:#A6ACCD;"> { &quot;properties&quot;: {&quot;name&quot;:&quot;测试名称应该&quot;}, &quot;geometry&quot;: { &quot;type&quot;: &quot;Point&quot;, &quot;coordinates&quot;: [ 117.03289, 23.5228 ] } }</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">let canvasFunction = function (extent, resolution, pixelRatio, size, projection) {</span></span>
<span class="line"><span style="color:#A6ACCD;"> const canvasWidth = size[0]</span></span>
<span class="line"><span style="color:#A6ACCD;"> const canvasHeight = size[1]</span></span>
<span class="line"><span style="color:#A6ACCD;"> const [w, h] = map.getSize()</span></span>
<span class="line"><span style="color:#A6ACCD;"> const xoff = canvasWidth - w,</span></span>
<span class="line"><span style="color:#A6ACCD;">   yoff = canvasHeight - h</span></span>
<span class="line"><span style="color:#A6ACCD;"> const canvas = document.createElement(&#39;canvas&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"> canvas.width = canvasWidth</span></span>
<span class="line"><span style="color:#A6ACCD;"> canvas.height = canvasHeight</span></span>
<span class="line"><span style="color:#A6ACCD;"> const context = canvas.getContext(&#39;2d&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"> // 数据聚类处理，根据上下和左右的距离进行判断</span></span>
<span class="line"><span style="color:#A6ACCD;"> function clusterData(data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   let res = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">   let clusterTest = function (pixel, tolrance = [200, 30]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     let r = pixel.join(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">     const [x, y] = pixel</span></span>
<span class="line"><span style="color:#A6ACCD;">     for (let key in res) {</span></span>
<span class="line"><span style="color:#A6ACCD;">       const [_x, _y] = key.split(&#39;,&#39;).map(Number)</span></span>
<span class="line"><span style="color:#A6ACCD;">       const dx = Math.abs(x - _x),</span></span>
<span class="line"><span style="color:#A6ACCD;">         dy = Math.abs(y - _y)</span></span>
<span class="line"><span style="color:#A6ACCD;">       if(dx &lt; tolrance[0] &amp;&amp; dy &lt; tolrance[1]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">         r = key</span></span>
<span class="line"><span style="color:#A6ACCD;">         break</span></span>
<span class="line"><span style="color:#A6ACCD;">       }</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">     return r</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">   for (let i = 0; i &lt; data.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     const d = data[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">     const coords = ol.proj.fromLonLat(d.geometry.coordinates)</span></span>
<span class="line"><span style="color:#A6ACCD;">     let pixel = map.getPixelFromCoordinate(coords)</span></span>
<span class="line"><span style="color:#A6ACCD;">     pixel = [pixel[0]  + xoff / 2, pixel[1] + yoff / 2].map(p =&gt; Math.round(p))</span></span>
<span class="line"><span style="color:#A6ACCD;">     d.pixel = pixel</span></span>
<span class="line"><span style="color:#A6ACCD;">     let key = pixel.join(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">     const width = 26 * 2 + 6 + context.measureText(d.properties.name).width</span></span>
<span class="line"><span style="color:#A6ACCD;">     key = clusterTest(pixel, [width, 30])</span></span>
<span class="line"><span style="color:#A6ACCD;">     if(!res[key]) res[key] = []</span></span>
<span class="line"><span style="color:#A6ACCD;">     res[key].push(d)</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">   return res</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> // 绘制两边为圆的矩形</span></span>
<span class="line"><span style="color:#A6ACCD;"> function drawRoundRect (ctx, x, y, width, height = 24, fillStyle = &#39;rgba(14,77,137,0.75)&#39;) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   const r = height / 2</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fillStyle = fillStyle</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.moveTo(x + r, y)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.lineTo(x + width - r, y)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 0.5)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.lineTo(x + r, y + height)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI * 1.5)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.closePath()</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fill()</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> // 绘制feature</span></span>
<span class="line"><span style="color:#A6ACCD;"> function drawFeature (ctx, x = 10, y = 10, text, notCluster = true, index = 0) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   let height = 26, width = height * 2 + 6,  r = height / 2</span></span>
<span class="line"><span style="color:#A6ACCD;">   if(notCluster) width += ctx.measureText(text).width</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.save()</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 如果有聚类，则避让绘制文字，放在前面是为了让指引线在下面</span></span>
<span class="line"><span style="color:#A6ACCD;">   if(!notCluster &amp;&amp; map.getView().getZoom() &gt; 4) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     const radius = 60</span></span>
<span class="line"><span style="color:#A6ACCD;">     const ang  = (-index * 40 - 115) / 180 * Math.PI ;</span></span>
<span class="line"><span style="color:#A6ACCD;">     const cx = x + r, cy = y + height - r</span></span>
<span class="line"><span style="color:#A6ACCD;">     const px = cx + Math.sin(ang) * radius,</span></span>
<span class="line"><span style="color:#A6ACCD;">       py = cy + Math.cos(ang) * radius</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 绘制牵引线</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.strokeStyle = &#39;rgba(14,77,137,0.75)&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.lineWidth = 2</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.moveTo(cx, cy)</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.lineTo(px, py)</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.stroke()</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 绘制牵引线终点小圆圈</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fillStyle = &#39;rgba(14,77,137,1)&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.arc(px, py, 2, 0, Math.PI * 2)</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fill()</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 绘制矩形</span></span>
<span class="line"><span style="color:#A6ACCD;">     const h = 18</span></span>
<span class="line"><span style="color:#A6ACCD;">     const w = ctx.measureText(text).width + 12</span></span>
<span class="line"><span style="color:#A6ACCD;">     drawRoundRect(ctx, px - w - 2, py - h / 2 - 1, w, h, &#39;rgba(14,77,137,0.5)&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 绘制文字</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fillStyle = &#39;rgb(255,255,255)&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.textAlign = &#39;right&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.textBaseline = &#39;middle&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fillText(text, px - 7, py)</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 绘制矩形</span></span>
<span class="line"><span style="color:#A6ACCD;">   drawRoundRect(ctx, x, y, width, height)</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 绘制左边的图标</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">   const radialLeft = ctx.createRadialGradient(x + r, y + height - r, 0, x + r, y + height - r, r)</span></span>
<span class="line"><span style="color:#A6ACCD;">   radialLeft.addColorStop(0, &#39;#fff&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   radialLeft.addColorStop(1, &#39;rgba(255,255,255,0)&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fillStyle = radialLeft</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.arc(x + r, y + height - r, r, 0, Math.PI * 2)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fill()</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 绘制右边的图标</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">   const radialRight = ctx.createRadialGradient(x + width - r, y + r, 0, x + width - r, y + r, r)</span></span>
<span class="line"><span style="color:#A6ACCD;">   radialRight.addColorStop(0, &#39;#fff&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   radialRight.addColorStop(1, &#39;rgba(255,255,255,0)&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fillStyle = radialRight</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.arc(x + width - r, y + r, r, 0, Math.PI * 2)</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.fill()</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 如果没有聚类，则绘制文字</span></span>
<span class="line"><span style="color:#A6ACCD;">   if(notCluster) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fillStyle = &#39;#fff&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.beginPath()</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.textAlign = &#39;left&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.textBaseline = &#39;middle&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">     ctx.fillText(text, x + height + 3, y + height - r)</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">   ctx.restore()</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> const cluster = clusterData(points)</span></span>
<span class="line"><span style="color:#A6ACCD;"> for (let key in cluster) {</span></span>
<span class="line"><span style="color:#A6ACCD;">   const data = cluster[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">   const showText = data.length === 1</span></span>
<span class="line"><span style="color:#A6ACCD;">   data.forEach((d, index) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">     const [x, y] = d.pixel</span></span>
<span class="line"><span style="color:#A6ACCD;">     drawFeature(context, x, y, d.properties.name, showText, index)</span></span>
<span class="line"><span style="color:#A6ACCD;">   })</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"> return canvas;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">const layer = new ol.layer.Image({</span></span>
<span class="line"><span style="color:#A6ACCD;"> source: new ol.source.ImageCanvas({</span></span>
<span class="line"><span style="color:#A6ACCD;">   canvasFunction: canvasFunction</span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">map.addLayer(layer);</span></span>
<span class="line"><span style="color:#A6ACCD;">script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,12),i=[c];function r(C,A,y,u,D,d){return n(),a("div",null,i)}const q=s(o,[["render",r]]);export{x as __pageData,q as default};
