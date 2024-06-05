// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["./assets/style.css"],
  pages: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: "Admin",
      script: [
        {
          src: "https://kit.fontawesome.com/a7acbccf84.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
