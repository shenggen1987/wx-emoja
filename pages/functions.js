var util = require('../utils/util.js');

module.exports = {
  fetchFilms: function (url, city, start, count, cb) {
    var that = this
    wx.request({
      url: url + '?city=' + city + '&begin=' + start + '&offset=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        var data = res.data
        if (data.datas.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
        	data.datas.forEach(function (item) {
        		item.add_time = util.formatDate(new Date(item.add_time));
        	})
          that.setData({
            list: that.data.list.concat(data.datas),
            start: that.data.start + data.datas.length
          })
        }
        cb(data)
      }
    })
  }
}