import urllib2
url = "http://www.baidu.com"
print '~'
response1 = urllib2.urlopen(url)
print response1.getcode()