<template>
    <el-row class="bg-row" justify="center">
        <el-text>
            <h2 style="color: #409eff">用户管理</h2>
        </el-text>
    </el-row>

    <!-- 添加用户的按钮 -->
    <el-row class="bg-row" justify="end" style="margin-right: 30px">
        <el-button
            type="primary"
            :icon="CirclePlus"
            circle
            @click="makeaddture"
        />
    </el-row>

    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-table
                :data="tabledata"
                style="width: 100%; height: 70vh"
                align="center"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="300"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.uid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="用户名"
                    width="150"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.username }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="authorname"
                    label="电话"
                    width="120"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.phone }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="price"
                    label="邮箱"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.email }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="quality"
                    label=" 是否有效"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <!-- <el-tag type="success">{{ row.isActivated }}</el-tag> -->
                        <el-tag v-if="row.isActived" type="success"
                            >有效</el-tag
                        >
                        <el-tag v-else type="danger">无效</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="press"
                    label="订阅开始时间"
                    width="200"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.subStartTime }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="pubDateText"
                    label="订阅结束时间"
                    width="200"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.subEndTime }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="剩余天数" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.leftDays }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="link"
                    label="操作"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-button type="primary" @click="makeupdatetrue(row)">
                            修改
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="link"
                    label="操作"
                    width="100"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-button type="danger" @click="deleterow(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

    <el-dialog title="添加用户" v-model="showv1" width="30%">
        <el-form :model="formLabelAlign" label-width="80px" class="withborder">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formLabelAlign.phone" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="showv1 = false">取 消</el-button>
            <el-button type="primary" @click="confirmadd">确 定</el-button>
        </template>
    </el-dialog>

    <el-dialog title="修改用户" v-model="showv2" width="30%">
        <el-form
            :model="updateform"
            label-position="left"
            label-width="auto"
            class="withborder"
        >
            <el-form-item label="用户名">
                <el-input v-model="updateform.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="updateform.password" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="updateform.phone" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="updateform.email" />
            </el-form-item>
            <el-form-item label="是否有效">
                <el-switch v-model="updateform.isActived" />
            </el-form-item>
            <el-form-item label="订阅开始时间">
                <!-- <el-input v-model="updateform.subStartTime" /> -->
                <el-date-picker
                    v-model="updateform.subStartTime"
                    type="date"
                    placeholder="Pick a day"
                    size="small"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <el-form-item label="订阅结束时间">
                <!-- <el-input v-model="updateform.subEndTime" /> -->
                <el-date-picker
                    v-model="updateform.subEndTime"
                    type="date"
                    placeholder="Pick a day"
                    size="small"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="showv2 = false">取 消</el-button>
            <el-button type="primary" @click="confirmupdate">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useUserManageStore } from "@/stores/userManage";
//todo 导入 uuid
import { v4 as uuidv4 } from "uuid";

import { CirclePlus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const useusermanage = useUserManageStore();
const { getAllUsers } = useusermanage;

const tabledata = ref([]);

onMounted(async () => {
    const res = await getAllUsers();
    tabledata.value = res.data;
});

// !添加用户的函数
const showv1 = ref(false);
const makeaddture = () => {
    console.log("添加用户");
    showv1.value = true;
};

const formLabelAlign = reactive({
    uid: "",
    username: "",
    password: "",
    phone: "",
    email: "",
});

const confirmadd = async () => {
    console.log(formLabelAlign);
    const uid = uuidv4();
    const username = formLabelAlign.username;
    const password = formLabelAlign.password;
    const phone = formLabelAlign.phone;
    const email = formLabelAlign.email;
    const res = await useusermanage.addUser(
        uid,
        username,
        password,
        phone,
        email
    );
    console.log(res);
    if (res.data !== "") {
        ElMessage.success("添加成功");
        showv1.value = false;
        const res2 = await getAllUsers();
        tabledata.value = res2.data;
        formLabelAlign.username = "";
        formLabelAlign.password = "";
        formLabelAlign.phone = "";
        formLabelAlign.email = "";

        return;
    }
    ElMessage.error("添加失败");
};

//! update user
const updateform = reactive({
    uid: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    isActived: null,
    subStartTime: "",
    subEndTime: "",
});

const showv2 = ref(false);
const makeupdatetrue = (row) => {
    console.log(row);
    showv2.value = true;
    updateform.uid = row.uid;
    updateform.username = row.username;
    updateform.password = row.password;
    updateform.phone = row.phone;
    updateform.email = row.email;
    updateform.isActived = row.isActived;
    updateform.subStartTime = row.subStartTime;
    updateform.subEndTime = row.subEndTime;
};

const confirmupdate = async () => {
    console.log(updateform);
    const res = await useusermanage.updateUser(updateform);
    console.log(res);
    if (res.data !== "") {
        ElMessage.success("修改成功");
        showv2.value = false;
        const res2 = await getAllUsers();
        tabledata.value = res2.data;
        return;
    }
};

//todo 删除用户
const deleterow = async (row) => {
    console.log(row);

    const res = await useusermanage.deleteUser(row.uid);
    // console.log(res);

    const res2 = await getAllUsers();
    tabledata.value = res2.data;
};
</script>

<style lang="less" scoped></style>
