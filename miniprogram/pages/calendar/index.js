Page({
    data: {
        date: "",
        type: "single",
        show: false,
        color: "#28a745",
        maxDate: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            31
        ).getTime(),
        restDate: ["2022/2/18", "2022/2/27", "2022/2/28"],
        formatter(day) {
            return day;
        },
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: "选择预约时间",
        });
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
    onSelect(event) {
        this.setData({
            show: true,
            date: this.formatDate(event.detail),
        });
    },
    onClose() {
        this.setData({
            show: false,
        });
    },
    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    openReservationForm(event) {
        let time = event.target.dataset.time;
        let date = this.data.date;
        wx.navigateTo({
            url: "../reservationForm/index",
            events: {
                someEvent: function (data) {
                    console.log(data, "eventsomeEvent");
                },
            },
            success: function (res) {
                res.eventChannel.emit("acceptDataFromOpenerPage", {
                    date,
                    time,
                });
            },
        });
    },
});
