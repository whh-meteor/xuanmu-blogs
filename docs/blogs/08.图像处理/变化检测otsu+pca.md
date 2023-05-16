# 变化检测 PCA OTSU寻找阈值

```py
import cv2
import matplotlib.pyplot as plt
import numpy as np
import math

img1 = cv2.imread(
    'C:\\Users\dell\Desktop\RXX-2020-CVA\RXX-2020-CVA\Testing dataset\TianJing-SPOT/09BMP.bmp')
img2 = cv2.imread(
    'C:\\Users\dell\Desktop\RXX-2020-CVA\RXX-2020-CVA\Testing dataset\TianJing-SPOT/10BMP.bmp')


def Find_Threshold(delta):  # OTSU寻找阈值
    # 求灰度方差最大的那个数
    val = np.zeros([256])
    for th in range(256):
        loc1 = delta > th
        loc2 = delta <= th
        '''delta[loc1]=255
        delta[loc2]=0'''
        if delta[loc1].size == 0:
            mu1 = 0
            omega1 = 0
        else:
            mu1 = np.mean(delta[loc1])
            omega1 = delta[loc1].size/delta.size

        if delta[loc2].size == 0:
            mu2 = 0
            omega2 = 0
        else:
            mu2 = np.mean(delta[loc2])
            omega2 = delta[loc2].size/delta.size
        val[th] = omega1*omega2*np.power((mu1-mu2), 2)

    # print("val=",val.shape)
    plt.figure()
    loc = np.where(val == np.max(val))
    # x=np.arange(0,256,1)
    # x=x.reshape([1,256])
    plt.plot(val)
    plt.ylabel("Var")
    plt.xlabel("Threshold")
    plt.grid("on")

    print("\nThe best OTSU Threshold: ", loc[0])
    return loc[0]


def CD_diff(img1, img2):  # 影像差值法

    delta = np.subtract(img2, img1)
    # delta=np.abs(delta)
    # delta.min()
    sh = delta.shape
    delta += np.abs(delta.min())
    th = Find_Threshold(delta)
    delta = cv2.cvtColor(delta, cv2.COLOR_BGR2GRAY)
    # print(delta.min())
    if np.size(th) > 1:
        th = th[0]
    for i1 in range(sh[0]):
        for i2 in range(sh[1]):
            if delta[i1][i2] >= th:
                delta[i1][i2] = 0
            else:
                delta[i1][i2] = 255
    return delta


def divede(img1, img2):
    delta = cv2.divide(img2, img1)
    # delta=np.abs(delta)
    # delta.min()
    (mean1, stddv1) = cv2.meanStdDev(delta)
    gray2 = cv2.cvtColor(delta, cv2.COLOR_BGR2GRAY)

    ret2, thread2 = cv2.threshold(gray2, mean1[0]+1, 255, cv2.THRESH_BINARY)
    return thread2


def cva(img1, img2):
    b, g, r = cv2.split(img1)
    b1, g1, r1 = cv2.split(img2)
    sh = img1.shape

    (row, col) = b1.shape
    d_1 = np.subtract(b, b1)
    d_1 += np.abs(d_1.min())
    d_2 = np.subtract(g, g1)
    d_2 += np.abs(d_2.min())
    d_3 = np.subtract(r, r1)
    d_3 += np.abs(d_3.min())

    d_1 = cv2.pow(d_1, 2)
    d_2 = cv2.pow(d_2, 2)
    d_3 = cv2.pow(d_3, 2)
    delta = cv2.add(d_1, d_2, d_3)
    for i in range(sh[0]):
        for j in range(sh[1]):
            delta[i, j] = math.sqrt(delta[i, j])+10
    th = Find_Threshold(delta)
    delta = cv2.cvtColor(delta, cv2.COLOR_BGR2GRAY)
    # print(delta.min())
    if np.size(th) > 1:
        th = th[0]
    for i1 in range(sh[0]):
        for i2 in range(sh[1]):
            if delta[i1][i2] >= th:
                delta[i1][i2] = 0
            else:
                delta[i1][i2] = 255
    return delta


# rcva 方法
def rcva(img1, img2):
    # 代码实现2w+1 w采用的是1


def rcva(img1, img2):
    b, g, red = cv2.split(img1)
    b1, g1, red1 = cv2.split(img2)

    (row, cloumn) = b.shape
    # 上下左右 左上 右上 左下 右下的坐标变化
    x = [-1, 1, 0, 0, -1, -1, 1, 1]
    y = [0, 0, -1, 1, -1, 1, -1, 1]

    # 保存变化后的差异图
    img_a = np.zeros((row, cloumn))
    img_b = np.zeros((row, cloumn))
    print("正在计算")
    for i in range(row):
        for j in range(cloumn):
            if i != 0 and j != 0 and i != row and j != cloumn:
                r = i
                c = j
                res1 = 1000000.0
                res2 = 1000000.0
                res3 = 1000000.0
                for k in range(8):
                    if(0 < r and r < row and c > 0 and c < cloumn):
                        kk1 = (math.pow(abs(int(b[i, j])-int(b1[r, c])), 2))
                        if(kk1 < res1):
                            res1 = kk1
                        kk2 = (math.pow(abs(int(g[i, j])-int(g1[r, c])), 2))
                        if(kk2 < res2):
                            res2 = kk2
                        kk3 = (
                            math.pow(abs(int(red[i, j])-int(red1[r, c])), 2))
                        if(kk3 < res3):
                            res3 = kk3
                    r = i
                    c = j
                    r += x[k]
                    c += y[k]
                img_a[i][j] = math.sqrt(res1+res2+res3)

        # 考虑四个边角 和四个边界
            else:
                img_a[i, j] = abs(int(b[i, j])-int(b1[i, j]))

    print("正在计算中请稍等")

    for i in range(row):
        for j in range(cloumn):
            if i != 0 and j != 0 and i != row and j != cloumn:
                r = i
                c = j
                res1 = 1000000.0
                res2 = 1000000.0
                res3 = 1000000.0
                for k in range(8):
                    if(0 < r and r < row and c > 0 and c < cloumn):
                        kk1 = (math.pow(abs(int(b[i, j])-int(b1[r, c])), 2))
                        if(kk1 < res1):
                            res1 = kk1
                        kk2 = (math.pow(abs(int(g[i, j])-int(g1[r, c])), 2))
                        if(kk2 < res2):
                            res2 = kk2
                        kk3 = (
                            math.pow(abs(int(red[i, j])-int(red1[r, c])), 2))
                        if(kk3 < res3):
                            res3 = kk3
                    r = i
                    c = j
                    r += x[k]
                    c += y[k]
                img_b[i][j] = math.sqrt(res1+res2+res3)
        # 考虑四个边角 和四个边界
            else:
                img_b[i, j] = abs(int(b1[i, j])-int(b[i, j]))

    img_b_change = np.zeros((row, cloumn))
    for i in range(row):
        for j in range(cloumn):
            if img_a[i, j] > img_b[i, j]:
                img_b_change[i, j] = img_b[i, j]
            else:
                img_b_change[i, j] = img_a[i, j]

    print("计算完成正在二值化")
    th = Find_Threshold(img_b_change)

    for i1 in range(row):
        for i2 in range(cloumn):
            if img_b_change[i1][i2] <= th:
                img_b_change[i1][i2] = 0
            else:
                img_b_change[i1][i2] = 255
    cv2.imshow('diff3', img_b_change)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# 主成向量分析法

# 这个是二维


def Img_PCA(delta):
    U, S, V = np.linalg.svd(delta)
    SS = np.zeros(U.shape)
    print(SS.shape)

    for i in range(S.shape[0]):
        SS[i][i] = S[i]

    def Pick_k(S):
        sval = np.sum(S)
        for i in range(S.shape[0]):
            if np.sum(S[:i]) >= 0.6*sval:
                break
        return i+1

    k = Pick_k(S)
    print("\nNumber of vectors to reserve: k= ", k)
    Uk = U[:, 0:k]
    Sk = SS[0:k, 0:k]
    Vk = V[0:k, :]
    im = np.dot(np.dot(Uk, Sk), Vk)
   # im=np.dot(im,delta)
    return im


# 差值pca 法
# 先做插值再做PCA
i = Img_PCA(CD_diff(img1, img2))

# PCA 插值法

# ii=CD_diff(Img_PCA(img1[0]),Img_PCA(img2[0]))

cv2.imshow('diff', i)
cv2.waitKey(0)
cv2.destroyAllWindows()

```