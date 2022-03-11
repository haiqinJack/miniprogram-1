Component({
    data: {
        userInfo: {},
        hasUserInfo: false,
    },
    pageLifetimes: {
        show() {
            this.getTabBar().setData({ active: 3 });
        },
    },
    lifetimes: {
        attached() {
            const _userInfo = wx.getStorageSync("userInfo");
            console.log(_userInfo, "_userinfo");
            if (_userInfo) {
                this.setData({
                    userInfo: _userInfo,
                    hasUserInfo: true,
                });
            }
        },
    },
    methods: {
        onInfo(event) {
            const _userInfo = wx.getStorageSync("userInfo");
            if (_userInfo) {
                let url = event.target.dataset.url;
                console.log(_userInfo, "_userInfo If----", url);
                wx.navigateTo({
                    url,
                });
            } else {
                //未授权获取头像
                wx.getUserProfile({
                    desc: "获取会员信息",
                    success: (res) => {
                        wx.setStorageSync("userInfo", res.userInfo);
                        this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true,
                        });
                    },
                });
            }
        },
        to(e) {
            const { url } = e.target.dataset;
            wx.navigateTo({
                url,
            });
        },
    },
});
