// pages/order/index.js
Component({
    pageLifetimes: {
        show() {
            this.getTabBar().setData({ active: 1 });
        },
    },
});
