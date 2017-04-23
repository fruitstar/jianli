import scrapy

class GanjiSpider(scrapy.Spider):
    name = "zufang"
    start_urls = ["http://bj.ganji.com/fang1/chaoyang/"]

    def parse(self,response):
        print(response)
        title_list = response.xpath(".//div[@class='f-list-item']/dl/dd[0]/a/text()").exreact()
        money_list = response.xpath(".//div[@class='f-list-item']/dl/dd[4]/div[0]/span[0]/text()").exreact()
        for i,j in zip(title_list,money_list):
            print(i,":",j)