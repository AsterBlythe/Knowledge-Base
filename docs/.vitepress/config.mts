import { defineConfig } from "vitepress";
// 1.导入创建的自动生成侧边栏脚本
import sidebar from "./sidebar.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Knowledge-Base/",
  // title: "测试知识库",
  description: "A.B.的知识库",

  markdown: {
    math: true,
  },

  themeConfig: {
    siteTitle: "A.B.的知识库",
    logo: "/logo.jpg",
    // siteTitle: false, //隐藏siteTitle
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    // 2. 用导入的 sidebar 脚本来替换原先的静态配置
    sidebar: sidebar,

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    outline: {
      level: "deep",
      label: "本页目录",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/AsterBlythe/Knowledge-Base" },
    ],
  },
});
