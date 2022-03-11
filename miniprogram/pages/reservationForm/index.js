// pages/reservationForm/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: {},
        username: "",
        phone: "",
        choosePets: [],
        date: "",
        time: "",
        list: [
            {
                id: 1,
                name: "肉肉",
                avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
                default: true,
            },
        ],
        result: [],
        shop: {},
    },
    confirmReservation() {
        const { username, phone, date, time, shop, dataList } = this.data;
        if (username && phone && date && time && shop) {
            wx.cloud
                .database()
                .collection("user-appointment")
                .add({
                    data: {
                        username,
                        phone,
                        date,
                        time,
                        shop: shop.title,
                        imageUrl: dataList.imageUrl,
                        appointment: dataList.title,
                        _createTime: new Date().getTime(),
                        _updateTime: new Date().getTime(),
                        status: "接待中", //接待中
                    },
                })
                .then((res) => {
                    wx.showToast({
                        title: "预约成功！",
                        success: function () {
                            wx.reLaunch({
                                url: "../userAppointment/index",
                            });
                        },
                    });
                })
                .catch((err) => {
                    wx.showToast({
                        title: "服务器繁忙！请稍后再试",
                        icon: "error",
                    });
                });
        } else {
            wx.showToast({
                title: "请填写完整！",
                icon: "error",
            });
        }
    },
    onChange(event) {
        const eventChannel = this.getOpenerEventChannel();
        console.log("eventChannel", eventChannel);
        console.log(event.detail, "event.detail");
        this.setData({
            result: event.detail,
        });
    },
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
        let { date, time, dataList } = this.data;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.emit("acceptDataFromOpenedPage", {
            data: "acceptDataFromOpenedPage",
        });
        eventChannel.emit("someEvent", { data: "someEvent" });
        eventChannel.on("acceptDataFromOpenerPage", function (data) {
            date = data.date;
            time = data.time;
            dataList = data.dataList;
            console.log(date, "date", dataList);
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
            dataList,
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const shop = wx.getStorageSync("shop");
        this.setData({
            shop,
        });
    },
});
