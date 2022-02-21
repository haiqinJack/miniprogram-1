// pages/pets/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageURL:
            "https://636c-cloud1-4gknyl1ob42fa28a-1252593671.tcb.qcloud.la/%E6%80%A7%E5%88%AB%E5%A5%B3.png?sign=260926d893406672c40c6dbb04622370&t=1645456871",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel();
        console.log("pets onload", eventChannel);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
