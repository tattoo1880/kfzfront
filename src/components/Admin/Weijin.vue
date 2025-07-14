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
            action="https://kfz.purecode.dpdns.org/weijin/upload"
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
import { ElLoading, ElMessage } from "element-plus";
import { useWeijinStore } from "@/stores/weijin";

const weijinStore = useWeijinStore();
const { clearweijin } = weijinStore;

const clearweijin1 = async() => {
    // 清空违禁词逻辑
    console.log("清空违禁词");



    const myloading = ElLoading.service({
        lock: true,
        text: "正在清空违禁词...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });

    try {


        const res = await clearweijin();
        console.log("清空违禁词结果", res);
        myloading.close();

        
    } catch (error) {
        console.error("清空违禁词失败", error);
        ElMessage.error("清空违禁词失败，请稍后再试");
        myloading.close();

    } finally {
        console.log("清空违禁词结束");
        ElMessage.success("清空违禁词成功");
        myloading.close();
    }
};

onMounted(async() => {
    // 页面加载时可以执行一些初始化逻辑
    console.log("Weijin组件已加载");
    try {
        await clearweijin1();
    } catch (error) {
        console.error("初始化违禁词失败", error);
    }
});
</script>

<style lang="less" scoped></style>
