Component({
    data: {
        dataList: [],
        arrow: "down", // left up down
        show: true,
        shop: {},
    },
    methods: {
        toMyMap() {
            wx.navigateTo({
                url: "../myMap/index",
            });
        },
        onDisplay(event) {
            const data = event.detail.target.dataset.detail;
            console.log(data, "data");
            wx.navigateTo({
                url: "../calendar/index",
                success: function (res) {
                    res.eventChannel.emit("acceptData", { data });
                },
            });
        },
        onChange(event) {
            this.setData({
                activeName: event.detail,
            });
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
    },
    pageLifetimes: {
        show() {
            this.getTabBar().setData({ active: 1 });
            const shop = wx.getStorageSync("shop");
            console.log("shop", shop);
            wx.getSetting({
                success: (res) => {
                    console.log(res.authSetting);
                    if (res.authSetting["scope.userLocation"] && !shop) {
                        console.log("getSetting");
                        wx.navigateTo({
                            url: "../myMap/index",
                        });
                    }
                },
            });
            if (shop) {
                this.setData({
                    shop,
                });
                wx.cloud
                    .database()
                    .collection("item-appointment")
                    .field({
                        _id: false,
                    })
                    .get()
                    .then((res) => {
                        this.setData({
                            dataList: res.data,
                        });
                    });
            } else {
                wx.authorize({
                    scope: "scope.userLocation",
                    success: (res) => {
                        wx.navigateTo({
                            url: "../myMap/index",
                        });
                    },
                    fail: (err) => {
                        this.setData({
                            show: false,
                        });
                    },
                });
            }
        },
    },
});
