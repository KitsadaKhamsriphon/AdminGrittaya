<template>
  <div class="font-abc p-10">
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h1 class="font-semibold text-gray-900 text-2xl text-center">
        ลงทะเบียนบทความใหม่
      </h1>
      <p class="mt-2 text-base text-gray-600 text-center">
        หน้าเพิ่มบทความข่าวสารใหม่สำหรับแอดมิน กฤตยธยา
      </p>

      <form @submit.prevent="registerContent" class="pt-10">
        <div class="flex flex-col items-center mb-6 space-y-4">
          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="Contentname"
            >
              ชื่อเรื่อง
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="Contentname"
              v-model="Content.name"
              type="text"
              placeholder="กรอกชื่อเรื่อง"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="description"
            >
              เนื้อหาบทความ
            </label>
            <textarea
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="description"
              v-model="Content.description"
              placeholder="เนื้อหาบทความ"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="category"
            >
              เลือกประเภทของบทความ
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                id="category"
                v-model="Content.category"
              >
                <option>ข่าว</option>
                <option>วันสำคัญ</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="datetine"
            >
              วันที่
            </label>
            <input
              class="appearance-none block w-[400px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="datetime"
              v-model="Content.date"
              type="datetime"
              placeholder="วันที่"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="image"
            >
              รูปภาพ
            </label>
            <input
              class="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="image"
              type="file"
              @change="onFileChange"
              required
            />
          </div>
          <button
            type="submit"
            class="max-w-xs focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Content {
  id: number;
  name: string;
  category: string;
  date: string;

  description?: string;
  imageUrl: string | null;
}

const Content = ref<Content>({
  id: Date.now(),
  name: "",
  category: "",
  date: "",
  description: "",
  imageUrl: null,
});

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      Content.value.imageUrl = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const registerContent = () => {
  const storedContents = localStorage.getItem("Contents");
  const Contents: Content[] = storedContents ? JSON.parse(storedContents) : [];
  Contents.push({ ...Content.value, id: Date.now() });
  localStorage.setItem("Contents", JSON.stringify(Contents));

  router.push("/ManageContent");
};
</script>

<style scoped></style>
