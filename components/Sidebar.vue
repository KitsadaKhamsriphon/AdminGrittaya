<template>
  <div
    class="h-full z-10 flex flex-col fixed font-abc min-h-dvh text-cyan-50 bg-[#083718]"
  >
    <div class="flex">
      <div
        :class="{ 'w-72': open, 'w-20': !open }"
        class="h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between"
      >
        <img
          src="/images/11.png"
          @click="toggleSidebar"
          class="absolute cursor-pointer -right-3 top-9 w-7 border-2 bg-[#083718] rounded-full transition-transform duration-300"
          :class="{ 'rotate-180': !open }"
        />

        <div>
          <div class="flex gap-x-4 items-center">
            <img
              src="/images/admin.png"
              class="cursor-pointer duration-500 h-[40px] w-[40px] transition-transform"
              :class="{ 'rotate-360': open }"
            />
            <h1
              class="origin-left font-bold text-xl duration-200"
              :class="{ 'scale-0': !open }"
            >
              Admin Grittaya
            </h1>
          </div>

          <ul class="pt-6">
            <li
              v-for="(menu, index) in menus"
              :key="index"
              class="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-lg font-semibold items-center gap-x-4"
              :class="{
                'mt-20': menu.gap,
                'mt-2': !menu.gap,
                'bg-light-white': index === 0,
              }"
            >
              <NuxtLink :to="menu.link">
                <img :src="`${menu.src}`" class="w-5 h-5" />
              </NuxtLink>
              <span
                :class="{
                  hidden: !open,
                  'origin-left': true,
                  'duration-200': true,
                }"
              >
                <NuxtLink :to="menu.link">
                  {{ menu.title }}
                </NuxtLink>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["reload"]);
const open = ref(true);

const menus = [
  {
    title: "จัดการสินค้า",
    src: "/images/01.png",
    link: "/",
  },
  { title: "พวงมาลัย", src: "/images/02.png" },
  { title: "น้ำอบ", src: "/images/05.png" },
  { title: "บายศรี", src: "/images/03.png" },
  { title: "สังฆทาน", src: "/images/04.png" },
  {
    title: "บทความ",
    src: "/images/05.png",
    gap: true,
    link: "/ManageContent",
  },
  { title: "ข่าว", src: "/images/06.png" },
  { title: "วันสำคัญ", src: "/images/07.png" },
  {
    title: "ออกจากระบบ",
    src: "/images/09.png",
    gap: true,
    link: "",
  },
];

const toggleSidebar = () => {
  open.value = !open.value;
  emit("reload", open.value);
};
</script>

<style scoped>
.rotate-360 {
  transform: rotate(360deg);
}
</style>
