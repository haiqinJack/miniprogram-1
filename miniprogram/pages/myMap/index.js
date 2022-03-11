const utils = require("../../utils/index");
// pages/myMap/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        latitude: 22.8415,
        longitude: 108.27747,
        markers: [
            {
                id: 1,
                title: "夏天的风宠物生活馆(盛天尚都店)",
                desc: "南宁市鲁班路盛天尚都店",
                latitude: 22.8403,
                longitude: 108.281,
                iconPath: "../../images/logo.jpeg",
                width: "100rpx",
                height: "100rpx",
                customCallout: {},
            },
            {
                id: 2,
                title: "夏天的风宠物生活馆(翰林华府店)",
                desc: "南宁市鲁班路盛天尚都店",
                latitude: 22.8443,
                longitude: 108.28155,
                iconPath: "../../images/logo.jpeg",
                width: "100rpx",
                height: "100rpx",
                customCallout: {},
            },
        ],
    },
    handlemarkertap() {
        console.log("!!!");
    },
    chooseCard(e) {
        const id = e.target.dataset.id;
        const value = this.data.markers.find((item) => {
            return item.id == id;
        });
        console.log(value, " chhhose");
        this.saveLocation(value);
    },
    chooseMarker(e) {
        const value = this.data.markers.find((item) => {
            return item.id == e.detail.markerId;
        });
        this.saveLocation(value);
    },
    openSetting() {
        wx.openSetting({
            withSubscriptions: true,
            success: (res) => {
                this.setData({
                    show: res.authSetting["scope.userLocation"],
                });
                console.log(res, "openset");
            },
        });
    },
    saveLocation(value) {
        wx.setStorageSync("shop", value);
        wx.navigateBack({
            delta: 1,
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.authorize({
            scope: "scope.userLocation",
            success: (res) => {
                wx.getLocation({
                    type: "gcj02",
                    success: (data) => {
                        console.log(data, "aaa");
                        let { latitude, longitude } = data;
                        let _markers = this.data.markers;
                        for (let i = 0; i < _markers.length; i++) {
                            const distance = utils._distance(
                                latitude,
                                longitude,
                                _markers[i].latitude,
                                _markers[i].longitude
                            );
                            _markers[i].distance = distance;
                            this.setData({
                                markers: _markers,
                            });
                        }
                        this.setData({
                            latitude,
                            longitude,
                        });
                    },
                });
            },
            fail: (err) => {
                this.setData({
                    show: false,
                });
            },
        });
    },

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
