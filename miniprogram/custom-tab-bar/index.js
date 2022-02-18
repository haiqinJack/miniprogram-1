Page({
    data: {
        active: 0,
        placeholder: true,
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        let index = event.detail;
        this.setData({ active: event.detail });
        if (index == 1) {
            wx.switchTab({
                url: "/pages/order/index",
            });
        } else if (index == 2) {
            wx.switchTab({
                url: "/pages/goods/index",
            });
        } else if (index == 3) {
            wx.switchTab({
                url: "/pages/user/index",
            });
        } else {
            wx.switchTab({
                url: "/pages/index/index",
            });
        }
    },
});
