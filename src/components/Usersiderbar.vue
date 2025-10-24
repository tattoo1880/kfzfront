<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-menu-item
            index="1"
            class="my-menu-item"
            @click="handleUploadDescImg"
        >
            <el-icon>
                <setting />
            </el-icon>
            <span>上传描述图片</span>
        </el-menu-item>

        <el-menu-item
            index="2"
            class="my-menu-item"
            @click="handleUploadWatermarkImg"
        >
            <el-icon>
                <setting />
            </el-icon>
            <span>上传水印图片</span>
        </el-menu-item>
    </el-menu>

    <!-- todo 上传descimg 的 dialog -->

    <el-dialog
        v-model="showDescImgDialog"
        title="上传描述图片"
        width="500"
        :before-close="closeDescImgDialog"
    >
        <!-- <el-text>上传描述图片的内容</el-text> -->

        <el-row class="row-bg" justify="start">
            <el-upload
                class="upload-demo"
                drag
                :action="uploadurl"
                :before-upload="isDesImgOK"
                :data="extraData"
                :on-success="uploadDescImg"
                multiple
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </el-row>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showDescImgDialog = false">Cancel</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 上传水印图片 -->
    <el-dialog
        v-model="showWatermarkImgDialog"
        title="上传水印图片"
        width="500"
        :before-close="closeWatermarkImgDialog"
    >
        <!-- <el-text>上传水印图片的内容</el-text> -->

        <el-row class="row-bg" justify="start">
            <el-upload
                class="upload-demo"
                drag
                :action="uploadwaterurl"
                :before-upload="isWaterImgOK"
                :data="extraData"
                :on-success="uploadWatermarkImg"
                multiple
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </el-row>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showWatermarkImgDialog = false"
                    >Cancel</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

import { useTokenStore } from "@/stores/token";
import { ElMessage } from "element-plus";

const tokenStore = useTokenStore();

const showDescImgDialog = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

//! 上传描述图片

const extraData = ref({
    user_id: "",
});
const handleUploadDescImg = () => {
    console.log("上传描述图片");
    showDescImgDialog.value = true;
};

const closeDescImgDialog = () => {
    showDescImgDialog.value = false;
};

const uploadurl = "http://127.0.0.1:8080/descimg/create";
const uploadwaterurl = "http://127.0.0.1:8080/waterimg/create";

const isDesImgOK = (file: File) => {
    //! 初始化 extraData
    if (tokenStore.getInfo().uid == "") {
        console.log("用户未登录，无法上传描述图片");
        ElMessage.error("用户未登录，无法上传描述图片");
    } else {
        extraData.value.user_id = tokenStore.getInfo().uid;
    }
    console.log("上传描述图片前的检查");
    console.log("extraData:", extraData.value);
};

const uploadDescImg = () => {
    console.log("确认上传描述图片");
    showDescImgDialog.value = false;
    ElMessage.success("描述图片上传成功");
};

const showWatermarkImgDialog = ref(false);
const closeWatermarkImgDialog = () => {
    showWatermarkImgDialog.value = false;
};

const isWaterImgOK = (file: File) => {
    //! 初始化 extraData
    if (tokenStore.getInfo().uid == "") {
        console.log("用户未登录，无法上传水印图片");
        ElMessage.error("用户未登录，无法上传水印图片");
    } else {
        extraData.value.user_id = tokenStore.getInfo().uid;
    }
    console.log("上传水印图片前的检查");
    console.log("extraData:", extraData.value);
};

const uploadWatermarkImg = () => {
    console.log("确认上传水印图片");
    showWatermarkImgDialog.value = false;
    ElMessage.success("水印图片上传成功");
};

const handleUploadWatermarkImg = () => {
    console.log("上传水印图片");
    showWatermarkImgDialog.value = true;
};
</script>

<style scoped>
.el-menu-vertical-demo {
    background: #000;
    width: 100%;
    height: calc(100vh - 60px);
}

.my-menu-item {
    /* item 居中 */
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upload-demo {
    width: 100%;
}
</style>
