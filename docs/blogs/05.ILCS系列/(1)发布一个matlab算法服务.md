# 如何在ILCS中发布一个matlab算法服务
--------------------------------------------------------------------------------


::: tip
注意：
/**2022-04-23　王海航**/

1 不同版本的MCR和JDK编译的文件存在执行差异

2 打包好算法后先查看doc下的文档 查看class中是否编译好了执行函数的输入参数，如:
OTSU(int, Object...) - matlab.OTSU.Matlab
Provides the standard interface for calling the OTSU MATLAB function with 2 comma-separated input arguments.

3 在IDEA控制台中，空指针异常，检查请求XML配置文件
::: 

## 1.准备算法文件 
### 1.1 CVA  运行 matlab
```matlab
A1 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t131.tif');
A2 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t132.tif');
A3 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t133.tif');
A4 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t134.tif');
A5 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t135.tif');
A6 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t136.tif');
A7 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t137.tif');
B1 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t181.tif');
B2 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t182.tif');
B3 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t183.tif');
B4 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t184.tif');
B5 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t185.tif');
B6 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t186.tif');
B7 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');
[I,R] = geotiffread('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');
info = geotiffinfo('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');

A1=double(A1);A2=double(A2);A3=double(A3);A4=double(A4);A5=double(A5);A6=double(A6);A7=double(A7);
B1=double(B1);B2 =double(B2);B3 =double(B3);B4 =double(B4);B5 =double(B5);B6 =double(B6);B7=double(B7);

C=sqrt((B1-A1).^2+(B2-A2).^2+(B3-A3).^2+(B4-A4).^2+(B5-A5).^2+(B6-A6).^2+(B7-A7).^2);


 amax = max(max(C));   
amin = min(min(C));  
a1=255*(C-amin)/(amax-amin); 
a1=uint8(a1);
imshow(a1);

outraster = a1;
filename = 'D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif';
geotiffwrite(filename, outraster,R, 'GeoKeyDirectoryTag', info.GeoTIFFTags.GeoKeyDirectoryTag);
```
 #### 输出结果


### 1.2 OTSU 运行 matlab
cva的输出作为OTSU的输入

```matlab
I=im2double(imread('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif'));  %变为双精度，即0-1
subplot(221);imhist(I);            %显示灰度直方图
[M,N]=size(I);                     %得到图像行列像素
number_all=M*N;                    %总像素值
hui_all=0;                         %预设图像总灰度值为0
ICV_t=0;                           %预设最大方差为0

%得到图像总灰度值
for i=1:M
    for j=1:N
        hui_all=hui_all+I(i,j);
    end
end
all_ave=hui_all*255/number_all;   %图像灰度值的总平均值

%t为某个阈值，把原图像分为A部分（每个像素值>=t）与B部分（每个像素值<t）

for t=0:255                       %不断试探最优t值
  % for  t2=1:255
    hui_A=0;                      %不断重置A部分总灰度值
    hui_B=0;        
 %   hui_C=0;
    number_A=0;                   %不断重置A部分总像素
    number_B=0;                   %不断重置B部分总像素
 %    number_C=0;
    for i=1:M                     %遍历原图像每个像素的灰度值
        for j=1:N
            if (I(i,j)*255>=t)    %分割出灰度值》=t的像素
                number_A=number_A+1;  %得到A部分总像素
                hui_A=hui_A+I(i,j);   %得到A部分总灰度值
            elseif (I(i,j)*255<t) %分割出灰度值《t的像素
                number_B=number_B+1;  %得到B部分总像素
                hui_B=hui_B+I(i,j);   %得到B部分总灰度值
                 %           elseif (I(i,j)*255>t1 && I(i,j)*255<t2) %分割出灰度值《t的像素
                   %                 number_C=number_C+1;  %得到B部分总像素
                    %                hui_C=hui_C+I(i,j);   %得到B部分总灰度值
            end
        end
    end
%  end
    PA=number_A/number_all;            %得到A部分像素总数与图像总像素的比列
    PB=number_B/number_all;            %得到B部分像素总数与图像总像素的比列
   %   PC=number_C/number_all;
    A_ave=hui_A*255/number_A;          %得到A部分总灰度值与A部分总像素的比例
    B_ave=hui_B*255/number_B;          %得到B部分总灰度值与B部分总像素的比例
  %    C_ave=hui_C*255/number_C;
    ICV=PA*((A_ave-all_ave)^2)+PB*((B_ave-all_ave)^2); %+PC*((C_ave-all_ave)^2);  %Otsu算法
   if (ICV>ICV_t)                     %不断判断，得到最大方差
        ICV_t=ICV;
        k=t;                           %得到最大方差的最优阈值
    end

end

[I,R] = geotiffread('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif');
info = geotiffinfo('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif');

Th=k;
for i=1:M
    for j=1:N
        if I(i,j)>=Th
            I(i,j)=255;
        else
            I(i,j)=0;
        end
    end
end
figure,imshow(I);

outraster = I;
%imagesc(outraster);
filename = 'D:\ILCS4MatlabService\CVA-OSTU\OTSU_Result\OTSU_Res.tif';
geotiffwrite(filename, outraster,R, 'GeoKeyDirectoryTag', info.GeoTIFFTags.GeoKeyDirectoryTag);

```

#### 运行结果


## 2 改造算法文件
### 2.1注释掉 所有 imshow 界面显示的函数


### 2.2 将算法改为函数执行方式
其中r为返回值 - 将计算得到的阈值作为返回值
CVA
```matlab
function r = CVA(pa1,pa2,pa3,pa4,pa5,pa6,pa7,pb1,pb2,pb3,pb4,pb5,pb6,pb7,res) 
%A1 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t131.tif');
%A2 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t132.tif');
%A3 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t133.tif');
%A4 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t134.tif');
%A5 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t135.tif');
%A6 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t136.tif');
%A7 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t137.tif');
%B1 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t181.tif');
%B2 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t182.tif');
%B3 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t183.tif');
%B4 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t184.tif');
%B5 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t185.tif');
%B6 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t186.tif');
%B7 = imread('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');
%[I,R] = geotiffread('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');
%info = geotiffinfo('D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif');
A1 = imread(pa1);
A2 = imread(pa2);
A3 = imread(pa3);
A4 = imread(pa4);
A5 = imread(pa5);
A6 = imread(pa6);
A7 = imread(pa7);
B1 = imread(pb1);
B2 = imread(pb2);
B3 = imread(pb3);
B4 = imread(pb4);
B5 = imread(pb5);
B6 = imread(pb6);
B7 = imread(pb7);
[I,R] = geotiffread(pb7);
info = geotiffinfo(pb7);
A1=double(A1);A2=double(A2);A3=double(A3);A4=double(A4);A5=double(A5);A6=double(A6);A7=double(A7);
B1=double(B1);B2 =double(B2);B3 =double(B3);B4 =double(B4);B5 =double(B5);B6 =double(B6);B7=double(B7);

C=sqrt((B1-A1).^2+(B2-A2).^2+(B3-A3).^2+(B4-A4).^2+(B5-A5).^2+(B6-A6).^2+(B7-A7).^2);


 amax = max(max(C));   
amin = min(min(C));  
a1=255*(C-amin)/(amax-amin); 
a1=uint8(a1);
%imshow(a1);

outraster = a1;
filename =res;
%filename = 'D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif';
geotiffwrite(filename, outraster,R, 'GeoKeyDirectoryTag', info.GeoTIFFTags.GeoKeyDirectoryTag);
r=1;
end
```
```matlab
OTSU

function r = OTSU(source, result) 
I=im2double(imread(source));%变为双精度，即0-1
%I=im2double(imread('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif'));  %变为双精度，即0-1
%subplot(221);imhist(I);            %显示灰度直方图
[M,N]=size(I);                     %得到图像行列像素
number_all=M*N;                    %总像素值
hui_all=0;                         %预设图像总灰度值为0
ICV_t=0;                           %预设最大方差为0

%得到图像总灰度值
for i=1:M
    for j=1:N
        hui_all=hui_all+I(i,j);
    end
end
all_ave=hui_all*255/number_all;   %图像灰度值的总平均值

%t为某个阈值，把原图像分为A部分（每个像素值>=t）与B部分（每个像素值<t）

for t=0:255                       %不断试探最优t值
  % for  t2=1:255
    hui_A=0;                      %不断重置A部分总灰度值
    hui_B=0;        
 %   hui_C=0;
    number_A=0;                   %不断重置A部分总像素
    number_B=0;                   %不断重置B部分总像素
 %    number_C=0;
    for i=1:M                     %遍历原图像每个像素的灰度值
        for j=1:N
            if (I(i,j)*255>=t)    %分割出灰度值》=t的像素
                number_A=number_A+1;  %得到A部分总像素
                hui_A=hui_A+I(i,j);   %得到A部分总灰度值
            elseif (I(i,j)*255<t) %分割出灰度值《t的像素
                number_B=number_B+1;  %得到B部分总像素
                hui_B=hui_B+I(i,j);   %得到B部分总灰度值
                 %           elseif (I(i,j)*255>t1 && I(i,j)*255<t2) %分割出灰度值《t的像素
                   %                 number_C=number_C+1;  %得到B部分总像素
                    %                hui_C=hui_C+I(i,j);   %得到B部分总灰度值
            end
        end
    end
%  end
    PA=number_A/number_all;            %得到A部分像素总数与图像总像素的比列
    PB=number_B/number_all;            %得到B部分像素总数与图像总像素的比列
   %   PC=number_C/number_all;
    A_ave=hui_A*255/number_A;          %得到A部分总灰度值与A部分总像素的比例
    B_ave=hui_B*255/number_B;          %得到B部分总灰度值与B部分总像素的比例
  %    C_ave=hui_C*255/number_C;
    ICV=PA*((A_ave-all_ave)^2)+PB*((B_ave-all_ave)^2); %+PC*((C_ave-all_ave)^2);  %Otsu算法
   if (ICV>ICV_t)                     %不断判断，得到最大方差
        ICV_t=ICV;
        k=t;                           %得到最大方差的最优阈值
    end

end
[I,R] = geotiffread(source);
info = geotiffinfo(source);

%[I,R] = geotiffread('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif');
%info = geotiffinfo('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif');

Th=k;
fprintf('阈值Th=%f', Th);
for i=1:M
    for j=1:N
        if I(i,j)>=Th
            I(i,j)=255;
        else
            I(i,j)=0;
        end
    end
end
%figure,imshow(I);

outraster = I;
%imagesc(outraster);
%filename = 'D:\ILCS4MatlabService\CVA-OSTU\OTSU_Result\OTSU_Res.tif';
filename = result;
geotiffwrite(filename, outraster,R, 'GeoKeyDirectoryTag', info.GeoTIFFTags.GeoKeyDirectoryTag);
r=Th;
end
```

### 2.3 以函数执行 进行测试
OTSU
>> OTSU('D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif','D:\ILCS4MatlabService\CVA-OSTU\OTSU_Result\OTSU_Res.tif')
阈值Th=36.000000

`
ans =

    36

>> 
CVA
 CVA('D:\ILCS4MatlabService\CVA-OSTU\data\t131.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t132.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t133.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t134.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t135.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t136.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t137.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t181.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t182.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t183.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t184.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t185.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t186.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\data\t187.tif',
 'D:\ILCS4MatlabService\CVA-OSTU\CVA_Result\CVA_Res.tif')
`
## 3  mcc编译jar
### 3.1成功运行后 对其进行打包
`
mcc -W 'java:matlab.OTSU,Matlab' -a 'D:/ILCS4MatlabService/CVA-OSTU/OTSU_mcc*' -d 'D:\ILCS4MatlabService\CVA-OSTU\' OTSU.m
`

`
 mcc -W 'java:matlab.CVA,Matlab' -a 'D:/ILCS4MatlabService/CVA-OSTU/CVA_mcc*' -d 'D:\ILCS4MatlabService\CVA-OSTU\CVA_mcc' CVA.m
`


### 3.2 打包内容
jar包get

## 4 利用52N包装算法
### 4.1 新建一个java文件 




### 4.2 将打包算法copy到项目的lib目录下


### 4.3 “注册”算法
打开MatlabRepository文件
添加

`private final Map<String, OTSUAlgorithm> OTSUAlgor = new HashMap<>(8);`


`
else if(processId.equals("matlab.OSTU")){
    OTSUAlgor.put(processId,new OTSUAlgorithm(processId, jarDir + name + ".jar", methodName));
}
`

`
case "matlab.OTSU" :
    return OTSUAlgor.get(processID);
`

`
case "matlab.OTSU" :
    return  OTSUAlgor.get(processID).getDescription();
`

`
case "matlab.OTSU" :
    return  OTSUAlgor.containsKey(processID);
`


 
  <a href="http://localhost:8081/wps/matlab/pushfakeAlgor?name=OTSU&processId=matlab.OTSU&methodName=OTSU" target="_blank" rel="noreferrer">http://localhost:8081/wps/matlab/pushfakeAlgor?name=OTSU&processId=matlab.OTSU&methodName=OTSU</a>
### 4.4 GetCapabilities 查看是否注册


### 4.5 执行wps算法服务


#### 4.5.1  if 执行报错


 #### 4.5.2 添加jar到 springboot 模块中 

### 4.7 服务执行代码
```java
package com.github.aseara.wps.matlab;

import com.mathworks.toolbox.javabuilder.internal.MWFunctionSignature;
import org.n52.wps.algorithm.annotation.*;
import org.n52.wps.io.data.GenericFileData;
import org.n52.wps.io.data.binding.complex.GenericFileDataBinding;
import org.n52.wps.server.AbstractAnnotatedAlgorithm;
import org.n52.wps.server.algorithm.test.EchoProcess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


/**
 * desc: <br />
 * Date: 2021/11/18 <br/>
 *
 * @author wanghaihang
 */
@Algorithm(version = "1.1.1",
        identifier = "matlab.OTSU",
        title="matlab.OTSU",
        abstrakt = "This is OTSU image processing algorithm.")
//@Slf4j
public class OTSUAlgorithm extends AbstractAnnotatedAlgorithm {

    private String processId;
    private String jarPath;
    private String methodName;

    //    private String threshold;
//    public GenericFileData result;
    public GenericFileData source;
    private static final MWFunctionSignature sOTSUSignature = new MWFunctionSignature(0, false, "OTSU", 0, false);


    private static final Logger log = LoggerFactory.getLogger(EchoProcess.class);


    private List<String> literalInput;


    private String literalOutput;

    @SuppressWarnings("unused")
    public OTSUAlgorithm() {
    }

    public OTSUAlgorithm(String processId, String jarPath, String methodName) {
        log.info("Init OTSUAlgorithm  MatlabAlgorithm()");
        this.processId = processId;
        this.jarPath = "file:" + jarPath;
        this.methodName = methodName;
        log.info("传入的方法名："+methodName);


    }

    @ComplexDataInput(identifier = "source", binding = GenericFileDataBinding.class)
    @SuppressWarnings("unused")
    public void setData(GenericFileData data) { this.source = data; }


    @LiteralDataOutput(identifier = "literalOutput")
    public String getLiteralOutput() { return literalOutput; }


//    @LiteralDataInput(identifier = "literalInput", minOccurs = 0, maxOccurs = 1)
//    public void setLiteralInput(List<String> literalInput) { this.literalInput = literalInput; }

    @Execute
    @SuppressWarnings("unused")
    public void run() {
        log.info("this is OTSU");
        File f = source.getBaseFile(false);

        String uuid = UUID.randomUUID().toString();
        File r;


        try {

            r = File.createTempFile(uuid, ".tif");//创建临时文件
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {

            /**
             * 生成随机图片文件名，"年月日时分秒"格式
             */
            Date date = new Date(System.currentTimeMillis());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
            String fileName = simpleDateFormat.format(date);
            String outputfile = "E:/Tomcat/apache-tomcat-9.0.34/webapps/ILCSData/"+fileName+".tif";

            String jarPath1= "file:///D://研究生学习/4系统开发/wps-52n/lib";
            log.info("load jar: " + jarPath1);
            /**
             * 类加载机制-加载外部jar包
             */
            URLClassLoader classLoader = new URLClassLoader(new URL[] {
                    new URL(jarPath1)
            }, this.getClass().getClassLoader());

            Class<?> runClazz = classLoader.loadClass(processId + ".Matlab");
            Object runObj = runClazz.getConstructor().newInstance();


//                log.info("输入阈值 ： {}" ,literalInput.get(0));
                log.info("进程id ： {}" ,processId);
//                String thres = literalInput.get(0);
//            Method method = runClazz.getMethod(this.methodName, List.class,List.class);
//            List list=new ArrayList();
//            list.add(f.getAbsolutePath());
//            List list1=new ArrayList();
//            list1.add(outputfile);
//
            Method method = runClazz.getMethod(methodName, int.class, Object[].class);
            log.info("参数1："+f.getAbsolutePath());
            log.info("参数2："+outputfile);

            method.invoke(runObj, 1,new Object[] {f.getAbsolutePath(),outputfile} );
            log.info(String.valueOf(method));
                //给客户端返回一个json对象
                StringBuilder sb = new StringBuilder("[");
                sb.append("{");
                sb.append("\"code\"").append(":").append("\"200\"");
                sb.append("}");
                sb.append(",");
                sb.append("{");
                sb.append("\"filename\"").append(":").append("\""+fileName+".tif\"");
                sb.append("}");
                sb.append("]");
                literalOutput = String.valueOf(sb);


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }



}

4.8　多个图像输入
package org.n52.wps.server.algorithm.test;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.n52.wps.algorithm.annotation.Algorithm;
import org.n52.wps.algorithm.annotation.ComplexDataInput;
import org.n52.wps.algorithm.annotation.ComplexDataOutput;
import org.n52.wps.algorithm.annotation.Execute;
import org.n52.wps.io.data.GenericFileData;
import org.n52.wps.io.data.binding.complex.GenericFileDataBinding;
import org.n52.wps.server.AbstractAnnotatedAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Algorithm(version = "1.1.0", title="for testing multiple inputs by reference")
public class MultiReferenceInputAlgorithm extends AbstractAnnotatedAlgorithm {

    private static Logger LOGGER = LoggerFactory.getLogger(MultiReferenceInputAlgorithm.class);

    public MultiReferenceInputAlgorithm() {
        super();
    }
    
    private GenericFileData result;
    private List<GenericFileData> data;
    
    @ComplexDataOutput(identifier = "result", binding = GenericFileDataBinding.class)
    public GenericFileData getResult() {
        return result;
    }

    @ComplexDataInput(identifier = "data", binding = GenericFileDataBinding.class, minOccurs=1, maxOccurs=2)
    public void setData(List<GenericFileData> data) {
        this.data = data;
    }

    @Execute
    public void runProcess() {
    
    GenericFileData gfd = data.get(0);
    
    File f = gfd.getBaseFile(false);
    
    try {
result = new GenericFileData(f, gfd.getMimeType());
} catch (IOException e) {
LOGGER.error(e.getMessage(), e);
}
    }
}
```

## 5 测试服务接口
### 5.1 注册算法
post：
  <a href="http://localhost:8081/wps/matlab/pushfakeAlgor?name=OTSU&processId=matlab.OTSU&methodName=OTSU&jarPath=file:///D://研究生学习/4系统开发/wps-52n/lib" target="_blank" rel="noreferrer">http://localhost:8081/wps/matlab/pushfakeAlgor?name=OTSU&processId=matlab.OTSU&methodName=OTSU&jarPath=file:///D://研究生学习/4系统开发/wps-52n/lib</a>
 
### 5.2 getcapabilities
`http://localhost:8081/wps/WebProcessingService?service=WPS&Request=GetCapabilities&AcceptVersions=1.0.0
`
### 5.3 执行测试 Execute
post请求：
` http://localhost:8081/wps/WebProcessingService
`
raw：
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0
  http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
  <ows:Identifier>matlab.OTSU</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier xmlns:ns1="http://www.opengis.net/ows/1.1">source</ows:Identifier>
      <wps:Reference xlink:href="http://localhost:8080/ILCSData/CVA_Result/CVA_Res.tif" mimeType="image/tiff" />
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput  asReference="false"  >
      <ows:Identifier>literalOutput</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>


```

## 6 界面化

 接口调用、常规请求如Ajax、Axios封装xml进行请求













