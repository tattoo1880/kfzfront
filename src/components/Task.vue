<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-aside width="300px" class="aside"> <el-row class="row-bg" justify="end" style="margin-top: 30px">
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-tag type="success" style="margin-right: 20px">剩余任务额度:{{ myquotaleft }}</el-tag>
                        </el-col>


                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="success" plain @click="newsendall" :disabled="todayuploadcount >= 10000">
                                今日任务
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="danger" plain @click="downall">
                                下架所有
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="warning" plain @click="deleteallweigui">
                                删除所有违规
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="primary" plain @click="deleteallinstock">
                                删除所有仓库中
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="primary" plain @click="deleteimage">
                                清空图片
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="primary" plain @click="deletealltask">
                                清空所有任务
                            </el-button>
                        </el-col>
                        <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                            <el-button type="primary" plain @click="deleteoldgoods">
                                删除最早的 1w 条商品
                            </el-button>
                        </el-col>

                    </el-row></el-aside>
                <el-main class="aman">

                    <el-row class="row-bg" justify="center">
                        <el-text>
                            <h2 style="color: #409eff">我的任务</h2>
                        </el-text>
                    </el-row>
                    <el-row class="row-bg" justify="center">
                        <el-col :span="12" style="margin-top: 40px;padding-left: 30px;height:90vh">
                            <el-card style="width: 480px;height: 60vh;margin-top: 30px;" shadow="always" class="card">
                                <el-row class="row-bg" justify="center">
                                    <el-text type="primary">
                                        <h2 style="color: #409eff">今日明细:</h2>
                                    </el-text>
                                </el-row>
                                <el-row class='row-bg' justify='start'>
                                    <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                                        <el-tag type="success" style="margin-right: 20px;height: 100px;width: 400px;">
                                            <el-text>
                                                <h2 style="color: #32CD32">今日上传任务数:{{ todayuploadcount }}</h2>
                                            </el-text>
                                        </el-tag>
                                    </el-col>
                                    <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                                        <el-tag type="primary" style="margin-right: 20px;height:100px;width:400px">
                                            <el-text>
                                                <h2 style="color: #409eff">数据库内未上传任务数:{{ nouploadcount }}</h2>
                                            </el-text>
                                        </el-tag>
                                    </el-col>

                                </el-row>
                            </el-card>
                        </el-col>
                        <el-col :span="12" style="margin-top: 40px;padding-left: 30px;height:90vh">
                            <el-card style="width: 480px;height: 60vh;margin-top: 30px;" shadow="always" class="card">
                                <el-row class="row-bg" justify="center">
                                    <el-text type="primary">
                                        <h2 style="color: #409eff">店铺信息:</h2>
                                    </el-text>
                                </el-row>
                                <el-row class='row-bg' justify='start'>
                                    <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                                        <el-tag type="success" style="margin-right: 20px;height: 100px;width: 400px;">
                                            <el-text>
                                                <h2 style="color: #32CD32">店铺名称:{{ shopinfo1.shopName }}</h2>
                                            </el-text>
                                        </el-tag>
                                    </el-col>
                                    <el-col :span="24" style="margin-top: 40px;padding-left: 30px;">
                                        <el-tag type="primary" style="margin-right: 20px;height:100px;width:400px">
                                            <el-text>
                                                <h2 style="color: #409eff">店铺ID:{{ shopinfo1.shopIp }}</h2>
                                            </el-text>
                                        </el-tag>
                                    </el-col>

                                </el-row>
                            </el-card>

                        </el-col>


                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useTaskStore } from "@/stores/task";
import { ElLoading, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

const todayuploadcount = ref(0);
const nouploadcount = ref(0);
const shopinfo1 = ref({
    shopName: "",
    shopIp: "",
});

const tabledata = ref([]);
const myquotaleft = ref(0);
const alldata = ref([]);
const whetherall = ref(false);
//分页
const currentPage1 = ref(1);
const size = ref("small");
const disabled = ref(false);
const background = ref(true);
const total = ref(300);
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
};
const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    tabledata.value = alldata.value.slice((val - 1) * 100, val * 100);
};

const refresh = async () => {
    const res = await useTaskStore().getTaskByUid();
    const res3 = await useTaskStore().getmyallinfo();
    alldata.value = res.data;
    tabledata.value = alldata.value
        .slice((currentPage1.value - 1) * 100, currentPage1.value * 100)
        .filter((item) => {
            return !item.isOnSale;
        });
    const res2 = await useTaskStore().getmyallinfo();
    myquotaleft.value = res2.data.userQuota.quotaLeft;
};

onMounted(async () => {
    const elloading = ElLoading.service({
        fullscreen: true,
        text: "加载中，请稍后...",
    });
    try {
        // const res = await useTaskStore().getTaskByUid();
        const res2 = await useTaskStore().getmyallinfo();

        //! 取分页数据给tabtledata
        // alldata.value = res.data;
        // total.value = res.data.length;
        // tabledata.value = alldata.value.filter(item =>{
        //     return !item.isOnSale;
        // }).slice((currentPage1.value - 1) * 100, currentPage1.value * 100);
        const res = await useTaskStore().gettodaytaskinfo();
        console.log(res);
        todayuploadcount.value = res.data[0]
        nouploadcount.value = res.data[1]

        myquotaleft.value = res2.data.userQuota.quotaLeft;
        shopinfo1.value.shopName = useTaskStore().shopinfo.shopName;
        shopinfo1.value.shopIp = useTaskStore().shopinfo.shopIp;
        elloading.close();
    } catch (error) {
        console.log(error);
        ElMessage.error("加载失败");
        elloading.close();
    } finally {
        elloading.close();
    }
});

const handleUpload = async (row) => {
    console.log(row);

    const res = await useTaskStore().upLoad(row);
    console.log(res);
    if (res.data == "ok") {
        ElMessage.success("上传成功");
        await refresh();
    }
};

const handleDelete = async (row) => {
    console.log(row);
};

//监控myquotaleft,如果小于0,所有上传按钮不可用
watch(myquotaleft, (newVal) => {
    console.log(newVal);
    if (newVal <= 0) {
        ElMessage.error("已无额度,请充值");
        router.push({ name: "Profile" });
    }
});

//!监控todayuploadcount,如果小于 10000,则弹出是否进行今日任务提示
watch(todayuploadcount, (newVal) => {
    console.log(newVal);
    if (newVal < 10000) {
        ElMessage.error("今日任务未完成，请尽快完成");
    }
});

watch(whetherall, (newVal) => {
    console.log(newVal);
    if (!newVal) {
        tabledata.value = alldata.value
            .slice((currentPage1.value - 1) * 100, currentPage1.value * 100)
            .filter((item) => {
                return !item.isOnSale;
            });
    } else {
        tabledata.value = alldata.value
            .slice((currentPage1.value - 1) * 100, currentPage1.value * 100)
            .filter((item) => {
                return item.isOnSale;
            });
    }
});

const newsendall = async () => {
    try {
        ElLoading.service({
            fullscreen: true,
            text: "上传中，请稍后...",
        });

        console.log("newsendall");
        const res = await useTaskStore().newsendall();

        
    } catch (error) {
        console.log(error);
    } finally {
        ElLoading.service().close();
        
    }

}

const sendalltoback = async () => {
    let tasks = alldata.value.filter((item) => {
        return !item.isOnSale;
    });

    if (tasks.length == 0) {
        ElMessage.error("没有未上传的任务");
        return;
    }

    if (myquotaleft.value < tasks.length) {
        ElMessage.error("额度不足");
        return;
    }

    try {
        let taskslist = [];
        ElLoading.service({
            fullscreen: true,
            text: "上传中，请稍后...",
        });
        for (let i = 0; i < tasks.length; i++) {
            // const res = await useTaskStore().upLoad(tasks[i]);
            // console.log(res);
            // if (res.data == "ok") {
            //     ElMessage.success("上传成功");
            // }
            taskslist.push(useTaskStore().upLoad(tasks[i]));
        }
        const res = await Promise.all(taskslist);
        console.log(res);
        await refresh();
        ElLoading.service().close();
        ElMessage.success("全部上传成功");
    } catch (error) {
        console.log(error);
    } finally {
        ElLoading.service().close();
    }
};

const downall = async () => {


    const res = await useTaskStore().downallgoods();
    console.log(res);



}

const deleteallweigui = async () => {
    const res = await useTaskStore().delteallweigui();
    console.log(res);
}

const deleteallinstock = async () => {
    const res = await useTaskStore().deleteallinstock();
    console.log(res);
}

const deleteimage = async () => {
    const res = await useTaskStore().getonepageimageanddelete();
    console.log(res);
}


const deletealltask = async () => {
    const res = await useTaskStore().deltealltask();
    console.log(res);


}
const deleteoldgoods = async () => {
    const res = await useTaskStore().deleteoldgoods();
    console.log(res);
}
</script>


<style scoped>
aside {
    background-color: #f5f5f5;
    height: 90vh;
}

.card {
    background-color: #f5f5f5;
    border: 2px solid #c1c4c9;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 1, 0, 0.1);
}

.aman {
    background-color: #F5FFFA;
}
</style>
