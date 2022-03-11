const utils = require("../../utils/index");
// pages/petForm/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageUrl: "",
        name: "",
        arrayIndex: 0,
        category: [
            // 宠物种类
            {
                key: 0,
                value: "狗狗",
            },
            {
                key: 1,
                value: "猫咪",
            },
        ],
        petBreed: "", // 宠物品种
        weight: "", //体重
        sex: "公", // 性别
        isSterilization: "否", // 是否绝育
        birthday: "",
        showSexModel: false,
        show: false,
        disabled: false,
        type: "default", // primary | warning
        deleteImage: true,
    },

    //显示选择性别model
    showSexModel() {
        this.setData({
            showSexModel: true,
        });
    },
    //显示选择是否绝育model
    showPopup() {
        this.setData({ show: true });
    },
    //关闭 model
    onClose() {
        this.setData({ show: false, showSexModel: false });
    },
    //点击宠物头像，选择相册或者拍照
    async onChooseMedia() {
        try {
            const file = await wx.chooseMedia({
                count: 1,
                mediaType: "image",
                sizeType: ["compressed"],
            });
            // 获取文件后缀名字
            let ext = utils._extFileType(file.tempFiles[0].tempFilePath);
            const cloudFile = await wx.cloud.uploadFile({
                cloudPath: `pets/${new Date().getTime()}${ext}`,
                filePath: file.tempFiles[0].tempFilePath,
            });
            let oldImageUrl = this.data.imageUrl;
            //如果已经上传过一次。就把之前的图片删除
            if (oldImageUrl !== "") {
                this.onDeleteFile();
            }
            this.setData({
                imageUrl: cloudFile.fileID,
            });
        } catch (error) {
            console.error(error);
        }
    },
    //选择宠物种类: 猫 ｜ 狗
    bindPickerChange: function (e) {
        this.setData({
            arrayIndex: e.detail.value,
        });
        // petBreed: this.data.category[e.detail.value].value,
        // console.log("picker发送选择改变，携带值为", this.data.petBreed);
    },
    //选择宠物性别
    handleSex(event) {
        let sex = event.target.dataset.sex;
        this.setData({
            sex,
            showSexModel: false,
        });
        console.log(event.target.dataset.sex);
    },
    //选择 是否绝育
    handleSterilization(event) {
        let isSterilization = event.target.dataset.sterilization;
        this.setData({
            isSterilization,
            show: false,
        });
        console.log(isSterilization);
    },
    //取消model:value 不绑定事件警告
    handleChange() {},
    //删除宠物头像
    onDeleteFile() {
        let imageUrl = this.data.imageUrl;
        if (imageUrl == "") {
            return;
        } else {
            wx.cloud
                .deleteFile({
                    fileList: [imageUrl],
                })
                .then((res) => {
                    console.log(res, "删除成功");
                });
        }
    },
    //提交 数据
    addPetsForm() {
        let {
            imageUrl,
            name,
            petBreed,
            weight,
            sex,
            isSterilization,
            birthday,
        } = this.data;
        let category = this.data.category[this.data.arrayIndex].value;
        let petsForm = {
            imageUrl,
            category,
            name,
            petBreed,
            weight,
            sex,
            isSterilization,
            birthday,
        };
        if (name && category && petBreed && weight) {
            wx.cloud
                .database()
                .collection("pets")
                .add({
                    data: petsForm,
                })
                .then((res) => {
                    this.setData({
                        deleteImage: false,
                    });
                    wx.navigateBack({
                        delta: 1,
                    });
                })
                .catch(console.error);
        }
        console.log(petsForm);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (this.data.deleteImage) {
            this.onDeleteFile();
        }
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: "添加宠物",
        });
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.deleteImage) {
            this.onDeleteFile();
        }
    },
});
