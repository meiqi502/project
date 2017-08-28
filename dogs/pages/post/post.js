// post.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
    imgUrls: [
      '../../static/image/slider_1.png',
      '../../static/image/slider_1.png',
      '../../static/image/slider_1.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    image: {
      src: "../../static/image/bg.png"
    },

    beginDate: " - - ",
    endDate: " - - ",

    animalKey: 0,
    animals: ['喵星人', '汪星人', '小猴子', '羊咩咩', '小鼹鼠'],

    isAgree: false,

    multiArray: [
      ['北京'],
      ['海淀区', '密云区', '朝阳区', '昌平区', '平谷区', '西城区', '东城区', '崇文区', '宣武区', '丰台区'],
      ['三环以内', '三环到四环之间', '四环到五环之间', '五环到六环之间', '六环以外', '西三旗', '西二旗']],
    multiIndex: [0, 0, 0]
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['海淀区', '密云区', '朝阳区', '昌平区', '平谷区', '西城区', '东城区', '崇文区', '宣武区', '丰台区'];
            data.multiArray[2] = ['三环以内', '三环到四环之间', '四环到五环之间', '五环到六环之间', '六环以外', '西三旗', '西二旗'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['三环以内', '三环到四环之间', '四环到五环之间', '五环到六环之间', '六环以外', '西三旗', '西二旗'];
                break;
              case 1:
                data.multiArray[2] = ['城区', '城区以外'];
                break;
              case 2:
                data.multiArray[2] = ['三环到四环之间', '四环到五环之间', '五环到六环之间', '管庄', '北苑', '定福庄', '三环以内'];
                break;
              case 3:
                data.multiArray[2] = ['六环以内', '城区', '城区以外'];
                break;
              case 4:
                data.multiArray[2] = ['城区', '城区以外'];
                break;
              case 5:
                data.multiArray[2] = ['内环到二环里', '二环到三环'];
                break;
              case 6:
                data.multiArray[2] = ['内环到三环里'];
                break;
              case 7:
                data.multiArray[2] = ['一环到二环', '二环到三环'];
                break;
              case 8:
                data.multiArray[2] = ['内环到三环里'];
                break;
              case 9:
                data.multiArray[2] = ['四环到五环之间', '二环到三环', '三环到四环之间', '五环到六环之间', '六环之外'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

  showTopTips: function () {
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 3000
    });
  },

  bindProvinceChange: function (e) {
    console.log('hhh');
  },

  bindAnimalChange: function (e) {
    this.setData({
      animalKey: e.detail.value
    })
  },

  bindBeginDateChange: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  bindAgreeChange: function (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})