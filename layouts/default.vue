<template>
  <div class="flex gap-16">
    <div
      :class="{
        'w-72': open,
        'w-20': !open,
        hidden: path == '/login',
      }"
      class="font-abc"
    >
      <Sidebar @reload="open = $event" />
    </div>
    <div class="w-full font-abc max-sm:pl-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(true);
const router = useRouter();
const path = ref(router.currentRoute.value?.path);
</script>

<style scoped></style>
