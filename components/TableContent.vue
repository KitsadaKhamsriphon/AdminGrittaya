<template>
  <div class="font-abc">
    <div class="text-center text-2xl font-bold text-green-900 p-4 pb-4">
      จัดการบทความ
    </div>
    <div class="mb-4 p-2">
      <input
        v-model="searchQuery"
        placeholder="ค้นหา..."
        class="input input-bordered mb-4 w-full max-sm:w-52"
      />
    </div>

    <div class="overflow-x-auto">
      <div class="p-2 flex gap-2">
        <NuxtLink to="/Addcontent">
          <button
            class="bg-transparent hover:bg-green-500 text-green-700 font-medium hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            เพิ่มบทความใหม่
          </button>
        </NuxtLink>
        <button
          @click="toggleSelectAll"
          :class="[
            'bg-transparent font-medium py-2 px-4 border rounded',
            selectAll
              ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
              : 'hover:bg-green-500 text-green-700 border-green-500  hover:text-white hover:border-green-600',
          ]"
        >
          {{ selectAll ? "ล้างทั้งหมด" : "เลือกทั้งหมด" }}
        </button>
        <span class="p-2 mr-auto"
          >{{ selectedItems.length }} บทความที่เลือก</span
        >
      </div>
      <div class="overflow-x-auto max-sm:max-w-[170vh]">
        <table class="table">
          <thead class="textarea-md">
            <tr>
              <th></th>
              <th>ชื่อบทความ</th>
              <th>ประเภท</th>
              <th>วันที่</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody class="data-table">
            <tr v-for="(item, index) in filteredData" :key="index">
              <td>
                <input
                  type="checkbox"
                  :checked="isSelected(item.id)"
                  @change="toggleSelection(item.id)"
                />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.date }}</td>

              <td class="pr-2 flex flex-row gap-4">
                <NuxtLink
                  :to="`/content-detail/${item.id}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="link-with-icon"
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </NuxtLink>

                <button @click="deleteContent(item.id)">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ปุ่มลบบทความ -->

      <div class="p-2">
        <div>
          <button
            @click="deleteSelectedContents"
            class="bg-transparent hover:bg-red-500 text-red-700 font-medium hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            ลบบทความ
          </button>
        </div>
      </div>

      <!-- หน้าถัดไป -->
      <div class="flex flex-col items-center pt-16">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          แสดงข้อมูลบทความ
          <span class="font-semibold text-gray-900 dark:text-white">1</span> ถึง
          <span class="font-semibold text-gray-900 dark:text-white">50</span>

          รายการ
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <!-- ปุ่ม -->
          <button
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-800 rounded-s hover:bg-green-900 dark:bg-green-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white"
          >
            <svg
              class="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            ย้อนกลับ
          </button>
          <button
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-800 border-0 border-s border-gray-700 rounded-e hover:bg-green-900 dark:bg-green-800 dark:border-green-700 dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white"
          >
            ถัดไป
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Content } from "~/models/content.model";

const router = useRouter();

const data = ref<Content[]>([]);

onMounted(() => {
  const storedContents = localStorage.getItem("Contents");
  if (storedContents) {
    data.value = JSON.parse(storedContents);
  }
});

const searchQuery = ref("");
const selectedItems = ref<number[]>([]);
const selectAll = ref(false);

const filteredData = computed(() => {
  if (!data.value) return [];
  const query = searchQuery.value.toLowerCase();
  return data.value.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });
});

const deleteContent = (contentId: number) => {
  const storedContents = localStorage.getItem("Contents");
  if (storedContents) {
    let contents: Content[] = JSON.parse(storedContents);
    contents = contents.filter((p) => p.id !== contentId);
    localStorage.setItem("Contents", JSON.stringify(contents));
    data.value = contents;
  }
};

const deleteSelectedContents = () => {
  if (selectedItems.value.length === 0) {
    alert("กรุณาเลือกบทความที่ต้องการลบ");
    return;
  }

  const storedContents = localStorage.getItem("Contents");
  if (storedContents) {
    let contents: Content[] = JSON.parse(storedContents);
    contents = contents.filter((p) => !selectedItems.value.includes(p.id));
    localStorage.setItem("Contents", JSON.stringify(contents));
    data.value = contents;
    selectedItems.value = [];
    selectAll.value = false;
  }
};

const isSelected = (contentId: number) => {
  return selectedItems.value.includes(contentId);
};

const toggleSelection = (contentId: number) => {
  const index = selectedItems.value.indexOf(contentId);
  if (index === -1) {
    selectedItems.value.push(contentId);
  } else {
    selectedItems.value.splice(index, 1);
  }
  updateSelectAllStatus();
};

const toggleSelectAll = () => {
  selectAll.value = !selectAll.value;
  if (selectAll.value) {
    selectedItems.value = filteredData.value.map((item) => item.id);
  } else {
    selectedItems.value = [];
  }
};

const updateSelectAllStatus = () => {
  if (selectedItems.value.length === filteredData.value.length) {
    selectAll.value = true;
  } else {
    selectAll.value = false;
  }
};
</script>

<style scoped>
tr:hover {
  background-color: rgba(79, 70, 229, 0.1);
}
</style>
