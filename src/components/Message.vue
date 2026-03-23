<template>
    <div>
        <el-row class="row-bg" justify="center">
            <el-text>
                <h2 style="color: #409eff">消息列表</h2>
            </el-text>
        </el-row>
    </div>

    <!-- todo 加一个全部删除的按钮在最右侧 -->
    <el-row
        class="row-bg"
        justify="end"
        style="margin-top: 10px; margin-right: 5%"
    >
        <el-button size="small" type="danger" @click="deleteAllMessages">
            删除全部消息
        </el-button>
    </el-row>

    <el-row class="row-bg" justify="center" style="margin-top: 20px">
        <el-table
            :data="messagelist"
            :default-sort="{ prop: 'status', order: 'descending' }"
            style="width: 90%; height: 70vh"
            align="center"
        >
            <el-table-column prop="id" label="ID" width="380">
                <template #default="{ row }">
                    <el-text class="mx-1" type="primary">{{ row.id }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="消息内容" />
            <!-- todo 增加状态 -->
            <el-table-column prop="status" label="状态" sortable width="120">
                <template #default="{ row }">
                    <el-tag :type="row.status === 0 ? 'danger' : 'success'">
                        {{ row.status === 0 ? "未读" : "已读" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="时间" width="280" />
            <!-- todo 增加已读 和 删除功能 -->
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <el-button
                        size="small"
                        type="success"
                        @click="markAsRead(row.id)"
                    >
                        标记为已读
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="deleteMessage(row.id)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useMessageStore } from "@/stores/message.js";
import axios from "axios";
const messageStore = useMessageStore();
const messagelist = computed(() => messageStore.gettheMessageList());
console.log("💬 当前消息列表:", messagelist.value);

const markAsRead = async (id) => {
    console.log("✅ 标记消息已读，ID:", id);
    await messageStore.markAsRead(id);
};

const deleteMessage = async (id) => {
    console.log("🗑️ 删除消息，ID:", id);
    await messageStore.deleteMessage(id);
};

const deleteAllMessages = async () => {
    console.log("🗑️ 删除全部消息");
    await messageStore.clearMessages();
};
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
