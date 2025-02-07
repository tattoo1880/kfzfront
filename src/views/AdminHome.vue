<template>
    <div>
        <AdminHeader />
    </div>
    <div>
        <RouterView />
    </div>
    <el-divider>
        <el-icon><star-filled color="#409EFF" /></el-icon>
    </el-divider>
</template>

<script setup>
import { ref, reactive } from "vue";
import AdminHeader from "@/components/Admin/AdminHeader.vue";

</script>

<style scoped>
.el-image {
    width: 100%;
    height: 90vh;
}
</style>