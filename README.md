# 部署到阿里云服务器

本项目已配置好自动化部署脚本，可以快速部署到阿里云服务器。

## 快速开始

### 1. 上传项目
```bash
scp -r /path/to/dabo_personal user@47.110.87.81:/var/www/
```

### 2. 执行部署
```bash
ssh user@47.110.87.81
cd /var/www/dabo_personal
chmod +x deploy.sh
./deploy.sh --setup
```

### 3. 访问网站
- Next.js: `http://47.110.87.81:3000`
- Nginx: `http://47.110.87.81`

## 文档

- 📖 [快速部署指南](QUICK_START.md) - 最简洁的部署步骤
- 📚 [完整部署文档](DEPLOYMENT.md) - 详细的部署说明和故障排查

## 部署文件

- `deploy.sh` - 自动化部署脚本
- `ecosystem.config.js` - PM2 进程管理配置
- `nginx.conf` - Nginx 反向代理配置（可选）
- `.env.production` - 生产环境变量模板

## 维护命令

```bash
pm2 status              # 查看状态
pm2 logs dabo-personal  # 查看日志
pm2 restart dabo-personal  # 重启应用
./deploy.sh --update    # 更新部署
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
