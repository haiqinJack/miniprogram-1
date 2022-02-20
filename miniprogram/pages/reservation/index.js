Component({
    lifetimes: {
        attached: function () {
            const restDate = this.data.restDate;
            this.setData({
                formatter(day) {
                    const year = day.date.getFullYear();
                    const month = day.date.getMonth() + 1;
                    const date = day.date.getDate();
                    //设置休息日
                    for (let i = 0; i < restDate.length; i++) {
                        let s = new Date(restDate[i]);
                        let restYear = s.getFullYear();
                        let restMonth = s.getMonth() + 1;
                        let restDay = s.getDate();

                        if (restYear === year) {
                            if (restMonth === month) {
                                if (restDay === date) {
                                    day.text = "休息";
                                    day.type = "disabled";
                                }
                            }
                        }
                    }
                    return day;
                },
            });
        },
    },
    data: {
        date: "",
        restDate: ["2022/2/18", "2022/2/27", "2022/2/28"],
        type: "single",
        show: false,
        defaultDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        ).getTime(),
        maxDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            31
        ).getTime(),
        formatter(day) {
            return day;
        },
        show2: false,
    },
    methods: {
        onDisplay() {
            wx.navigateTo({
                url: "../calendar/index",
            });
            // this.setData({ show: true });
        },
        onClose() {
            this.setData({ show: false });
        },
        onConfirm(event) {
            wx.navigateTo({
                url: "/pages/calendar/index",
            });
            this.setData({
                show2: false,
                show: false,
                date: this.formatDate(event.detail),
            });
        },
        formatDate(date) {
            date = new Date(date);
            return `${date.getFullYear()}/${
                date.getMonth() + 1
            }/${date.getDate()}`;
        },
        onClose2() {
            this.setData({ show2: false });
        },
    },
    pageLifetimes: {
        show() {
            this.getTabBar().setData({ active: 1 });
        },
    },
});
