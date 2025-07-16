<template>

    <div class="common-layout">
        <el-affix style="position: fixed; top: 20px; right: 50px; z-index: 999;">
            <el-button type="primary">
                <h3 style="color: #409eff; font-family: 'ZCOOL KuaiLe', sans-serif;">上书宝</h3>
            </el-button>

        </el-affix>
        <el-row class="row-bg" justify="center">
            <el-col :span="12" class="aside-col">
                <div class="aside">
                    <el-image style="width: 100%; height: 100%" :src="srcImage" :fit="fit"></el-image>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="aside-right">
                    <el-row class="row-bg" justify="center">
                        <el-col :span="24">
                            <el-form :label-position="Top" label-width="auto" :model="formLabelAlign"
                                style="max-width: 600px" class="withborder">
                                <el-form-item style="width: 100%">
                                    <el-row class="row-bg" justify="center" style="width: 100%">
                                        <el-text>
                                            <h2 style="color: #409eff" class="glow-title2">
                                                LOGIN
                                            </h2>
                                        </el-text>
                                    </el-row>
                                </el-form-item>
                                <!-- 用户名 -->
                                <el-form-item label="USERNAME" class="itemxxxx" label-position="left">
                                    <el-input v-model="formLabelAlign.name" input-style="color: #409EFF;" />
                                </el-form-item>

                                <!-- 密码 -->
                                <el-form-item label="PASSWORD" class="itemxxxx" label-position="left">
                                    <el-input v-model="formLabelAlign.password" type="password"
                                        input-style="color: #409EFF;" />
                                </el-form-item>

                                <!-- 两个按钮 -->
                                <el-form-item class="itembutton">
                                    <el-row class="row-bg" justify="center" style="width: 100%">
                                        <el-button type="primary" @click="login">登录</el-button>
                                        <el-button type="primary" @click="toReg">注册</el-button>
                                    </el-row>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { myfectch } from "@/utils/Myfetch";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";
import srcImage from "@/assets/loginimage.jpeg";

const { setToken, setInfo } = useTokenStore();

const router = useRouter();

// const srcImage = ref(
//     "https://img.tusij.com/qiantu_assets/user_download_ue/2021-05-24/qt_7926a2b6a836b023b8a3459d721d76e2_23498.jpg%21w390?auth_key=1762387200-0-0-2f958e679ce44afdf4c5870d7192bdac"
// );
// const srcImage = ref(loginimage);
const fit = ref("cover");

const formLabelAlign = reactive({
    name: "",
    password: "",
});

const Top = ref("top");

const login = async () => {
    console.log("login");
    console.log(formLabelAlign);
    try {
        const res = await myfectch.post("/api/login", formLabelAlign);
        console.log(res);
        if (res.data === "") {
            ElMessage.error("用户名或密码错误");
        } else if (res.data.secToken) {
            console.log(res.data.secToken);
            ElMessage.success("登录成功");
            setToken(res.data.secToken);
            setInfo(res.data.username, res.data.uid, res.data.isActived);
            router.push({
                path: "/home",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const toReg = () => {
    console.log("toReg");
    router.push("/register");
};
</script>

<style scoped>
/* 修改表单标签颜色 */
::v-deep(.el-form-item__label) {
    color: #409eff;
    /* 加粗 */
    font-weight: bold;
    /* 标签颜色 */

    animation: glow-text 1s ease-in-out infinite alternate;
    text-shadow:
        0 0 5px rgba(64, 158, 255, 0.8),
        0 0 10px rgba(64, 158, 255, 0.6),
        0 0 15px rgba(64, 158, 255, 0.4);


}

/* 修改输入框样式 */
::v-deep(.el-input) {
    background-color: #1e1e1e;
    /* 背景填满整个 input 容器 */
    border-radius: 5px;
    padding: 0;
    /* 移除内部间距，确保内层元素铺满 */
}

::v-deep(.el-input__inner) {
    background-color: black;
    /* 避免重复背景 */
    color: #050505;
    border: none;
    /* 可选：如果你希望无边框效果 */
    box-shadow: none;
}

::v-deep(.el-input__wrapper) {
    background-color: black !important;
    /* 或者你需要的颜色 */
    box-shadow: none !important;
    border-radius: 5px;
}

.common-layout {
    height: 100vh;
    overflow: hidden;
    background-color: black;
    /* background: linear-gradient(to right, #dec444, #bbdefb); */
    /* 渐变背景 */

    /* 隐藏溢出内容 */
}

.aside-col {
    height: 100vh;
    padding: 0 !important;
    /* 去掉内边距避免图片左右空白 */
}

/* 左侧容器撑满父级 */
.aside {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* 图片撑满容器，且铺满 */
.el-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
}


.aside-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60%;
}

@keyframes blue-glow {
    0% {
        box-shadow: 0 0 10px rgba(64, 162, 227, 0.8);
    }

    50% {
        box-shadow: 0 0 20px rgba(64, 162, 227, 1);
    }

    100% {
        box-shadow: 0 0 10px rgba(64, 162, 227, 0.8);
    }
}

.withborder {
    width: 400px;
    height: 300px;
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;
    margin-top: 250px;
}

@keyframes text-flicker {
    0% {
        text-shadow: 0 0 5px rgba(64, 162, 227, 0.7),
            0 0 10px rgba(64, 162, 227, 0.5);
        opacity: 1;
    }

    50% {
        text-shadow: 0 0 20px rgba(64, 162, 227, 1),
            0 0 30px rgba(64, 162, 227, 0.8);
        opacity: 0.9;
    }

    100% {
        text-shadow: 0 0 5px rgba(64, 162, 227, 0.7),
            0 0 10px rgba(64, 162, 227, 0.5);
        opacity: 1;
    }
}

.glow-title {
    color: #409eff;
    animation: text-flicker 2s infinite alternate;
}

::v-deep(.glow-title2) {
    font-size: 30px;
    /* font-weight: bold; */
    text-align: center;
    color: #409eff;
    animation: glow-text 1s ease-in-out infinite alternate;
    text-shadow:
        0 0 5px rgba(64, 158, 255, 0.8),
        0 0 10px rgba(64, 158, 255, 0.6),
        0 0 15px rgba(64, 158, 255, 0.4);

}

@keyframes glow-text {
    0% {
        text-shadow:
            0 0 5px rgba(64, 158, 255, 0.8),
            0 0 10px rgba(64, 158, 255, 0.6),
            0 0 15px rgba(64, 158, 255, 0.4);
    }

    100% {
        text-shadow:
            0 0 20px rgba(64, 158, 255, 1),
            0 0 30px rgba(64, 158, 255, 0.8),
            0 0 40px rgba(64, 158, 255, 0.6);
    }
}



.itemxxxx {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
}

.el-input {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;

}

.itembutton {
    /* 让按钮容器居中对齐 */
    width: 100%;
    display: flex;
    /* 使用 Flex 布局 */
    justify-content: center;
    /* 水平居中 */
    gap: 10px;
    /* 按钮之间的间距 */
    /* 可选，增加按钮与其他表单项的间距 */
    border-radius: 5px;
}

.el-button {
    margin: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
    animation: blue-glow 2s infinite alternate;
    /* 透明背景 */
    background-color: transparent;
    color: #409eff;
}

.el-button--primary.el-button--plain {
    border-color: #409eff;
    color: #409eff;
}
</style>
