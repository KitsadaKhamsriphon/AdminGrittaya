<template>
  <div class="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
    <div class="w-full max-w-md">
      <img class="mx-auto h-40 w-auto" src="/images/logogit.jpg" alt="LOGO" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900"
      >
        เข้าสู่ระบบแอดมิน
      </h2>
      <div class="mt-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >รหัสผู้ใช้งาน</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >รหัสผ่าน</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <NuxtLink to="/ManageContent">
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                เข้าสู่ระบบ
              </button>
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
