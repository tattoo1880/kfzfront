<template>
    <div class="common-layout">
        <el-row class="row-bg" justify="center">
            <el-col :span="12">
                <div class="aside">
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="srcImage"
                        :fit="fit"
                    ></el-image>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="aside-right">
                    <el-row class="row-bg" justify="center">
                        <el-col :span="24">
                            <el-form
                                :label-position="Top"
                                label-width="auto"
                                :model="formLabelAlign"
                                style="max-width: 600px"
                                class="withborder"
                            >
                                <el-form-item style="width: 100%">
                                    <el-row
                                        class="row-bg"
                                        justify="center"
                                        style="width: 100%"
                                    >
                                        <el-text>
                                            <h2 style="color: #409eff">
                                                上书宝
                                            </h2>
                                        </el-text>
                                    </el-row>
                                </el-form-item>
                                <!-- 用户名 -->
                                <el-form-item
                                    label="用户名"
                                    class="itemxxxx"
                                    label-position="left"
                                >
                                    <el-input
                                        v-model="formLabelAlign.name"
                                        input-style="color: #409EFF;"
                                    />
                                </el-form-item>

                                <!-- 密码 -->
                                <el-form-item
                                    label="密码"
                                    class="itemxxxx"
                                    label-position="left"
                                >
                                    <el-input
                                        v-model="formLabelAlign.password"
                                        type="password"
                                        input-style="color: #409EFF;"
                                    />
                                </el-form-item>

                                <!-- 两个按钮 -->
                                <el-form-item class="itembutton">
                                    <el-row
                                        class="row-bg"
                                        justify="center"
                                        style="width: 100%"
                                    >
                                        <el-button
                                            type="primary"
                                            plain
                                            @click="login"
                                            >登录</el-button
                                        >
                                        <el-button
                                            type="primary"
                                            plain
                                            @click="toReg"
                                            >注册</el-button
                                        >
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

<script setup lang="ts">
import { myfectch } from "@/utils/Myfetch";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";

const { setToken, setInfo } = useTokenStore();

const router = useRouter();

const srcImage = ref(
    "https://img.tusij.com/qiantu_assets/user_download_ue/2021-05-24/qt_7926a2b6a836b023b8a3459d721d76e2_23498.jpg%21w390?auth_key=1762387200-0-0-2f958e679ce44afdf4c5870d7192bdac"
);
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
    /* 标签颜色 */
}

/* 修改输入框样式 */
::v-deep(.el-input__inner) {
    color: #409eff;
    /* 输入框文字颜色 */
}

.common-layout {
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right, #dec444, #bbdefb);
    /* 渐变背景 */

    /* 隐藏溢出内容 */
}

.aside {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.aside-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 60%;
}

.withborder {
    width: 400px;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
}

.itemxxxx {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
}

.el-input {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(64, 162, 227, 0.927);
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
    margin-top: 20px;
    /* 可选，增加按钮与其他表单项的间距 */
}
</style>
