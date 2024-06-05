<template>
  <div class="font-abc p-10">
    <div class="w-full bg-white p-8 rounded-lg shadow-md flex-col items-center">
      <h1 class="font-semibold text-gray-900 text-2xl text-center">
        ลงทะเบียนสินค้าใหม่
      </h1>
      <p class="mt-2 text-base text-gray-600 text-center">
        หน้าเพิ่มสินค้าใหม่สำหรับแอดมิน กฤตยธยา
      </p>

      <form @submit.prevent="registerProduct" class="pt-10">
        <div class="flex flex-col items-center mb-6 space-y-4">
          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="productname"
            >
              ชื่อสินค้า
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="productname"
              v-model="product.name"
              type="text"
              placeholder="กรอกชื่อสินค้า"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="description"
            >
              คําอธิบายสินค้า
            </label>
            <textarea
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="description"
              v-model="product.description"
              placeholder="คําอธิบายสินค้า"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="warning"
            >
              คำเตือน/วิธีใช้
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="warning"
              v-model="product.warning"
              type="text"
              placeholder="กรอกคำเตือน/วิธีใช้"
            />
          </div>

          <div class="w-[400px]">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="category"
            >
              เลือกประเภทของสินค้า
            </label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                id="category"
                v-model="product.category"
              >
                <option>สังฆทาน</option>
                <option>พวงมาลัย</option>
                <option>น้ำอบ</option>
                <option>พานบายศรี</option>
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
              for="price"
            >
              ราคา
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="price"
              v-model="product.price"
              type="number"
              placeholder="กรอก ราคา"
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
              class="block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="image"
              type="file"
              @change="onFileChange"
              required
            />
          </div>

          <div class="w-[400px] flex justify-center">
            <button
              type="submit"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              บันทึก
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  warning?: string;
  imageUrl: string | null;
}

const product = ref<Product>({
  id: Date.now(),
  name: "",
  category: "",
  price: 0,
  description: "",
  warning: "",
  imageUrl: null,
});

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      product.value.imageUrl = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const registerProduct = () => {
  const storedProducts = localStorage.getItem("products");
  const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
  products.push({ ...product.value, id: Date.now() });
  const test = localStorage.setItem("products", JSON.stringify(products));
  router.push("/");
};
</script>

<style scoped></style>
