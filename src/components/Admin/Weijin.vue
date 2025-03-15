<template>
    <el-row class="row-bg" justify="center">
        <el-text>
            <h2 style="color: #409eff">违禁词管理</h2>
        </el-text>
    </el-row>
    <el-row class="bg-row" justify="center">
        <el-upload
            class="upload-demo"
            drag
            action="http://127.0.0.1:8083/weijin/upload"
            multiple
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                拖拽文件至此 <em>或者点我上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    只能上传txt文件，且不超过500kb,违禁词以英文,分割
                </div>
            </template>
        </el-upload>
    </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { CirclePlus } from "@element-plus/icons";
</script>

<style lang="less" scoped></style>
