// app.js
App({
    onLaunch(options) {
        if (!wx.cloud) {
            console.error("请使用小程序基础库2.2.3以上版本!");
        } else {
            console.log("小程序基础库");
            wx.cloud.init({
                env: "cloud1-4gknyl1ob42fa28a", //必填，环境ID，指定接下来调用 API 时访问哪个环境的云资源
                traceUser: true, //是否在将用户访问记录到用户管理中，在控制台中可见
            });
        }
    },
    onShow(options) {
        // Do something when show.
    },
    onHide() {
        // Do something when hide.
    },
    onError(msg) {
        console.log(msg);
    },
    globalData: "I am global data",
    globalUserInfo: {},
});
