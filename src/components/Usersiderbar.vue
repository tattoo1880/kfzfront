<template>

    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">

        <el-menu-item index="1" class="my-menu-item" @click="handleUploadDescImg">
            <el-icon>
                <setting />
            </el-icon>
            <span>上传描述图片</span>
        </el-menu-item>

        <el-menu-item index="2" class="my-menu-item" @click="handleUploadWatermarkImg">
            <el-icon>
                <setting />
            </el-icon>
            <span>上传水印图片</span>
        </el-menu-item>
    </el-menu>

</template>
<script lang="ts" setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}



const handleUploadDescImg = () => {
    console.log("上传描述图片")
}

const handleUploadWatermarkImg = () => {
    console.log("上传水印图片")
}
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
</style>