Component({
    pageLifetimes: {
        show() {
            this.getTabBar().setData({ active: 3 });
        },
    },
});
