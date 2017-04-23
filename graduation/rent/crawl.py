#-*- coding:utf-8 -*-
# 导入bs4提取出HTML或XML标签中的内容
from bs4 import BeautifulSoup
#导入地址解析模块
import urlparse
#导入采用 Apache2 Licensed 开源协议的 HTTP 库
import requests
#导入csv库
import csv

url = "http://bj.58.com/pinpaigongyu/pn/{page}/?minprice=1500_2000"

# 已完成的页数序号，初始为0
page = 0

csv_file = open("rent.csv", "wb")
csv_writer = csv.writer(csv_file, delimiter=',')

while True:
    page += 1
    #format格式化函数 "".format()
    print "fetch: ", url.format(page=page)
    #requests发送请求
    response = requests.get(url.format(page=page))
    #解析发送请求的地址
    html = BeautifulSoup(response.text)
    #获取房子的信息列表 class="list"下的<li>标签，这是beautifulsoup的css选择器的方法
    #空格是必须的
    house_list = html.select(".list > li")

    # 循环再读不到新的房源时结束
    if not house_list:
        break

    #此处开始循环房源列表
    for house in house_list:
        #房子标题
        house_title = house.select("h2")[0].string.encode("utf-8")
        # urljoin主要是拼接URL，它以base作为其基地址，然后与url中的相对地址相结合组成一个绝对URL地址。函数urljoin在通过为URL基地址附加新的文件名的方式来处理同一位置处的若干文件的时候格外有用。需要注意的是，如果基地址并非以字符/结尾的话，那么URL基地址最右边部分就会被这个相对路径所替换。如果希望在该路径中保留末端目录，应确保URL基地址以字符/结尾。
        #房子链接
        house_url = urlparse.urljoin(url, house.select("a")[0]["href"])
        #为了取得公寓还是青年社区
        house_info_list = house_title.split()

        # 如果第二列是公寓名则取第一列作为地址
        if "公寓" in house_info_list[1] or "青年社区" in house_info_list[1]:
            house_location = house_info_list[0]
        else:
            house_location = house_info_list[1]

        house_money = house.select(".money")[0].select("b")[0].string.encode("utf-8")
        csv_writer.writerow([house_title, house_location, house_money, house_url])

csv_file.close()
