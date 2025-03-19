<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">
            <!-- <img
                style="width: 100px"
                src="/images/element-plus-logo.svg"
                alt="Element logo"
            /> -->
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
                <strong>{{ userinfo.username }} 欢迎登录</strong>
            </el-text>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>
                <el-text style="color: #409eff">
                    <strong>功能</strong>
                </el-text>
            </template>
            <el-menu-item index="2-1" @click="toscrapy">
                <el-text style="color: #409eff">
                    <strong>寻找货源(爬虫)</strong>
                </el-text>
            </el-menu-item>
            <el-menu-item index="2-2" @click="totask">
                <el-text style="color: #409eff">
                    <strong>我的上传任务</strong>
                </el-text>
            </el-menu-item>
            <el-menu-item index="2-3" @click="toprofile">
                <el-text style="color: #409eff">
                    <strong>我的信息</strong>
                </el-text>
            </el-menu-item>
            <el-menu-item index="2-4" @click="tousershop">
                <el-text style="color: #409eff">
                    <strong>我的店铺</strong>
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
import { useTokenStore } from "@/stores/token";
import { myfectch } from "@/utils/Myfetch";

const usetoken = useTokenStore();

const { userinfo, removeInfo, removeToken, getToken } = usetoken;

const myinfo = computed(() => {
    return userinfo;
});

const jwt = getToken();

console.log(myinfo.value);

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

const logout = async () => {
    console.log("登出");

    try {
        const res = await myfectch.post(
            "/api/logout",
            {
                uid: userinfo.uid,
                username: userinfo.username,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log(res);
        if (res.data.uid === userinfo.uid) {
            removeInfo();
            removeToken();
            router.push({ name: "login" });
        }
        // router.push({ name: "login" });
    } catch (error) {
        console.error(error);
    }
};

const toscrapy = () => {
    router.push({ name: "Scrapy" });
};

const totask = () => {
    router.push({ name: "Task" });
};

const toprofile = () => {
    router.push({ name: "Profile" });
};

const tousershop = () => {
    router.push({ name: "usershop" });
};

</script>

<style>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
    margin-right: auto;
}
</style>
