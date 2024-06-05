<template>
  <div class="w-full">
    <TableContent :data="Content" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const open = ref(true);

const router = useRouter();
const Content = ref([]);

onMounted(() => {
  const storedContent = localStorage.getItem("Contents");
  if (storedContent) {
    Content.value = JSON.parse(storedContent);
  }
});
</script>

<style scoped></style>
