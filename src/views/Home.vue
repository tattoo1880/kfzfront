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
import { ElLoading, ElMessage } from "element-plus";

const tokenStore = useTokenStore();
const socket = ref(null);
const isConnected = ref(false);

// 使用 computed 监听用户ID
const userId = computed(() => tokenStore.userinfo?.uid);

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
</script>

<style scoped>
.el-image {
    width: 100%;
    height: 90vh;
}
</style>
