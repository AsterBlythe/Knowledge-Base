import fs from "fs";
import path from "path";

// 你的知识库根目录
const docsDir = path.join(__dirname, "..");

// 递归遍历目录，生成侧边栏数据
function getSidebar(dir, prefix = "") {
  let items = [];
  const files = fs.readdirSync(path.join(docsDir, dir));

  for (const file of files) {
    const filePath = path.join(docsDir, dir, file);
    const stat = fs.statSync(filePath);

    // 忽略 .vitepress、public 等非文档目录
    if (file === ".vitepress" || file === "public") {
      continue;
    }

    if (stat.isDirectory()) {
      // 如果是文件夹，递归生成子菜单
      items.push({
        text: file,
        collapsed: true, // 默认折叠
        items: getSidebar(path.join(dir, file), `${prefix}/${file}`),
      });
    } else if (file.endsWith(".md")) {
      // 如果是 Markdown 文件，添加链接
      const name = file.replace(/\.md$/, "");
      const link = `${prefix}/${name}`;

      if (name !== "index") {
        items.push({
          text: name,
          link: link.replace(/\/\//g, "/"), // 确保路径正确
        });
      }
    }
  }
  return items;
}

const sidebar = getSidebar("");
export default sidebar;
