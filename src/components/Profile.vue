<template>
    <el-row class="row-bg" justify="center" style="margin-top: 40px">
        <el-card class="box-card" style="width: 600px">
            <template #header>
                <div class="card-header">
                    <el-text
                        class="title"
                        style="font-size: 30px; color: #409eff"
                    >
                        <h4>个人信息</h4>
                    </el-text>
                </div>
            </template>

            <el-form label-width="120px">
                <el-form-item label="用户ID">
                    <el-input
                        v-model="formData.uid"
                        disabled
                        style="width: 300px"
                    />
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input
                        v-model="formData.username"
                        disabled
                        style="width: 300px"
                    />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="formData.password"
                        type="password"
                        show-password
                        style="width: 300px"
                    />
                </el-form-item>

                <el-row class="row-bg" justify="center">
                    <el-button type="primary" @click="changemypassword">
                        修改个人密码
                    </el-button>
                </el-row>
            </el-form>
        </el-card>
    </el-row>

    <el-divider></el-divider>

    <el-row class="row-bg" justify="center">
        <el-input
            v-model="redpackage"
            placeholder="请输入口令红包口令"
            style="width: 300px"
        />
        <el-button
            type="primary"
            @click="sendredpackage"
            style="margin-left: 30px"
        >
            发送红包
        </el-button>
    </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import { ElMessage } from "element-plus";

const formData = ref({
    uid: "",
    username: "",
    password: "",
});
const getallinfo = async () => {
    const res = await useProfileStore().getmyallinfo();
    console.log(res);
    formData.value = res.data;
};

onMounted(async () => {
    await getallinfo();
    console.log(formData.value);
});

const changemypassword = async () => {
    const res = await useProfileStore().changemypassword(formData.value);
    console.log(res);

    if (res.data != "") {
        ElMessage.success("修改成功");
        await getallinfo();
    }
};

const redpackage = ref("");
const sendredpackage = async () => {
    console.log(redpackage.value);

    const res = await useProfileStore().addred(redpackage.value);
    console.log(res);
    ElMessage.success("发送成功");
    const res2 = await useProfileStore().getmyyallredpackage();
    console.log(res2);
};
</script>
<style scoped>
.bg-row {
    background-color: #f5f5f5; /* Example background color */
    padding: 20px 0; /* Example padding */
}

.box-card {
    /* Add any card-specific styling here if needed */
}

.card-header {
    text-align: center; /* Center the title in the header */
    padding-bottom: 10px; /* Add some spacing below the title */
}

.title {
    /* You can keep or remove this, as the styling is now in .card-header */
}

/* If you want to style the form items within the card */
.el-form-item {
    margin-bottom: 15px; /* Example spacing between form items */
}
</style>
