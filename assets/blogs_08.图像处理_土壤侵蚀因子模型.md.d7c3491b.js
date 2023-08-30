import{_ as s,o as a,c as n,d as l}from"./app.d2608a1e.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"优化输出路径：","slug":"优化输出路径","link":"#优化输出路径","children":[]},{"level":2,"title":"优化计算效率","slug":"优化计算效率","link":"#优化计算效率","children":[]}],"relativePath":"blogs/08.图像处理/土壤侵蚀因子模型.md"}'),p={name:"blogs/08.图像处理/土壤侵蚀因子模型.md"},o=l(`<div class="language-matlab"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">output_grid</span><span style="color:#A6ACCD;"> = </span><span style="color:#82AAFF;">k_</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">sand_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">silt_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">clay_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">soc_path</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 读取Geotiff数据及其地理信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    [sand_data, R_sand] = geotiffread(char(sand_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [silt_data, R_silt] = geotiffread(char(silt_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [clay_data, R_clay] = geotiffread(char(clay_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [soc_data, R_soc] = geotiffread(char(soc_path));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 将数据归一化到范围LO，</span></span>
<span class="line"><span style="color:#A6ACCD;">    sand_data = double(sand_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(sand_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    silt_data = double(silt_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(silt_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    clay_data = double(clay_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(clay_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    soc_data = double(soc_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(soc_data(:));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 检查是否所有的纹理信息都相同</span></span>
<span class="line"><span style="color:#A6ACCD;">    assert(isequal(R_sand, R_silt) </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> isequal(R_sand, R_clay) </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> isequal(R_sand, R_soc), </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Geographic information mismatch</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 计算值</span></span>
<span class="line"><span style="color:#A6ACCD;">    [rows, cols] = size(sand_data);</span></span>
<span class="line"><span style="color:#A6ACCD;">    k_values = zeros(rows, cols);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> i = </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">:rows</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> j = </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">:cols</span></span>
<span class="line"><span style="color:#A6ACCD;">            k_values(i, j) = k_calcu([sand_data(i, j), silt_data(i, j), clay_data(i, j), soc_data(i, j)]);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">end</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 将k值归一化到范围内 [0, 1]</span></span>
<span class="line"><span style="color:#A6ACCD;">    normalized_k_values = (k_values </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> min(k_values(:))) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> (max(k_values(:)) </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> min(k_values(:)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 创建归一化k值的Geotiff</span></span>
<span class="line"><span style="color:#A6ACCD;">    output_filename = </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">normalized_k_values.tif</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    geotiffwrite(output_filename, normalized_k_values, R_sand);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    output_grid = normalized_k_values;</span></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> = </span><span style="color:#82AAFF;">k_calcu</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">mat</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"> disp(mat)</span></span>
<span class="line"><span style="color:#676E95;">%K_CALCU 计算k值</span></span>
<span class="line"><span style="color:#676E95;">%   m   砂粒%</span></span>
<span class="line"><span style="color:#676E95;">%   f   粉沙粒%</span></span>
<span class="line"><span style="color:#676E95;">%   n   黏粒%</span></span>
<span class="line"><span style="color:#676E95;">%   t   有机碳质量分数%</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> isnan(max(mat))</span></span>
<span class="line"><span style="color:#A6ACCD;">    k=</span><span style="color:#89DDFF;">nan</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">else</span></span>
<span class="line"><span style="color:#A6ACCD;">    m=mat(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">);</span><span style="color:#676E95;">% g/kg</span></span>
<span class="line"><span style="color:#A6ACCD;">    f=mat(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    n=mat(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    t=mat(</span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)/</span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;">;</span><span style="color:#676E95;">%soc单位为 dg/kg</span></span>
<span class="line"><span style="color:#A6ACCD;">    sub=m+f+n;</span></span>
<span class="line"><span style="color:#A6ACCD;">    m=m/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    f=f/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    n=n/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    theta=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">-(m/</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    q1=</span><span style="color:#F78C6C;">0.3</span><span style="color:#A6ACCD;">*exp(</span><span style="color:#F78C6C;">0.0256</span><span style="color:#A6ACCD;">*m*(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">-(f/</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">)))+</span><span style="color:#F78C6C;">0.2</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    q2=(f/(f+n))^(</span><span style="color:#F78C6C;">0.3</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    q3=-</span><span style="color:#F78C6C;">0.25</span><span style="color:#A6ACCD;">*t*(exp(-</span><span style="color:#F78C6C;">2.96</span><span style="color:#A6ACCD;">*t+</span><span style="color:#F78C6C;">3.72</span><span style="color:#A6ACCD;">)+t)+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    q4=-</span><span style="color:#F78C6C;">0.7</span><span style="color:#A6ACCD;">*theta/(exp(</span><span style="color:#F78C6C;">22.9</span><span style="color:#A6ACCD;">*theta-</span><span style="color:#F78C6C;">5.51</span><span style="color:#A6ACCD;">)+theta)+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    k=q1*q2*q3*q4;</span></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span></code></pre></div><h2 id="优化输出路径" tabindex="-1">优化输出路径： <a class="header-anchor" href="#优化输出路径" aria-hidden="true">#</a></h2><div class="language-matlab"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">output_grid</span><span style="color:#A6ACCD;"> = </span><span style="color:#82AAFF;">k_</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">sand_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">silt_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">clay_path</span><span style="color:#A6ACCD;">, </span><span style="color:#A6ACCD;">soc_path</span><span style="color:#A6ACCD;">,</span><span style="color:#A6ACCD;">output_path</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 读取Geotiff数据及其地理信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    [sand_data, R_sand] = geotiffread(char(sand_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [silt_data, R_silt] = geotiffread(char(silt_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [clay_data, R_clay] = geotiffread(char(clay_path));</span></span>
<span class="line"><span style="color:#A6ACCD;">    [soc_data, R_soc] = geotiffread(char(soc_path));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 将数据归一化到范围LO，</span></span>
<span class="line"><span style="color:#A6ACCD;">    sand_data = double(sand_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(sand_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    silt_data = double(silt_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(silt_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    clay_data = double(clay_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(clay_data(:));</span></span>
<span class="line"><span style="color:#A6ACCD;">    soc_data = double(soc_data) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> max(soc_data(:));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 检查是否所有的纹理信息都相同</span></span>
<span class="line"><span style="color:#A6ACCD;">    assert(isequal(R_sand, R_silt) </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> isequal(R_sand, R_clay) </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> isequal(R_sand, R_soc), </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Geographic information mismatch</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 计算值</span></span>
<span class="line"><span style="color:#A6ACCD;">    [rows, cols] = size(sand_data);</span></span>
<span class="line"><span style="color:#A6ACCD;">    k_values = zeros(rows, cols);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> i = </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">:rows</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> j = </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">:cols</span></span>
<span class="line"><span style="color:#A6ACCD;">            k_values(i, j) = k_calcu([sand_data(i, j), silt_data(i, j), clay_data(i, j), soc_data(i, j)]);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">end</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 将k值归一化到范围内 [0, 1]</span></span>
<span class="line"><span style="color:#A6ACCD;">    normalized_k_values = (k_values </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> min(k_values(:))) </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> (max(k_values(:)) </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> min(k_values(:)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">% 创建归一化k值的Geotiff</span></span>
<span class="line"><span style="color:#676E95;">%     output_filename = &#39;normalized_k_values.tif&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    geotiffwrite(char(output_path), normalized_k_values, R_sand);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    output_grid = normalized_k_values;</span></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> = </span><span style="color:#82AAFF;">k_calcu</span><span style="color:#A6ACCD;">(</span><span style="color:#A6ACCD;">mat</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"> disp(mat)</span></span>
<span class="line"><span style="color:#676E95;">%K_CALCU 计算k值</span></span>
<span class="line"><span style="color:#676E95;">%   m   砂粒%</span></span>
<span class="line"><span style="color:#676E95;">%   f   粉沙粒%</span></span>
<span class="line"><span style="color:#676E95;">%   n   黏粒%</span></span>
<span class="line"><span style="color:#676E95;">%   t   有机碳质量分数%</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> isnan(max(mat))</span></span>
<span class="line"><span style="color:#A6ACCD;">    k=</span><span style="color:#89DDFF;">nan</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">else</span></span>
<span class="line"><span style="color:#A6ACCD;">    m=mat(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">);</span><span style="color:#676E95;">% g/kg</span></span>
<span class="line"><span style="color:#A6ACCD;">    f=mat(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    n=mat(</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    t=mat(</span><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">)/</span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;">;</span><span style="color:#676E95;">%soc单位为 dg/kg</span></span>
<span class="line"><span style="color:#A6ACCD;">    sub=m+f+n;</span></span>
<span class="line"><span style="color:#A6ACCD;">    m=m/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    f=f/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    n=n/sub*</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    theta=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">-(m/</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    q1=</span><span style="color:#F78C6C;">0.3</span><span style="color:#A6ACCD;">*exp(</span><span style="color:#F78C6C;">0.0256</span><span style="color:#A6ACCD;">*m*(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">-(f/</span><span style="color:#F78C6C;">100</span><span style="color:#A6ACCD;">)))+</span><span style="color:#F78C6C;">0.2</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    q2=(f/(f+n))^(</span><span style="color:#F78C6C;">0.3</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    q3=-</span><span style="color:#F78C6C;">0.25</span><span style="color:#A6ACCD;">*t*(exp(-</span><span style="color:#F78C6C;">2.96</span><span style="color:#A6ACCD;">*t+</span><span style="color:#F78C6C;">3.72</span><span style="color:#A6ACCD;">)+t)+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    q4=-</span><span style="color:#F78C6C;">0.7</span><span style="color:#A6ACCD;">*theta/(exp(</span><span style="color:#F78C6C;">22.9</span><span style="color:#A6ACCD;">*theta-</span><span style="color:#F78C6C;">5.51</span><span style="color:#A6ACCD;">)+theta)+</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    k=q1*q2*q3*q4;</span></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">end</span></span>
<span class="line"></span></code></pre></div><h2 id="优化计算效率" tabindex="-1">优化计算效率 <a class="header-anchor" href="#优化计算效率" aria-hidden="true">#</a></h2><p>我使用了 arrayfun 函数来进行并行化的计算，以替代嵌套的循环。这可以提高计算效率。此外，我在读取 silt、clay 和 soc 数据时，直接舍弃了它们的地理信息，因为它们的地理信息应该与 sand 数据相同。这样可以减少不必要的计算。</p><div class="language-matlab"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki"><code><span class="line"></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function c(t,C,r,A,y,D){return a(),n("div",null,e)}const _=s(p,[["render",c]]);export{F as __pageData,_ as default};
