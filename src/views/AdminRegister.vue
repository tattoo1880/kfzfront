<template>
    <div class="common-layout">
        <el-row class="row-bg" justify="center">
            <el-col :span="12">
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
                                            <h2 style="color: #409EFF">
                                                注册注册注册
                                            </h2>
                                        </el-text>
                                    </el-row>
                                </el-form-item>
                                <!-- 用户名 -->
                                <el-form-item label="用户名" class="itemxxxx" label-position="left">
                                    <el-input v-model="formLabelAlign.name" input-style="color: #409EFF;" />
                                </el-form-item>

                                <!-- 密码 -->
                                <el-form-item label="密码" class="itemxxxx" label-position="left">
                                    <el-input v-model="formLabelAlign.password" type="password"
                                        input-style="color: #409EFF;" />
                                </el-form-item>



                                <!-- 两个按钮 -->
                                <el-form-item class="itembutton">
                                    <el-row class="row-bg" justify="center" style="width: 100%">
                                        <el-button type="primary" plain @click="handlereg">注册</el-button>
                                        <el-button type="primary" plain @click="tologin">取消</el-button>
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
import { ref, reactive } from "vue";
import { myfectch } from "@/utils/Myfetch";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const srcImage = ref("https://cdn.pixabay.com/photo/2017/03/12/11/30/alishan-2136879_1280.jpg");
const fit = ref("fill");
const Top = ref("top");
const formLabelAlign = reactive({
    name: "",
    password: "",
    email: "",
    phone: "",
});

const handlereg = async () => {
    console.log(formLabelAlign);

    const uid = uuidv4();

    let senddata = {
        uid: uid,
        staffname: formLabelAlign.name,
        password: formLabelAlign.password
    };

    console.log(senddata);

    try {
        const res = await myfectch.post("/api/adminregister", senddata
        );
        console.log(res);



        if (res.status === 200) {
            router.push({ name: "adminlogin" });
            ElMessage.success("注册成功");
        }
    } catch (error) {
        console.error(error);
    }
};

const tologin = () => {
    console.log("to login");
    router.push({ name: "adminlogin" });
};
</script>

<style scoped>
/* 修改表单标签颜色 */
::v-deep(.el-form-item__label) {
    color: #409EFF;
    /* 标签颜色 */
}

/* 修改输入框样式 */
::v-deep(.el-input__inner) {
    color: #409EFF;
    /* 输入框文字颜色 */
}


.common-layout {
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(to right, #dec444, #BBDEFB);
    /* 隐藏溢出内容 */
}

.aside {
    width: 100%;
    height: 100vh;
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
    height: 100vh;
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