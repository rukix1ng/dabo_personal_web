# SEO 优化文档

本文档详细说明了网站各页面的 SEO 优化配置，包括 meta 标签、结构化数据和多语言支持。

---

## 目录

1. [首页 (Homepage)](#1-首页-homepage)
2. [NIMS邀请报告 (Forum)](#2-nims邀请报告-forum)
3. [新闻专栏 (Achievements)](#3-新闻专栏-achievements)
4. [合作论文 (Papers)](#4-合作论文-papers)
5. [技术特性](#5-技术特性)

---

## 1. 首页 (Homepage)

### URL 结构
- 英文: `http://47.110.87.81/en`
- 中文: `http://47.110.87.81/zh`
- 日文: `http://47.110.87.81/ja`

### Meta 标签

#### 英文版 (en)
```html
<title>Industry-Academia Exchange Platform for Semiconductor Equipment Materials | A Collaborative Project of NIMS and Lam Research</title>
<meta name="description" content="Industry-academia exchange platform for semiconductor equipment materials, developed under a collaborative project between Lam Research and NIMS. Focused on joint research, invited talks, and research outcomes for next-generation semiconductor equipment materials.">
<meta name="keywords" content="semiconductor equipment, semiconductor materials, Lam Research, NIMS, electron beam materials, etching equipment, materials research, industry-academia collaboration">
<link rel="canonical" href="http://47.110.87.81/en">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja">
```

#### 中文版 (zh)
```html
<title>半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="半导体装备材料产学交流平台，基于 NIMS 与泛林集团合作项目建设，聚焦联合研究、邀请报告与研究成果交流，服务新一代半导体装备关键材料发展。">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作">
<link rel="canonical" href="http://47.110.87.81/zh">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja">
```

#### 日文版 (ja)
```html
<title>半導体装置材料産学交流プラットフォーム | NIMS・ラムリサーチ共同プロジェクト</title>
<meta name="description" content="NIMS とラムリサーチの共同プロジェクトに基づく半導体装置材料の産学交流プラットフォーム。共同研究、招待講演、研究成果の発信を通じて、次世代半導体装置材料の発展を支えます。">
<meta name="keywords" content="半導体装置, 半導体材料, ラムリサーチ, NIMS, 電子ビーム材料, エッチング装置, 材料研究, 産学連携">
<link rel="canonical" href="http://47.110.87.81/ja">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja">
```

### 结构化数据 (JSON-LD)

#### Project Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Project",
  "name": "Industry-Academia Exchange Platform for Semiconductor Equipment Materials",
  "alternateName": "A Collaborative Project of NIMS and Lam Research",
  "description": "This project is based on a strategic donation and collaboration from Lam Research Corporation (Fremont, U.S.A.) to the National Institute for Materials Science (NIMS, Tsukuba, Japan). NIMS Principal Researcher Dr. Da Bo serves as the project leader and donation recipient.",
  "keywords": "semiconductor equipment, semiconductor materials, Lam Research, NIMS, electron beam materials, etching equipment, materials research, industry-academia collaboration",
  "areaServed": "Japan",
  "knowsAbout": [
    "Semiconductor Equipment",
    "Semiconductor Equipment Materials",
    "Etching Equipment Materials",
    "Electron Beam Equipment Materials",
    "Electron Beam Metrology Algorithms",
    "Electron Beam-Material Interaction"
  ]
}
```

---

## 2. NIMS邀请报告 (Forum)

### 2.1 论坛列表页

#### URL 结构
- 英文: `http://47.110.87.81/en/forum`
- 中文: `http://47.110.87.81/zh/forum`
- 日文: `http://47.110.87.81/ja/forum`

#### Meta 标签 (中文示例)
```html
<title>NIMS邀请报告 | 半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="NIMS邀请报告 - 半导体装备材料产学交流平台的重要组成部分，基于 NIMS 与泛林集团合作项目建设。">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作, forum, academic forum, research forum, NIMS, LAM">
<link rel="canonical" href="http://47.110.87.81/zh/forum">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en/forum">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh/forum">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja/forum">
```

#### 结构化数据 (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "NIMS邀请报告",
  "description": "NIMS邀请报告 - 半导体制造装备高性能材料研究项目...",
  "url": "http://47.110.87.81/zh/forum",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 5,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Event",
          "name": "讲座标题",
          "description": "讲座摘要",
          "startDate": "2026-03-15T14:00:00",
          "performer": {
            "@type": "Person",
            "name": "主讲人姓名"
          },
          "url": "http://47.110.87.81/zh/forum/1"
        }
      }
    ]
  }
}
```

### 2.2 论坛详情页

#### URL 结构
- 英文: `http://47.110.87.81/en/forum/{id}`
- 中文: `http://47.110.87.81/zh/forum/{id}`
- 日文: `http://47.110.87.81/ja/forum/{id}`

#### Meta 标签 (动态生成)
```html
<title>{讲座标题} | NIMS邀请报告 | 半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="{讲座摘要}">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作, academic lecture, seminar, research talk, {主讲人姓名}, {主讲人单位}">
<meta name="author" content="{主讲人姓名}">
<link rel="canonical" href="http://47.110.87.81/zh/forum/{id}">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en/forum/{id}">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh/forum/{id}">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja/forum/{id}">
```

#### 结构化数据 (JSON-LD)

**BreadcrumbList Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "http://47.110.87.81/zh"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "NIMS邀请报告",
      "item": "http://47.110.87.81/zh/forum"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{讲座标题}",
      "item": "http://47.110.87.81/zh/forum/{id}"
    }
  ]
}
```

**Event Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "{讲座标题}",
  "description": "{讲座摘要}",
  "startDate": "{举办时间}",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "http://47.110.87.81/zh/forum/{id}"
  },
  "image": ["{讲座图片}"],
  "performer": {
    "@type": "Person",
    "name": "{主讲人姓名}",
    "affiliation": {
      "@type": "Organization",
      "name": "{主讲人单位}",
      "url": "{单位链接}"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "半导体装备材料产学交流平台 | NIMS-泛林集团合作项目",
    "url": "http://47.110.87.81"
  }
}
```

---

## 3. 新闻专栏 (Achievements)

### 3.1 新闻列表页

#### URL 结构
- 英文: `http://47.110.87.81/en/achievements`
- 中文: `http://47.110.87.81/zh/achievements`
- 日文: `http://47.110.87.81/ja/achievements`

#### Meta 标签 (中文示例)
```html
<title>新闻专栏 | 半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="新闻专栏 - 半导体装备材料产学交流平台的资讯栏目，基于 NIMS 与泛林集团合作项目建设。">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作, news, media coverage, research news">
<link rel="canonical" href="http://47.110.87.81/zh/achievements">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en/achievements">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh/achievements">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja/achievements">
```

### 3.2 新闻详情页

#### URL 结构
- 英文: `http://47.110.87.81/en/achievements/{id}`
- 中文: `http://47.110.87.81/zh/achievements/{id}`
- 日文: `http://47.110.87.81/ja/achievements/{id}`

#### Meta 标签 (动态生成)
```html
<title>{新闻标题} | 新闻专栏 | 半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="{新闻内容前160个字符}">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作, news, media coverage, research news, {期刊名称}">
<meta name="author" content="{期刊名称}">
<link rel="canonical" href="http://47.110.87.81/zh/achievements/{id}">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en/achievements/{id}">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh/achievements/{id}">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja/achievements/{id}">
```

#### 结构化数据 (JSON-LD)

**BreadcrumbList Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "http://47.110.87.81/zh"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "新闻专栏",
      "item": "http://47.110.87.81/zh/achievements"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{新闻标题}",
      "item": "http://47.110.87.81/zh/achievements/{id}"
    }
  ]
}
```

**NewsArticle Schema**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "{新闻标题}",
  "description": "{新闻内容前200个字符}",
  "image": ["{新闻图片}"],
  "datePublished": "{发布日期}",
  "author": {
    "@type": "Organization",
    "name": "{期刊名称}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "半导体装备材料产学交流平台 | NIMS-泛林集团合作项目",
    "logo": {
      "@type": "ImageObject",
      "url": "http://47.110.87.81/icon.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "http://47.110.87.81/zh/achievements/{id}"
  }
}
```

---

## 4. 合作论文 (Papers)

### URL 结构
- 英文: `http://47.110.87.81/en/papers`
- 中文: `http://47.110.87.81/zh/papers`
- 日文: `http://47.110.87.81/ja/papers`

### Meta 标签 (中文示例)
```html
<title>合作论文 | 半导体装备材料产学交流平台 | NIMS-泛林集团合作项目</title>
<meta name="description" content="已发表的研究论文和出版物的完整列表。">
<meta name="keywords" content="半导体装备, 半导体材料, 泛林集团, NIMS, 电子束材料, 刻蚀装备, 材料研究, 产学合作, research papers, publications, academic publications">
<link rel="canonical" href="http://47.110.87.81/zh/papers">
<link rel="alternate" hreflang="en" href="http://47.110.87.81/en/papers">
<link rel="alternate" hreflang="zh" href="http://47.110.87.81/zh/papers">
<link rel="alternate" hreflang="ja" href="http://47.110.87.81/ja/papers">
```

### 结构化数据 (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "合作论文",
  "description": "已发表的研究论文和出版物的完整列表。",
  "url": "http://47.110.87.81/zh/papers",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 10,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "ScholarlyArticle",
          "name": "{论文标题}",
          "author": "{作者列表}",
          "publisher": "{期刊名称}",
          "url": "{论文链接}"
        }
      }
    ]
  }
}
```

**说明：** 论文页面没有详情页，点击论文会直接跳转到外部链接（期刊网站、DOI 等）。

---

## 5. 技术特性

### 5.1 多语言支持
- ✅ 支持英文 (en)、中文 (zh)、日文 (ja) 三种语言
- ✅ 每个页面都有 `hreflang` 标签，告诉搜索引擎不同语言版本的 URL
- ✅ 使用 `canonical` 标签避免重复内容问题

### 5.2 动态内容
- ✅ 论坛详情页、新闻详情页的 meta 信息从数据库动态生成
- ✅ 关键词包含动态内容（主讲人、期刊名称等）
- ✅ 描述自动截取合适长度（160-200字符）

### 5.3 结构化数据
- ✅ 首页：Person Schema（个人信息）
- ✅ 论坛列表：CollectionPage + ItemList Schema
- ✅ 论坛详情：Event + BreadcrumbList Schema
- ✅ 新闻详情：NewsArticle + BreadcrumbList Schema
- ✅ 论文列表：CollectionPage + ItemList Schema

### 5.4 缓存策略
- ✅ 使用 ISR (Incremental Static Regeneration)
- ✅ 详情页：5分钟缓存 (`revalidate = 300`)
- ✅ Sitemap：24小时缓存 (`revalidate = 86400`)

### 5.5 社交媒体优化
- ✅ Next.js 自动从 `title` 和 `description` 生成 OpenGraph 和 Twitter 标签
- ✅ 支持社交媒体分享时的预览展示

### 5.6 搜索引擎优化
- ✅ Robots.txt 配置正确
- ✅ Sitemap.xml 包含所有33个 URL
- ✅ 所有页面都有唯一的 title 和 description
- ✅ 关键词针对性强，包含行业术语和合作方名称

---

## 6. SEO 检查清单

### ✅ 已完成
- [x] 所有页面都有唯一的 title 标签
- [x] 所有页面都有 description 标签
- [x] 所有页面都有 keywords 标签
- [x] 所有页面都有 canonical 标签
- [x] 所有页面都有 hreflang 标签（多语言支持）
- [x] 动态页面的 meta 信息从数据库生成
- [x] 结构化数据（JSON-LD）配置完整
- [x] Sitemap.xml 生成并提交到 Google Search Console
- [x] Robots.txt 配置正确
- [x] 图片都有 alt 属性
- [x] 响应式设计（移动端友好）
- [x] 页面加载速度优化（ISR 缓存）

### 📊 SEO 指标
- **总页面数：** 33+ 页面（包括动态生成的详情页）
- **支持语言：** 3 种（英文、中文、日文）
- **结构化数据类型：** 6 种（Person, Event, NewsArticle, BreadcrumbList, CollectionPage, ItemList）
- **缓存策略：** ISR（5分钟/24小时）
- **更新频率：** 实时（数据库更新后5分钟内生效）

---

## 7. 联系方式

如有任何 SEO 相关问题或需要调整，请联系：
- 邮箱：DA.Bo@nims.go.jp
- 网站：http://47.110.87.81

---

**文档版本：** 1.0
**最后更新：** 2026-03-06
**生成工具：** Claude Code
