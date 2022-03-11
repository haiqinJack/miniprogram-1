const utils = require("../../utils/index");
const db = wx.cloud.database();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        petsData: [
            // {
            //     id: "123==",
            //     name: "肉肉=",
            //     imageURL:
            //         "https://636c-cloud1-4gknyl1ob42fa28a-1252593671.tcb.qcloud.la/%E6%80%A7%E5%88%AB%E5%A5%B3.png?sign=260926d893406672c40c6dbb04622370&t=1645456871",
            //     category: "猫",
            //     tags: ["英短", "肥胖", "可爱"],
            //     sex: 0,
            //     weight: "10",
            //     sterilization: 0,
            //     birthday: "",
            // },
        ],
    },
    onClose(event) {
        const { position, instance, name } = event.detail;
        const { _id, index } = instance.dataset;
        switch (position) {
            case "cell":
                instance.close();
                break;
            case "right":
                wx.showModal({
                    title: "提示",
                    content: `确定删除${name}吗?`,
                    success: (res) => {
                        if (res.confirm) {
                            let _petsData = this.data.petsData;
                            this.deletePet(_id);
                            this.deletePetImage(_petsData[index].imageUrl);
                            this.setData({
                                petsData: utils._removeArrayByIndex(
                                    _petsData,
                                    index
                                ),
                            });

                            console.log("用户点击确定");
                        } else if (res.cancel) {
                            console.log("用户点击取消");
                        }
                    },
                });
                instance.close();
                break;
        }
    },
    deletePetImage(imageUrl) {
        wx.cloud.deleteFile({
            fileList: [imageUrl],
        });
    },
    deletePet(_id) {
        db.collection("pets")
            .where({
                _id,
            })
            .remove();
    },
    onAddPet() {
        wx.navigateTo({
            url: "../petForm/index",
        });
    },
    getPets() {
        db.collection("pets")
            .field({
                _openid: false,
                weight: false,
                isSterilization: false,
                birthday: false,
            })
            .get()
            .then((res) => {
                console.log(res, "res----");
                this.setData({
                    petsData: res.data,
                });
            });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        this.getPets();
    },
});
