// pages/reservationForm/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        date: "",
        time: "",
        modelPets: false,
        list: [
            {
                id: 1,
                name: "肉肉",
                avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
                default: true,
            },
            {
                id: 2,
                name: "哈哈",
                avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
                default: false,
            },
        ],
        result: [],
    },
    onChange(event) {
        const eventChannel = this.getOpenerEventChannel();
        console.log("eventChannel", eventChannel);
        console.log(event.detail, "event.detail");
        this.setData({
            result: event.detail,
        });
    },
    toggle(event) {
        const { index } = event.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
    },

    noop() {},
    openModelPets() {
        wx.navigateTo({
            url: "../pets/index",
        });
    },
    onClose() {
        console.log(this.data.result, "result");
        this.setData({
            modelPets: false,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let date = this.data.date;
        let time = this.data.time;
        wx.setNavigationBarTitle({
            title: "填写预约信息",
        });
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("acceptDataFromOpenedPage", {
            data: "acceptDataFromOpenedPage",
        });
        eventChannel.emit("someEvent", { data: "someEvent" });
        eventChannel.on("acceptDataFromOpenerPage", function (data) {
            date = data.date;
            time = data.time;
            console.log(date, "date");
        });

        let result = [];
        let item = this.data.list;
        for (let i = 0; i < item.length; i++) {
            if (this.data.list[i].default) {
                result.push(item[i]);
            }
        }
        this.setData({
            date,
            time,
            result,
        });
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
    onHide: function () {
        console.log("onHide");
    },

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
