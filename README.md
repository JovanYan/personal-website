# 阎卓凡个人作品集

面向 Product Marketing、Product Manager 与 GTM 岗位的轻量单页个人作品集。

包含独立产品作品：

- `apps/time-anchor/`：可安装的 PWA 五年日记应用，数据保存在用户本地。

## 本地预览

```bash
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 最常用的修改入口

- `index.html`：所有网页文案、图片路径和联系方式。文件内按 `EDIT 01` 到 `EDIT 06` 分区。
- `styles.css`：颜色、字号、间距与响应式布局。全局颜色在文件顶部 `:root`。
- `script.js`：Journey 翻页、三个 Case 抽屉和微信二维码弹窗。Case 详情集中在 `caseContent`。
- `assets/portfolio/`：个人照片、项目图片与微信二维码。
- `apps/time-anchor/`：Time Anchor 可交互子页面。

替换图片时，保留原文件名即可无需修改代码；使用新文件名时，同步修改 `index.html` 或 `script.js` 中对应路径。

## GitHub Pages 发布

1. 新建 GitHub 仓库（例如 `yanzhuofan-portfolio`）
2. 上传本目录所有文件
3. 在仓库 Settings → Pages 中选择 `Deploy from a branch`
4. Branch 选择 `main` 和 `/ (root)`

网站会发布在 `https://你的用户名.github.io/yanzhuofan-portfolio/`
