<template>
    <div>
        <Myheader />
    </div>
    <div>
        <RouterView />
    </div>
    <!-- <el-divider>
        <el-icon><star-filled color="#409EFF" /></el-icon>
    </el-divider> -->
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, provide, computed } from "vue";
import Myheader from "@/components/Myheader.vue";
import WssBaseUrl from "@/utils/Wssurl.js";
import { useTokenStore } from "@/stores/token.js";
import { useMessageStore } from "@/stores/message.js";
import { ElLoading, ElMessage } from "element-plus";

const tokenStore = useTokenStore();
const socket = ref(null);
const isConnected = ref(false);
const messageStore = useMessageStore();

// 使用 computed 监听用户ID
const userId = computed(() => tokenStore.userinfo?.uid);

// 发送消息的通用函数
const sendMessage = (data) => {
    if (!data || typeof data !== "object") {
        data = "ping";
    }

    // 1. 检查 socket 是否存在且处于 OPEN 状态 (1 代表连接成功)
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
        // 2. 将对象转换为字符串发送（后端通常接收字符串化的 JSON）
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        console.log("📤 准备发送消息:", data);
        const messageStr = JSON.stringify(data);
        socket.value.send(messageStr);
        console.log("📤 消息已发送:", data);
    } else {
        console.error("❌ 消息发送失败：WebSocket 未连接或已断开");
        ElMessage.error("网络连接已断开，请稍后再试");
    }
};

// WebSocket 连接函数
const connectWebSocket = (uid) => {
    if (!uid) {
        console.error("❌ 用户ID为空");
        return;
    }

    // 关闭已有连接
    if (socket.value && socket.value.readyState !== WebSocket.CLOSED) {
        console.log("🔄 关闭旧连接");
        socket.value.close();
    }

    const wsUrl = `${WssBaseUrl}?user_id=${uid}`;
    console.log("🔗 连接到:", wsUrl);

    socket.value = new WebSocket(wsUrl);

    socket.value.onopen = () => {
        console.log("✅ WebSocket 已连接");
        isConnected.value = true;

        // 发送认证信息
        const authData = {
            type: "auth",
            user_id: uid,
            token: tokenStore.token, // 如果需要 token
        };
        socket.value.send(JSON.stringify(authData));
        console.log("📤 发送认证:", authData);

        // 发送初始消息（如果需要）
        sendMessage("ping");
    };

    socket.value.onmessage = (event) => {
        console.log("📩 收到消息:", event.data);
        const message = JSON.parse(event.data);
        console.log("📝 解析消息:", message);

        if (message.lock_list === null) {
            console.log("🔒 锁定列表为空");
            return;
        }

        if (message.lock_list) {
            console.log("🔒 锁定列表更新:", message.lock_list);
            // 在这里处理锁定列表更新逻辑

            console.log(uid);
            const hasMatch = message.lock_list.some((item) =>
                item.includes(uid),
            );
            if (hasMatch) {
                ElMessage.warning("爬虫任务正在运行");
            }
        }

        if (message.message === "message_list") {
            console.log("📬 收到消息列表:", message.data);
            messageStore.fillMessageList(message.data);

            const response1 = messageStore.gettheMessageList();
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
            console.log("📬 从消息存储获取的消息列表:", response1);
        }
    };

    socket.value.onerror = (error) => {
        console.error("❌ WebSocket 错误:", error);
        isConnected.value = false;
    };

    socket.value.onclose = () => {
        console.log("🔌 连接关闭");
        isConnected.value = false;

        // 重连逻辑
        if (userId.value) {
            setTimeout(() => {
                console.log("🔄 重新连接...");
                connectWebSocket(userId.value);
            }, 5000);
        }
    };
};

// 监听用户ID变化
watch(
    userId,
    (newUserId, oldUserId) => {
        console.log(`👁️ 用户ID变化: ${oldUserId} -> ${newUserId}`);

        if (newUserId) {
            connectWebSocket(newUserId);
        }
    },
    { immediate: true },
);

onMounted(async () => {
    console.log("🚀 App 挂载");

    // 如果 tokenStore 需要异步加载
    if (!tokenStore.userinfo?.uid) {
        console.log("⏳ 等待用户信息加载...");
        // 如果 tokenStore 有 loadUserInfo 方法
        // await tokenStore.loadUserInfo();
    }
});

onUnmounted(() => {
    console.log("👋 App 卸载");
    if (socket.value) {
        socket.value.close();
    }
});

// 提供 sendMessage 函数给子组件使用
provide("sendMessage", sendMessage);
</script>

<style scoped>
.el-image {
    width: 100%;
    height: 90vh;
}
</style>
