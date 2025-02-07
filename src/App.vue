<template>
  <!-- todo routerview -->
  <div class="bodybody">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Myheader from "@/components/Myheader.vue";
</script>

<style scoped>
.body {
  height: 100vh;
  overflow: hidden;
}
</style>