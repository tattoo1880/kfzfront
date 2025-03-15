<template>
    <div>
        <el-row class="row-bg" justify="center">
            <el-text>
                <h2 style="color: #409eff">我的店铺</h2>
            </el-text>
        </el-row>

        <el-row class="bg-row" justify="end" style="margin-right: 30px">
            <el-button type="primary" plain @click="openurlhandler">
                获取店铺授权
            </el-button>
        </el-row>
    </div>

    <!-- 建立一个 card 显示自己店铺的信息 -->
    <el-card class="box-card" style="margin: 20px">
        <template #header>
            <div class="card-header">
                <span>{{ shopinfo.shopName }}</span>
            </div>
        </template>
        <el-descriptions :column="1" border>
            <el-descriptions-item label="店铺ID">
                {{ shopinfo.shopUid }}
            </el-descriptions-item>
            <el-descriptions-item label="店铺用户ID">
                {{ shopinfo.shopUserId }}
            </el-descriptions-item>
            <el-descriptions-item label="店铺topSession">
                {{ shopinfo.shoptopsession }}
            </el-descriptions-item>
            <el-descriptions-item label="店铺运费规则">
                <el-tag v-if="shopinfo.yfrule" type="success">{{
                    shopinfo.yfrule
                }}</el-tag>
                <el-button v-else type="danger" plain @click="chooseyf"
                    >选择运费模版</el-button
                >
            </el-descriptions-item>
        </el-descriptions>
    </el-card>

    <!-- 选择运费模版的 dialog -->
    <el-dialog title="选择运费模版" v-model="showme1" width="30%" center>
        <el-form
            :model="createform"
            label-position="left"
            label-width="auto"
            class="withborder"
        >
            <el-form-item label="选择运费模版">
                <el-select
                    v-model="createform.yfrule"
                    placeholder="请选择运费模版"
                >
                    <el-option
                        v-for="item in yfruleList"
                        :key="item.template_id"
                        :label="item.name"
                        :value="item.template_id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmyf">确定</el-button>
                <el-button @click="showme1 = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <!-- rule 区域 -->

    <el-row class="row-bg" justify="center">
        <el-text>
            <h2 style="color: #409eff">店铺规则</h2>
        </el-text>
    </el-row>

    <!-- 价格规则输入区域 -->
    <el-row class="bg-row" justify="end" style="margin-right: 30px">
        <el-col :span="4">
            <el-input
                v-model="newRule.startPrice"
                style="width: 240px"
                placeholder="起始价格"
            />
        </el-col>

        <el-col :span="4">
            <el-input
                v-model="newRule.endPrice"
                style="width: 240px"
                placeholder="结束价格"
            />
        </el-col>

        <el-col :span="4">
            <el-select v-model="newRule.method" style="width: 240px">
                <el-option label="+" value="+" />
                <el-option label="*" value="*" />
            </el-select>
        </el-col>

        <el-col :span="4">
            <el-input
                v-model="newRule.value"
                style="width: 240px"
                placeholder="数值"
            />
        </el-col>

        <el-col :span="4">
            <el-button type="primary" @click="addRule">添加规则</el-button>
        </el-col>
    </el-row>

    <!-- 规则表格 -->
    <el-table
        :data="ruletablelist"
        style="width: 100%; height: 70vh"
        align="center"
    >
        <el-table-column prop="id" label="ID" width="300" align="center">
            <template v-slot="{ row }">
                <el-tag type="success">{{ row.id }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            prop="startPrice"
            label="起始价格"
            width="300"
            align="center"
        >
            <template v-slot="{ row }">
                <el-tag type="success">{{ row.startPrice }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            prop="endPrice"
            label="结束价格"
            width="300"
            align="center"
        >
            <template v-slot="{ row }">
                <el-tag type="success">{{ row.endPrice }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="method" label="方法" width="300" align="center">
            <template v-slot="{ row }">
                <el-tag type="success">{{ row.method }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="value" label="数值" width="300" align="center">
            <template v-slot="{ row }">
                <el-tag type="success">{{ row.value }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
            <template v-slot="{ row }">
                <el-button type="danger" plain @click="delthisrule(row.id)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTbSdkstore } from "@/stores/tbsdk";
import { ElMessage } from "element-plus";

const newRule = reactive({
    startPrice: "",
    endPrice: "",
    method: "",
    value: "",
    uid: "",
});

const ruletablelist = ref([]);

const delthisrule = async (id) => {
    const res = await useTbSdkstore().deleteRule(id);
    console.log(res.data);
    const res2 = await useTbSdkstore().getruleByuid();
    console.log(res2.data);
    ruletablelist.value = res2.data;
    console.log(ruletablelist.value);
};

const addRule = async () => {
    console.log(newRule);
    const res = await useTbSdkstore().addRule(newRule);
    console.log(res.data);

    const res2 = await useTbSdkstore().getruleByuid();
    console.log(res2.data);
    ruletablelist.value = res2.data;
    console.log(ruletablelist.value);
};

const showme1 = ref(false);
const chooseyf = async () => {
    const res = await useTbSdkstore().getyftemplate(shopinfo.shopName);
    console.log(res.data);
    yfruleList.value = res.data;
    showme1.value = true;
};

const confirmyf = async () => {
    console.log(createform.yfrule);
    const res = await useTbSdkstore().updateyf(createform.yfrule);
    console.log(res.data);
    window.location.reload();
};

const createform = reactive({
    yfrule: "",
});

const yfruleList = ref([]);

const shopinfo = reactive({
    shopName: "",
    shopUid: "",
    shopUserId: "",
    shoptopsession: "",
    yfrule: "",
});

const openurl = ref("");

onMounted(async () => {
    const res1 = await useTbSdkstore().getshopbyuid();
    console.log(res1.data);

    if (res1.data.shopName === "") {
        ElMessage.error("请联系管理员先创建店铺");
    } else {
        ElMessage.success("店铺读取成功");
        shopinfo.shopName = res1.data.shopName;
        shopinfo.shopUid = res1.data.shopIp;
        shopinfo.shopUserId = res1.data.userUid;
        shopinfo.shoptopsession = res1.data.topSession;
        shopinfo.yfrule = res1.data.yfRule;
    }

    const res = await useTbSdkstore().getAuth();
    console.log(res.data);
    openurl.value = res.data;

    const res3 = await useTbSdkstore().getruleByuid();
    console.log(res3.data);
    ruletablelist.value = res3.data;
});

const openurlhandler = () => {
    window.open(openurl.value);
};
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
