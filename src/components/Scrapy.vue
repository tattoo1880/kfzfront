<template>

    <div class="layout">

        <el-container class="bg-container">
            <el-asider class="bg-sidebar">
                <Usersiderbar />
            </el-asider>

            <el-main class="bg-main">

                <el-row class="bg-row" justify="center">
                    <el-text>
                        <h2 style="color: #409eff">寻找货源</h2>
                    </el-text>
                </el-row>

                <!-- <el-row class="row-bg" justify="space-evenly" style="width: 100vw">
                    <div class="mt-4">
                        <el-input v-model="kw2" style="max-width: 1600px; width: 800px"
                            placeholder="请输入整体上传的店铺名，多店铺名以-分隔" class="input-with-select">
                            <template #append>
                                <el-button @click="handlesearch2">
                                    <el-icon>
                                        <Search />
                                    </el-icon>
                                </el-button>
                            </template>
</el-input>
</div>
</el-row>

<hr /> -->

                <el-row class="row-bg" justify="space-evenly">
                    <div class="mt-4">
                        <el-input v-model="kw3" style="max-width: 1600px; width: 800px"
                            placeholder="配合金钥匙更新店铺违禁词,请输入单一店铺的id,确保店铺全部商品已经上架并且不要超过3万条" class="input-with-select">
                            <template #append>
                                <el-button @click="handlesearch3">
                                    <el-icon>
                                        <Search />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-input>
                    </div>
                </el-row>


                <!-- =========dialog ========= -->
                <el-dialog v-model="showdialog" title="请选择自定义分组" width="500" :before-close="dialogclose">
                    <el-row class="row-bg" justify="center">
                        <el-col :span="24">
                            <el-select v-model="selectshopcid" placeholder="请选择分组" style="width: 100%">
                                <el-option v-for="item in reslist" :key="item.cid" :label="item.name"
                                    :value="item.cid"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="showdialog = false">取消</el-button>
                            <el-button type="primary" @click="newstartScrapy">
                                开始
                            </el-button>
                        </div>
                    </template>
                </el-dialog>

            </el-main>
        </el-container>



    </div>


</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { myfectch } from "@/utils/Myfetch";
import { useTokenStore } from "@/stores/token";
import { useTaskStore } from "@/stores/task";
import { useCartsStore } from "@/stores/carts";
import { ElLoading, ElMessage } from "element-plus";
import { useRouter } from "vue-router";


import Usersiderbar from "@/components/Usersiderbar.vue";


import axios from "axios";
import GoGinApiUrl from "@/utils/GoGinApiUrl";
const router = useRouter();

const { getToken } = useTokenStore();
const useCarts = useCartsStore();

const jwt = getToken();
console.log("=========");
console.log(jwt);
console.log("=========");
const mytaskstatus = ref(false);
// 分页

const kw = ref("");
const kw3 = ref("");

const totalnum = ref(0);

const tabledata = ref([]);


const items = ref([]);


const kw2 = ref("");

const showdialog = ref(false);

const handlesearch2 = () => {
    showdialog.value = true;
    console.log(kw2.value);
    console.log(reslist.value);
};


const handlesearch3 = async () => {
    if (kw3.value === "") {
        ElMessage.error("请输入店铺id");
        return;
    }

    showdialog.value = true;
}


const newgetallinfonew = async (kw) => {
    var kwlist = [];
    if (kw.includes("-")) {
        kwlist = kw.split("-");
    } else {
        kwlist.push(kw);
    }
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    console.log(selectshopcid.value)
    const shop_cid_str = selectshopcid.value.toString()
    try {
        const res = await axios.post(
            // "https://ss.purecode.dpdns.org/gogood/makedd",
            `${GoGinApiUrl}/gogood/make`,
            {
                shop_id: kwlist,
                user_id: useTokenStore().getInfo().uid,
                shop_cid: shop_cid_str,
            },
            {
                timeout: 0,
            }
        );
        console.log("========newgetallinfonew 返回数据=========");
        console.log(res);
        console.log("========newgetallinfonew 返回数据=========");
        return res
    } catch (error) {
        console.log(error);
    }
};


const reslist = ref([]);
const selectshopcid = ref("");

onMounted(async () => {
    const eloading = ElLoading.service({
        lock: true,
        text: "正在获取数据",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });
    try {
        const res = await useCarts.getCartsByUid();
        console.log("=========获取到shopcid===========");
        console.log(res);
        console.log("=========获取到shopcid===========");
        reslist.value = res;
    } catch (error) {
        console.error(error);
    } finally {
        eloading.close();
    }
});



const newstartScrapy = async () => {
    console.log("开始抓取");
    console.log(kw3.value);
    console.log(selectshopcid.value);

    if (kw3.value === "" || selectshopcid.value === "") {
        ElMessage.error("请填写店铺名和选择分组");
        return;
    }

    const eloading = ElLoading.service({
        lock: true,
        text: "正在获取数据",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });
    try {
        const res = await newgetallinfonew(kw3.value);
        console.log(res);
        if (res.status !== 200) {
            throw new Error("获取数据失败");
        }
        if (res.data.message == "Goods created successfully") {
            ElMessage.success("获取数据成功");
            router.push({ name: "Task" });
        } else {
            throw new Error("获取数据失败");
        }
        eloading.close();
        ElMessage.success("获取数据成功");
        router.push({ name: "Task" });
    } catch (error) {

        await new Promise((resolve) => setTimeout(resolve, 15000));

        const nosendtasknum = await useTaskStore().gettodaytaskinfo();
        console.log(nosendtasknum);
        console.log(nosendtasknum.data[1]);
        //! 循环10 次
        for (let i = 0; i < 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 30000));

            const res = await useTaskStore().gettodaytaskinfo();
            const resdataqty = res.data[1]
            console.log(resdataqty);
            if (resdataqty > nosendtasknum.data[1]) {
                ElMessage.success("获取数据成功");
                router.push({ name: "Task" });
                break;
            } else {
                continue;
            }
        }

        console.error(error);
        ElMessage.error("获取数据失败");
        eloading.close();



    } finally {
        // ElMessage.error("获取数据失败");
        eloading.close();
        router.push({ name: "Task" });
    }
    ElMessage.success("抓取任务已开始，请稍后查看任务列表");
};


const dialogclose = () => {
    showdialog.value = false;
    selectshopcid.value = "";
    reslist.value = [];
    console.log("关闭对话框");
};
</script>

<style scoped>
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.bg-container {
    height: calc(100vh - 60px);
}

.bg-sidebar {
    width: 220px;
    height: 100%;
}

.bg-main {
    height: 100%;
    width: calc(100vw - 220px);
    overflow-y: auto;
}

/* 背景图片 */
</style>
