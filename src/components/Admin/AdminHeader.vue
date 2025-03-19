<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0">
            <el-icon style="color: #409eff" size="200">
                <ElementPlus />
            </el-icon>
            <el-text style="color: #409eff">
                <strong>
                    <h1>上书宝</h1>
                </strong>
            </el-text>
        </el-menu-item>
        <el-menu-item index="1" @click="handermenuitemone">
            <el-text style="color: #409eff">
                <strong>{{ myinfo.staffname }} 欢迎登录</strong>
            </el-text>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>
                <el-text style="color: #409eff">
                    <strong>功能</strong>
                </el-text>
            </template>
            <el-menu-item index="2-1" @click="toshop">
                <el-text style="color: #409eff">
                    <strong>店铺管理</strong>
                </el-text>
            </el-menu-item>
            <el-menu-item index="2-1" @click="tocheck">
                <el-text style="color: #409eff">
                    <strong>充值管理</strong>
                </el-text>
            </el-menu-item>
            <el-menu-item index="2-2" @click="toweijin">
                <el-text style="color: #409eff">
                    <strong>违禁词管理</strong>
                </el-text>
            </el-menu-item>
            <!-- <el-menu-item index="2-2">item two</el-menu-item> -->
            <el-menu-item index="2-3" @click="logout">
                <el-text style="color: #409eff">
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminTokenStore } from "@/stores/admintoken";
import axios from "axios";
import ApiUrl from "@/utils/ApiUrl";

const usetoken = useAdminTokenStore();

const { admininfo, removeInfo } = usetoken;

const myinfo = computed(() => {
    return admininfo;
});

console.log(admininfo);

const activeIndex = ref("1");
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath);
};

const router = useRouter();

const handermenuitemone = () => {
    console.log("预留1");
};

const logout = async () => {
    console.log("登出");
    const senddata = {
        uid: admininfo.uid,
        staffname: admininfo.staffname,
        token: admininfo.token,
    };
    try {
        const res = await axios.post(`${ApiUrl}/api/adminlogout`, senddata, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${admininfo.token}`,
            },
        });
        console.log(res);

        if (res.data.uid === admininfo.uid) {
            removeInfo();
            router.push({ name: "adminlogin" });
        }
    } catch (error) {
        console.error(error);
    }
};

const toshop = () => {
    console.log("toscrapy");
    router.push({ name: "shop" });
};

const tocheck = () => {
    console.log("tocheck");
    router.push({ name: "check" });
};

const toweijin = () => {
    console.log("toweijin");
    router.push({ name: "weijin" });
};
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
    margin-right: auto;
}
</style>
