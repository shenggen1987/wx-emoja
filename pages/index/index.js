//index.js
//获取应用实例
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');
var app = getApp()
var url = 'http://backblog.me/api/list'
var pageSize = 10
var city = ''
var functions = require('../functions.js')
Page({
    data: {
        list: [],
        hasMore: true,
        showLoading: true,
        start: 0,
        pending: false
    },
    //事件处理函数
    onLoad: function() {
        var that = this;
        functions.fetchFilms.call(that, url, city, 0, pageSize, function (data) {
          that.setData({
            showLoading: false
          })
        })
    },
    onPullDownRefresh: function () {
      console.log('onPullDownRefresh', new Date())
    },
    scroll: function (e) {
      //console.log(e)
    },
    loadMore: function (e) {
      var that = this;
      if(!that.data.pending){
        that.data.pending = true;
        functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function (data) { 
          that.setData({
            pending: false
          })
        })
      }
      
    },
    //事件处理函数
    bindViewTap: function(e) {
        let path = e.currentTarget.dataset.path;
        wx.previewImage({
            current: path, // 当前显示图片的http链接
            urls: [path] // 需要预览的图片http链接列表
        })
    }


})
