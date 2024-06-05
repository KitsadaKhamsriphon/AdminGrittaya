<template>
  <div v-if="content">
    <!-- <Sidebar /> -->

    <div
      class="flex flex-col justify-center items-center p-10 font-abc w-fullfont-abc"
    >
      <h1 class="p-4 pb-10 text-4xl font-semibold text-green-900">
        แก้ไขข้อมูลบทความ
      </h1>

      <!-- การ์ดรูป -->
      <div class="flex flex-col lg:flex-row lg:items-center gap-10">
        <!-- รูป -->
        <div>
          <label class="label pb-2">รูปภาพบทความ</label>
          <img
            :src="content.imageUrl ?? ''"
            alt="content Image"
            class="w-full h-[320px] rounded-lg shadow-2xl"
          />
          <input type="file" @change="onFileChange" class="pt-8" />
        </div>

        <!-- ส่วนการ์ด -->
        <div
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          <form class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">ชื่อเรื่อง</span>
              </label>
              <input
                v-model="content.name"
                type="text"
                placeholder="แก้ไขชื่อบทความ"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">แก้ไขเนื้อหา</span>
              </label>
              <textarea
                v-model="content.description"
                type="text"
                placeholder="แก้ไขเนื้อหา"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              ></textarea>
            </div>

            <!-- ปุ่ม -->
            <div class="flex-row justify-center gap-2 form-control mt-6">
              <button @click="savecontent" class="btn btn-success">
                บันทึก
              </button>

              <!-- <button @click="deletecontent" class="btn btn-error">
                  ลบสินค้า
                </button> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else>
      <p>ไม่พบสินค้า</p>
    </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Content } from "~/models/content.model";

const route = useRoute();
const router = useRouter();
const content = ref<Content | null>(null);

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (content.value) {
        content.value.imageUrl = event.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

const savecontent = () => {
  const storedContents = localStorage.getItem("content");
  if (storedContents) {
    const Contents: Content[] = JSON.parse(storedContents);
    const index = Contents.findIndex((p) => p.id === content.value?.id);
    if (index !== -1 && content.value) {
      Contents[index] = content.value;
      localStorage.setItem("content", JSON.stringify(Contents));
      router.push("/ManageContent");
    }
  }
};

// const deletecontent = () => {
//   const storedContents = localStorage.getItem("Contents");
//   if (storedContents) {
//     let Contents: content[] = JSON.parse(storedContents);
//     Contents = Contents.filter((p) => p.id !== content.value?.id);
//     localStorage.setItem("Contents", JSON.stringify(Contents));
//     router.push("/ManageContents");
//   }
// };

onMounted(() => {
  const storedContents = localStorage.getItem("Contents");
  console.log(storedContents);

  if (storedContents) {
    const Contents: Content[] = JSON.parse(storedContents);
    content.value =
      Contents.find((p) => p.id === Number(route.params.id)) || null;
  }
});
</script>

<style scoped></style>
