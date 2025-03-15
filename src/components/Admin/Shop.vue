<template>
    <el-row class="row-bg" justify="center">
        <el-text>
            <h2 style="color: #409eff">店铺管理</h2>
        </el-text>
    </el-row>

    <!-- 新建店铺按钮 -->
    <el-row class="bg-row" justify="end" style="margin-right: 30px">
        <el-button type="primary" :icon="CirclePlus" circle @click="prepareCreateShop" />
    </el-row>

    <!-- 新建店铺dialog -->
    <el-dialog title="新建店铺" v-model="showme1" width="30%" center>
        <el-form :model="createform" label-position="left" label-width="auto" class="withborder">
            <el-form-item label="店铺名">
                <el-input v-model="createform.shopname" />
            </el-form-item>
            <!-- <el-form-item label="手机编号">
                <el-input v-model="createform.uid" />
            </el-form-item>
            <el-form-item label="手机地址端口">
                <el-input v-model="createform.shopip" />
            </el-form-item> -->
            <!-- 选择用户 -->
            <el-form-item label="选择用户">
                <el-select v-model="createform.userid" placeholder="请选择用户">
                    <el-option v-for="item in userList" :key="item.uid" :label="item.username" :value="item.uid" ß />
                </el-select>
            </el-form-item>

            <!-- <el-form-item label="价格规则">
                <el-input v-model="createform.rule" placeholder="上浮比例使用*1.x,增加使用+xx的方式"/>
            </el-form-item> -->


            <!-- <el-form-item label="店铺key">
                <el-button type="danger" @click="aagetcookies">
                    获取key
                </el-button>
            </el-form-item> -->

            <el-form-item>
                <el-button type="primary" @click="createShop">新建</el-button>
                <el-button @click="showme1 = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- table -->
    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-table :data="tabledata" style="width: 100%; height: 70vh" align="center">
                <el-table-column prop="id" label="ID" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.uid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="shopname" label="店铺名" width="150" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.shopName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="shopip" label="店铺ID" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.shopIp }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="120" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.user.username }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 价格规则 -->
                <el-table-column prop="rule" label="价格规则" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.rule }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="shopid" label="到期时间" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{
                            row.user.subEndTime
                            }}</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="shopstatus"
                    label="店铺状态"
                    width="200"
                    align="center"
                >
                    <template v-slot="{ row }">
                        <el-tag v-if="row.shopstatus === 0" type="danger"
                            >未开启</el-tag
                        >
                        <el-tag v-else type="success">已开启</el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column prop="shopstatus" label="操作" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-button type="primary" @click="openupdateShop(row)">编辑</el-button>
                        <el-button type="danger" @click="handleDeleteShop(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

    <!-- 更新shop -->
    <el-dialog title="更新店铺" v-model="showme2" width="30%" center>
        <el-form :model="updateform" label-position="left" label-width="auto" class="withborder">
            <el-form-item label="店铺名">
                <el-input v-model="updateform.shopname" />
            </el-form-item>
            <el-form-item label="手机编号">
                <el-input v-model="updateform.uid" />
            </el-form-item>
            <el-form-item label="手机地址端口">
                <el-input v-model="updateform.shopip" />
            </el-form-item>
            <!-- 选择用户 -->
            <el-form-item label="选择用户">
                <el-select v-model="updateform.userid" placeholder="请选择用户">
                    <el-option v-for="item in userList" :key="item.uid" :label="item.username" :value="item.uid" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="updateShop">更新</el-button>
                <el-button @click="showme2 = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useShopStore } from "@/stores/shop";
import { ElMessage } from "element-plus";
import { CirclePlus } from "@element-plus/icons-vue";
//!导入uuid
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const userList = ref([]);
const tabledata = ref([]);

onMounted(async () => {
    const res = await useShopStore().getAllUsers();
    userList.value = res.data;
    console.log(userList.value);

    const res2 = await useShopStore().getShopList();
    console.log(res2.data);
    tabledata.value = res2.data;
});

// 新建店铺
const createform = reactive({
    shopname: "",
    uid: "",
    shopip: "",
    userid: "",
    rule: "",
});

const showme1 = ref(false);
const prepareCreateShop = () => {
    console.log("新建店铺");
    showme1.value = true;
    createform.shopname = "";
    createform.uid = "";
    createform.shopip = "";
    createform.userid = "";
};

const createShop = async () => {
    console.log("新建店铺");

    createform.uid = uuidv4();

    const res = await useShopStore().createShop(
        createform.uid,
        createform.shopname,
        createform.shopip,
        createform.userid
    );
    

    if (res.data !== "") {
        showme1.value = false;
        const res2 = await useShopStore().getShopList();
        tabledata.value = res2.data;
    }
};

// 删除店铺
const handleDeleteShop = async (row) => {
    console.log(row);
    const userid = row.userUid;
    console.log(userid);

    const res = await useShopStore().deleteByuseruid(userid);
    console.log(res);
    if (res.data !== "") {
        ElMessage.success("删除成功");
        const res2 = await useShopStore().getShopList();
        tabledata.value = res2.data;
    }
};

// 更新店铺
const updateform = reactive({
    shopname: "",
    uid: "",
    shopip: "",
    userid: "",
});

const showme2 = ref(false);

const openupdateShop = (row) => {
    console.log(row);
    updateform.shopname = row.shopName;
    updateform.uid = row.uid;
    updateform.shopip = row.shopIp;
    updateform.userid = row.user.uid;
    showme2.value = true;
};

const updateShop = async () => {
    console.log("更新店铺");
    console.log(updateform);
    const res = await useShopStore().updateByuseruid(updateform);
    console.log(res);

    if (res.data !== "") {
        ElMessage.success("更新成功");
        showme2.value = false;
        const res2 = await useShopStore().getShopList();
        tabledata.value = res2.data;
    }
};


const aagetcookies = async () => {
    const res = await axios.post("http://localhost:8080/getcookies",
        {
            shopname: createform.shopname,
            userid: createform.userid,
            rule: createform.rule,
        },
        {
            timeout: 1000000,
        }


    );

    if (res.data.status === "ok") {
        ElMessage.success("获取成功");
        showme1.value = false;
        const res2 = await useShopStore().getShopList();
        tabledata.value = res2.data;
    }
    else {
        ElMessage.error("获取失败");
        showme1.value = false;
        const res2 = await useShopStore().getShopList();
        tabledata.value = res2.data;
    }


};
</script>

<style lang="less" scoped></style>
