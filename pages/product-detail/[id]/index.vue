<template>
  <div v-if="product">
    <!-- <Sidebar /> -->

    <div
      class="flex flex-col justify-center items-center p-10 font-abc w-fullfont-abc"
    >
      <h1 class="p-4 pb-10 text-4xl font-semibold text-green-900">
        แก้ไขข้อมูลสินค้า
      </h1>

      <!-- การ์ดรูป -->
      <div class="flex flex-col lg:flex-row lg:items-center gap-10">
        <!-- รูป -->
        <div>
          <label class="label pb-2">รูปภาพสินค้า</label>
          <img
            :src="product.imageUrl ?? ''"
            alt="Product Image"
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
                <span class="label-text">ชื่อสินค้า</span>
              </label>
              <input
                v-model="product.name"
                type="text"
                placeholder="แก้ไขชื่อสินค้า"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">คำอธิบาย</span>
              </label>
              <textarea
                v-model="product.description"
                type="text"
                placeholder="แก้ไขคำอธิบาย"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              ></textarea>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">คำเตือน/วิธีใช้</span>
              </label>
              <input
                v-model="product.warning"
                type="text"
                placeholder="แก้ไขคำเตือน/วิธีใช้"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>

            <!-- ปุ่ม -->
            <div class="flex-row justify-center gap-2 form-control mt-6">
              <button @click="saveProduct" class="btn btn-success">
                บันทึก
              </button>

              <!-- <button @click="deleteProduct" class="btn btn-error">
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
import type { Product } from "~/models/product.model";

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (product.value) {
        product.value.imageUrl = event.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

const saveProduct = () => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    const products: Product[] = JSON.parse(storedProducts);
    const index = products.findIndex((p) => p.id === product.value?.id);
    if (index !== -1 && product.value) {
      products[index] = product.value;
      localStorage.setItem("products", JSON.stringify(products));
      router.push("/ManageProducts");
    }
  }
};

// const deleteProduct = () => {
//   const storedProducts = localStorage.getItem("products");
//   if (storedProducts) {
//     let products: Product[] = JSON.parse(storedProducts);
//     products = products.filter((p) => p.id !== product.value?.id);
//     localStorage.setItem("products", JSON.stringify(products));
//     router.push("/ManageProducts");
//   }
// };

onMounted(() => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    const products: Product[] = JSON.parse(storedProducts);
    product.value =
      products.find((p) => p.id === Number(route.params.id)) || null;
  }
});
</script>

<style scoped></style>
