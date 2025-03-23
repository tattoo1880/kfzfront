<template>
    <el-row class="row-bg" justify="end" style="margin-top: 30px">
        <el-col :span="6">
            <el-tag type="success" style="margin-right: 20px">剩余任务额度:{{ myquotaleft }}</el-tag>
        </el-col>
        <el-col :span="6">
            <el-switch v-model="whetherall" size="large" active-text="已上传" inactive-text="未上传" />
        </el-col>
        <el-col :span="6">
            <el-button type="primary" plain @click="sendalltoback">
                全部上传
            </el-button>
            <el-button type="success" plain @click="newsendall">
                每日任务
            </el-button>
            <el-button type="danger" plain @click="downall">
                下架所有
            </el-button>
            <el-button type="warning" plain @click="deleteallweigui">
                删除所有违规
            </el-button>
            <el-button type="primary" plain @click="deleteallinstock">
                删除所有仓库中
            </el-button>

        </el-col>
    </el-row>

    <el-row class="row-bg" justify="center">
        <el-text>
            <h2 style="color: #409eff">我的任务</h2>
        </el-text>
    </el-row>

    <el-row class="row-bg" justify="center">
        <el-col :span="24">
            <el-table :data="tabledata" style="width: 100%; height: 70vh" align="center">
                <!-- 2-11 加入index -->

                <el-table-column type="index" label="序号" width="100" align="center">
                    <template v-slot="scope">
                        <el-tag type="success">{{ scope.$index + 1 }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.uid }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="书名" width="150" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.goodName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="imgBigUrl" label="图片" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-image style="width: 100px; height: 100px" :src="row.img"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="authorname" label="价格" width="120" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.price }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 库存 -->
                <el-table-column prop="stock" label="品相" width="100" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.quantity }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 是否已经上传 -->
                <el-table-column prop="isOnSale" label="是否已经上传" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-tag v-if="!row.isOnSale" type="danger">未上传</el-tag>
                        <el-tag v-else type="success">已上传</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" width="400" align="center">
                    <template v-slot="{ row }">
                        <el-tag type="success">{{ row.description }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 操作 上传 -->
                <el-table-column label="操作" width="200" align="center">
                    <template v-slot="{ row }">
                        <el-button v-if="!row.isOnSale" type="primary" @click="handleUpload(row)"
                            :disabled="myquotaleft < 1">上传</el-button>
                        <el-button v-else type="success" disabled plain>已上传</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row class="row-bg" justify="center" style="margin-top: 30px">
        <el-pagination v-model:current-page="currentPage1" :page-size="100" :size="size" :disabled="disabled"
            :background="background" layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"></el-pagination>
    </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useTaskStore } from "@/stores/task";
import { ElLoading, ElMessage } from "element-plus";
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
    const res = await useTaskStore().getTaskByUid();
    const res2 = await useTaskStore().getmyallinfo();
    //! 取分页数据给tabtledata
    alldata.value = res.data;
    total.value = res.data.length;
    tabledata.value = alldata.value.slice(0, 100).filter((item) => {
        return !item.isOnSale;
    });
    console.log(res.data);
    console.log(res2.data);
    myquotaleft.value = res2.data.userQuota.quotaLeft;
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
// watch(myquotaleft, (newVal) => {
//     console.log(newVal);
//     if (newVal <= 49990) {
//         ElMessage.error("今日任务已完成");
//     }
// });

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
    console.log("newsendall");
    useTaskStore().newsendall();
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

</script>

<style lang="less" scoped></style>
