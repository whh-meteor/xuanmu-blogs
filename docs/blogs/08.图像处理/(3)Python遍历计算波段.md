```python
"""
@author:Nan J
@date  :2022/12/8:10:11
@IDE   :Spyder
"""
import os
import os.path
from osgeo import gdal
import sys
from osgeo import gdalconst
from osgeo import gdal
from osgeo import osr
import numpy as np
# coding=utf-8
from tqdm import tqdm


def WriteGTiffFile(filename, nRows, nCols, data, geotrans, proj, noDataValue, gdalType, nandID):  # 向磁盘写入结果文件
    print(filename)
    format = "GTiff"
    driver = gdal.GetDriverByName(format)
    ds = driver.Create(filename, nCols, nRows, 1, gdalType)
    ds.SetGeoTransform(geotrans)
    ds.SetProjection(proj)
    ds.GetRasterBand(nandID).SetNoDataValue(noDataValue)
    ds.GetRasterBand(nandID).WriteArray(data)
    ds = None


def File(bandID):  # 遍历文件，读取数据，算出均值
    rows, cols, geotransform, projection, noDataValue = Readxy('C://126//20211.tif')
    # 获取源文件的行，列，投影等信息，注意需要保持所有的源文件这些信息都是一致的
    print('rows and cols is ', rows, cols)
    #rows, cols = 200, 200
    #filesum = [[0.0] * cols] * rows  # 栅格值和，二维数组
    #average = [[0.0] * cols] * rows  # 存放平均值，二维数组,循环定义太慢
    filesum = np.zeros((rows, cols), dtype=np.float32)  # 转换类型为np.array
    average = np.zeros((rows, cols), dtype=np.float32)
    print('the type of filesum', type(filesum))
    count = 0
    rootdir = 'C://126'
    for dirpath, filename, filenames in os.walk(rootdir):  # 遍历源文件
        for filename in filenames:
            if os.path.splitext(filename)[1] == '.tif':  # 判断是否为tif格式
                filepath = os.path.join(dirpath, filename)
                purename = filename.replace('.tif', '')  # 获得除去扩展名的文件名，比如20211.tif，purename为20211
                #两种修改方式，均要修改RUN.write_img
                #1）路径里面的目录不要是rootdir
                #2）文件名不要是"2021_band_'，用2021开头，随便起一个”save_2021_band_'“
                #逻辑是文件名的前4位是2021都要做累加
                if purename[:4] == '2021':  # 判断年份
                    # filedata = [[0.0] * cols] * rows  这也没有用到
                    # filedata = np.array(filedata)
                    print('start to read the data of :', filepath, ' and the band is ', bandID)		
                    filedata = Read(filepath, bandID)  # 将各年的多幅图像数据存入filedata中
                    count = count + 1
                    print('end to read the data of :', filepath, ' and the band is ', bandID)	
                    np.add(filesum, filedata, filesum)  # 求3幅图像相应栅格值的和
                    # print str(count)+'this is filedata',filedata
    print('count is ', count)
    for i in range(0, rows):
        for j in range(0, cols):
            # print(noDataValue, count)
            if (filesum[i, j] == noDataValue):  # 处理图像中的noData
                average[i, j] = -9999
            else:
                average[i, j] = filesum[i, j] * 1.0 / count  # 求平均
    RUN = GRID()
    RUN.write_img('C://126' + '//' + 'save2021_band_'+ str(bandID) + '.tif', projection, geotransform, average)
    #WriteGTiffFile("E://RemoteSensing//Image//meantest//2080_band"+ str(bandID) + ".tif", rows, cols, average,geotransform,projection, -9999, 10, bandID) #写入结果文件
    #return average

class GRID:

    # 读图像文件
    def read_img(self, filename):
        dataset = gdal.Open(filename)  # 打开文件
        im_width = dataset.RasterXSize  # 栅格矩阵的列数
        im_height = dataset.RasterYSize  # 栅格矩阵的行数
        im_geotrans = dataset.GetGeoTransform()  # 仿射矩阵
        im_proj = dataset.GetProjection()  # 地图投影信息
        im_data = dataset.ReadAsArray(0, 0, im_width, im_height)  # 将数据写成数组，对应栅格矩阵
        del dataset  # 关闭对象，文件dataset
        return im_proj, im_geotrans, im_data, im_width, im_height

    # 写文件，以写成tif为例
    def write_img(self, filename, im_proj, im_geotrans, im_data):
        # 判断栅格数据的数据类型
        if 'int8' in im_data.dtype.name:
            datatype = gdal.GDT_Byte
        elif 'int16' in im_data.dtype.name:
            datatype = gdal.GDT_UInt16
        else:
            datatype = gdal.GDT_Float32
        # 判读数组维数
        if len(im_data.shape) == 3:
            im_bands, im_height, im_width = im_data.shape
        else:
            im_bands, (im_height, im_width) = 1, im_data.shape
        # 创建文件
        driver = gdal.GetDriverByName("GTiff")  # 数据类型必须有，因为要计算需要多大内存空间
        dataset = driver.Create(filename, im_width, im_height, im_bands, datatype)
        dataset.SetGeoTransform(im_geotrans)  # 写入仿射变换参数
        dataset.SetProjection(im_proj)  # 写入投影
        if im_bands == 1:
            dataset.GetRasterBand(1).WriteArray(im_data)  # 写入数组数据
        else:
            for i in range(im_bands):
                dataset.GetRasterBand(i + 1).WriteArray(im_data[i])
        del dataset


def Readxy(RasterFile):  # 读取每个图像的信息
    ds = gdal.Open(RasterFile, gdal.GA_ReadOnly)
    if ds is None:
        print('Cannot open ', RasterFile)
        sys.exit(1)
    cols = ds.RasterXSize
    rows = ds.RasterYSize
    band = ds.GetRasterBand(1)
    #data = band.ReadAsArray(0, 0, cols, rows)   这一个也没有用到啊
    noDataValue = band.GetNoDataValue()
    projection = ds.GetProjection()
    geotransform = ds.GetGeoTransform()
    return rows, cols, geotransform, projection, noDataValue


def Read(RasterFile, bandID):  # 读取每个图像的信息
    ds = gdal.Open(RasterFile, gdal.GA_ReadOnly)
    if ds is None:
        print('Cannot open ', RasterFile)
        sys.exit(1)
    cols = ds.RasterXSize
    rows = ds.RasterYSize
    band = ds.GetRasterBand(bandID)
    data = band.ReadAsArray(0, 0, cols, rows)
    return data


if __name__ == "__main__":
    print("ok1")

    for i in tqdm(range(1, 20)):#20是波段数量加1，比如原始有19个波段，这里就填20.
        File(1)

    print("ok2")
```