<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0">
            <!-- <img
                style="width: 100px"
                src="/images/element-plus-logo.svg"
                alt="Element logo"
            /> -->
            <el-icon style="color: #409EFF" size="200"><ElementPlus /></el-icon>
            <el-text style="color: #409EFF">
                <strong>回头您自己起个名字</strong>
            </el-text>
        </el-menu-item>
        <el-menu-item index="1" @click="handermenuitemone">
            <el-text style="color: #409EFF">
                <strong>预留1</strong>
            </el-text>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>
                <el-text style="color: #409EFF">
                    <strong>功能</strong>
                </el-text>
            </template>
            <el-menu-item index="2-1" @click="toscrapy">
                <el-text style="color: #409EFF">
                    <strong>寻找货源(爬虫)</strong>
                </el-text>
            </el-menu-item>
            <!-- <el-menu-item index="2-2">item two</el-menu-item> -->
            <el-menu-item index="2-3" @click="logout">
                <el-text style="color: #409EFF">
                    <strong>登出</strong>
                </el-text>
            </el-menu-item>
            <!-- <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu> -->
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};


const router = useRouter();

// const auseSecTokenStore = useSecTokenStore();

// const { secToken, setSecToken, getSecToken, clearSecToken } = auseSecTokenStore;




const handermenuitemone = () => {
    console.log("预留1");
};

const logout = () => {
    console.log("登出");
};


const toscrapy = () => {
    router.push({ name: "Scrapy" });
};
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}
</style>