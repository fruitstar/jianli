#-*- coding:utf-8 -*-
# 导入bs4提取出HTML或XML标签中的内容
from bs4 import BeautifulSoup
#导入地址解析模块
import urlparse
#导入采用 Apache2 Licensed 开源协议的 HTTP 库
import requests
#导入csv库
import csv

url = "http://www.ziroom.com/z/nl/z1.html?p={page}"

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"}


# 已完成的页数序号，初始为0
page = 0

csv_file = open("ziroomwholerent.csv", "wb")
csv_writer = csv.writer(csv_file, delimiter=',')

while True:
    page += 1
    print "fetch: ", url.format(page=page)
    response = requests.get(url.format(page=page),headers=headers)
    html = BeautifulSoup(response.text)
    house_list = html.select("#houseList > li")

    # 循环再读不到新的房源时结束
    if page == 51:
        break

    #此处开始循环房源列表
    for house in house_list:
        #房子标题
        house_title = house.select("h3")[0].select(".t1")[0].string.encode("utf-8")
        #房子链接
        house_url = house.select(".t1")[0]["href"]
        #房子所在地铁线
        house_traffic = house.select("h4")[0].select("a")[0].string.encode("utf-8")
        # 房子价格
        house_money = house.select(".price")[0].text.encode("utf-8").split('￥ ')[1].split(' ')[0]
        csv_writer.writerow([house_title, house_url, house_traffic, house_money])

csv_file.close()