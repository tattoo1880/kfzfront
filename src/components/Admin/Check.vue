<template>
    <div>
        <el-row class="row-bg" justify="center">
            <el-text class="title" style="font-size: 30px; color: #409eff">
                <h4>充值信息</h4>
            </el-text>
        </el-row>
    </div>

    <div>
        <el-row class="row-bg" justify="center">
            <!-- table -->
            <el-col :span="24">
                <el-table
                    :data="tabledata"
                    ref="multipleTableRef"
                    style="width: 100%; height: 70vh"
                    align="center"
                    :default-sort="{ prop: 'createTime', order: 'descending' }"
                >
                    <!-- 单选 -->
                    <el-table-column
                        type="index"
                        label="序号"
                        width="100"
                        align="center"
                    >
                        <template v-slot="scope">
                            <el-tag type="success">{{
                                scope.$index + 1
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="红包口令"
                        width="100"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.uid }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="150"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-tag type="success">{{
                                row.user.username
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="充值金额"
                        width="100"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.amout }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="充值时间"
                        width="300"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.createTime }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="status"
                        label="状态"
                        width="120"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-tag
                                :type="
                                    row.status == '未确认'
                                        ? 'danger'
                                        : 'success'
                                "
                                >{{
                                    row.status == "未确认" ? "未确认" : "已充值"
                                }}</el-tag
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="action"
                        label="操作"
                        width="120"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-button
                                type="primary"
                                @click="handleEdit(row)"
                                :disabled="row.status == '已充值'"
                                >确认</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="action"
                        label="操作"
                        width="120"
                        align="center"
                    >
                        <template v-slot="{ row }">
                            <el-button type="warning" @click="handleDel(row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>

    <el-dialog title="确认充值结果" v-model="showme1" width="30%" center>
        <el-form
            :model="updateform"
            label-position="left"
            label-width="auto"
            class="withborder"
        >
            <el-form-item label="口令红包口令">
                <el-input v-model="updateform.uid" disabled />
            </el-form-item>
            <el-form-item label="充值金额">
                <el-input v-model="updateform.amout" />
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="updateform.status" placeholder="请选择">
                    <el-option label="未确认" value="未确认"></el-option>
                    <el-option label="已充值" value="已充值"></el-option>
                    <el-option label="无效" value="无效"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值时间">
                <el-tag type="success">{{ updateform.createTime }}</el-tag>
            </el-form-item>

            <el-row class="row-bg" justify="end" style="margin-right: 20px">
                <el-button type="primary" @click="updatecheck">
                    确认
                </el-button>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useCheckStore } from "@/stores/check";
import { ElMessage } from "element-plus";
import { sortOrders } from "element-plus/es/components/table-v2/src/constants";

const tabledata = ref([]);
onMounted(async () => {
    console.log("mounted");
    const res = await useCheckStore().getallcheck();
    tabledata.value = res.data;
});

//update
const showme1 = ref(false);
const updateform = reactive({
    uid: "",
    amout: "",
    status: "",
    orderImg: null,
    createTime: "",
    confirmTime: "",
});

const handleEdit = async (row) => {
    console.log(row);
    showme1.value = true;
    updateform.uid = row.uid;
    updateform.amout = row.amout;
    updateform.status = row.status;
    updateform.orderImg = row.orderImg;
    updateform.createTime = row.createTime;
    updateform.confirmTime = row.confirmTime;
};

const handleDel = async (row) => {
    console.log(row);
};

const updatecheck = async () => {
    const res = await useCheckStore().updatecheck(updateform);
    console.log(res);
    if (res.data != "") {
        showme1.value = false;
        const res = await useCheckStore().getallcheck();
        tabledata.value = res.data;
        ElMessage.success("更新成功");
        showme1.value = false;
    } else {
        ElMessage.error("更新失败");
        showme1.value = false;
    }
};
</script>

<style lang="less" scoped></style>
