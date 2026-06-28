# Jovan Yan Portfolio — Live Content & Experience Brief

> 状态：代码生成前的唯一内容与结构来源  
> 编辑方式：直接修改本文件；后续网页代码以这里的最新文字、顺序和状态为准。  
> 设计原则：严格沿用用户提供的 HTML 参考稿的排版与交互语言，替换为本文件中的最新内容，不在代码里另写一套文案。

## 0. 本轮已锁定

| 项目 | 决定 |
| --- | --- |
| 网站目的 | 面向 Product Marketing、Product Manager、GTM 机会 |
| 希望留下的印象 | 懂产品、会讲故事、知道如何用 AI 助力工作和生活 |
| 视觉参考 | 用户提供的 `pasted-text.txt` HTML 排版稿 |
| 保留重点 | 编辑式大标题、照片与文字错位构图、Instrument Serif 斜体强调、悬浮章节导航、Journey 翻书、深浅章节交替、横向案例折叠列表、超大结果数字、AI 产品嵌入区 |
| 动效重点 | 滚动渐入、Journey 翻页、案例折叠展开、图片 VIEW 状态、章节导航状态同步 |
| 内容来源优先级 | 本文件 > `deliverables/个人简历网站_网页内容精简版.md` > 其他旧工作簿 |
| 实现范围 | 单页响应式网站；核心按钮、翻页、抽屉和嵌入式产品可交互 |

## 1. 页面信息架构

```text
01 INTRO
↓
02 ABOUT ME / MY JOURNEY
↓
03 SELECTED CASES
↓
04 SELECTED IMPACT
↓
05 ME & AI
↓
06 CONTACT
```

### 阅读节奏

- Intro：10 秒内知道 Jovan 是谁。
- About × Journey：以照片为主讲职业路径，用少量文字总结形成的能力与工作方式。
- Cases：用三个案例证明判断、执行与结果。
- Impact：复用已确认数字，快速建立可信度。
- Me & AI：展示独立产品、真实 AI 工作流，以及喜欢并实际使用的 AI 工具与能力。
- Contact：简洁收束并提供明确联系入口。

## 2. 视觉与动效框架

### 必须匹配的排版语言

- 字体组合保持参考稿：
  - `DM Sans`：正文、导航与功能文字。
  - `Instrument Serif`：标题中的斜体词和情绪强调。
  - `DM Mono`：章节编号、状态、路径、标签与数据说明。
- 固定顶部 Header：左侧姓名，中间星形符号，右侧胶囊联系按钮。
- 左侧悬浮章节导航沿用 `CH. 01` + 展开的章节列表。
- Hero 沿用“左侧竖向照片 + 右侧超大标题 + 底部路线条”的不对称构图。
- Hero 的视觉中心改为 `Hi, I’m Jovan Yan.` 与人像；职业主张作为第二层大标题，不应比姓名更抢眼。
- 标题采用紧凑行高和大字号，关键单词使用 Instrument Serif italic。
- 页面以米白浅色章节和近黑深色章节交替，不新增渐变、玻璃卡片或高饱和大色块。
- 内容容器不做传统居中窄栏，保持参考稿接近满宽、带明显边界和章节编号的编辑式版面。
- Selected Cases 沿用参考稿的横向 `<details>` 折叠列表，不改成三列卡片或弹窗抽屉。
- Impact 使用独立的大数字网格；数据本身可根据最新内容删减，但版式保留。
- AI Builds 沿用“左侧产品说明 + 右侧实时 iframe”的双栏重点模块。
- Field Notes 若保留，沿用三列照片笔记；若内容未确认则整节隐藏，不用空卡占位。
- 桌面端优先还原参考稿的比例和留白；移动端按相同视觉层级顺序堆叠。

### 动效

| 场景 | 行为 | 强度 |
| --- | --- | --- |
| 首次进入章节 | 上移 18–28px + 淡入，元素错峰 80–100ms | 轻 |
| Journey | 点击、左右区域或滑动翻页 | 中 |
| 案例列表 | 点击整行展开详情，箭头或 Open/Close 文案同步 | 中 |
| Impact 数字 | hover 时仅改变底色、边线或文字颜色 | 轻 |
| 图片 hover | 保留 VIEW 跟随提示与轻微缩放 | 轻 |
| 章节导航 | 滚动时同步编号与 active 状态 | 轻 |
| 减少动态偏好 | 关闭非必要动画与平滑滚动 | 必须 |

原则：复用参考稿已有动效，不额外添加视差、粒子、3D 旋转或持续漂浮效果。

### 禁止偏离

- 不改成常见 SaaS 落地页。
- 不使用圆角卡片矩阵替代参考稿的平面编辑式分区。
- 不把案例详情改成全屏弹窗。
- 不引入新的主色；继续使用纸张色、近黑、灰阶与参考稿的单一强调色。
- 不使用 Emoji 替代图标或装饰。

## 3. 01 — Intro

### 首屏文案

**主视觉标题**

> Hi, I’m Jovan Yan.

**职业主张**

> I turn observations about people into products, stories, and experiences they want to join.

**Supporting line**

> I observe, research, build, and bring ideas to life.

**Keywords**

> Product Marketing · Consumer Insight · Product Building · GTM

**Status**

> Open to opportunities

**Buttons**

- Explore my work
- Let’s connect

**Location**

> Shanghai, China

**Asset**

- `assets/portfolio/jovan-yan-hero-portrait.jpeg`

### 版式映射

- 人像占据左侧竖向视觉区域。
- `Hi, I’m Jovan Yan.` 作为最大或最先被读到的文字。
- 职业主张紧随其后，可分成 3–4 行。
- Supporting line、关键词与状态使用较小字号。
- 底部保留路线条：`SHANGHAI >>> BEIJING >>> BOSTON >>> SHENZHEN`。

## 4. 02 — About Me × My Journey

### About Me heading

> I work where product thinking meets go-to-market.

### 章节定位

About Me 与 Journey 合并在同一章节容器中，但仍保留两个清晰部分：

- 上方是精简的 About Me 文字区域。
- 下方是原有的照片拼贴 Journey 翻页书。
- Journey 封面、照片排列、路线、翻页机关和照片点开后的内容全部保持不变。

### About Me copy

From the rigorous foundations of theory and research I developed at university, to the rapidly evolving world of a major internet technology company and the global supply chains of consumer goods, my journey has always been driven by the same curiosity:

> To understand what people truly need, and to build a broad, cross-disciplinary toolkit of methods and strategies that turns those needs into practical solutions with real value.

### About Me supporting strengths

1. **Observe human behavior**  
   Find the need, tension, or emotion beneath what people say.

2. **Translate insight into direction**  
   Turn fragmented signals into product choices, positioning, and stories people understand.

3. **Build through reality**  
   Move ideas through feasibility, design, collaboration, launch, and iteration.

### Journey book

**Route**

> Shanghai → Beijing → Boston → Shenzhen

| Page | Existing content | Change in this round |
| --- | --- | --- |
| 01 | Original photo-card collage, city route, and page-corner interaction | No change |
| 02 | East China Normal University / AIESEC photo and existing copy | No change |
| 03 | Kuaishou photo and existing copy | No change |
| 04 | PepsiCo / Quaker photo and existing copy | No change |
| 05 | Boston University photo and existing copy | No change |
| 06 | ZURU photo and existing copy | No change |

### Interaction

- 先显示新的 About Me 文字区域，随后直接连接原有 Journey 翻页书。
- Journey 默认封面仍是现有的照片卡片拼贴排列，不加入 About 文案或三项能力。
- 保留现有卡片边界、照片排列、城市路线、页角机关和翻书结构。
- 点击照片、地点、页角进入对应经历。
- 每张照片点开后的现有 Journey 页面文字、照片和内容保持不变。
- 桌面端支持点击左右区域翻页；移动端支持左右滑动。
- 始终显示页码与返回目录。

## 5. 03 — Selected Cases

### Heading

> Insight matters when it becomes something real.

首页使用三条横向折叠案例；点击整行展开详情。每个详情统一使用：

```text
Context → Challenge → Insight → Key decision → Execution → Impact → Reflection
```

### 卡片信息层级

每条 Case 的首屏阅读顺序必须是：

1. **Primary metric**：最大字号、最高对比度，视觉权重大于标题。
2. **Case title**：第二视觉层级，用于解释数字背后的项目。
3. **Company / role label**：小号 Mono 信息。
4. **Supporting metrics**：作为辅助证据，不与主数字竞争。
5. **Open / Close control**：最低视觉层级，但保持可识别。

桌面端主数字建议占案例行宽度的 22–28%，字号约为标题的 1.8–2.3 倍；移动端数字置于标题上方。

### Case 01 — ZURU × Walmart

**Title**

> ZURU × Walmart: From Insight to Global Scale

**Role**

> End-to-end Product Owner · Europe & North America

**Primary metric**

> 1.4M

**Metric label**

> First-order units

**Supporting metric**

> 3–5% cost reduction

**Summary**

I led a Walmart canned cat food line from research and positioning through innovation, development, sampling, production, and offline promotion.

**Impact**

- 1.4M first-order units confirmed in 2025 for Q1 2026 delivery
- 3–5% cost reduction
- End-to-end delivery across research, development, and production

**Reflection**

The product delivered strong value and quality, but its differentiation was not strong enough to sustain expected sales. Today, I would test multiple value propositions earlier and identify which affordable difference genuinely changes purchase intent before increasing development investment.

**Asset**

- `assets/portfolio/mr-purrs-product-stack.webp`

### Case 02 — PepsiCo / Quaker

**Title**

> PepsiCo / Quaker: High-Protein GTM Launch

**Role**

> Product Marketing · Urban women aged 20–35

**Primary metric**

> 45M+

**Metric label**

> Launch impressions

**Supporting metrics**

> 200K+ reservations · 24% high-performing content rate

**Summary**

For a new high-protein oat snack, I translated nutrition and ingredient benefits into relatable usage scenarios and built a multi-level creator matrix for awareness, trust, and conversion.

**Impact**

- 45M+ impressions
- 24% high-performing content rate
- 200K+ product reservations in two weeks
- 63 posts optimized; average performance uplift of 8.83%

**Reflection**

Today, I would connect online content with offline product experiences, validate consumer demand earlier in development, and expand the campaign beyond social seeding through livestreams, paid media, and more experimental short-form content.

**Assets**

- `assets/portfolio/jovan-yan-quaker-boston-diptych.png`
- `assets/portfolio/quaker-social-review/strategy-evolution.png`
- `assets/portfolio/quaker-social-review/content-optimization-results.png`

### Case 03 — Kuaishou

**Title**

> Kuaishou: Cultivating Culture Signals into Growth

**Role**

> PR & Communications Intern · Beijing, China

**Primary metric**

> 100M+

**Metric label**

> Weibo topic views

**Supporting metric**

> 107K followers gained in one day

**Summary**

At Kuaishou, I worked on trend research, story development, creator sourcing, content planning, and performance tracking across communication projects.

**Observation**

The strongest topics connected with an emotion or cultural conversation audiences already wanted to discuss, rather than beginning with a generic campaign message.

**My contribution**

- Developed content angles around emerging cultural signals
- Supported creator collaboration and livestream planning
- Screened and introduced more than 20 creators
- Tracked how stories and audience response moved across platforms

**Impact**

- 100M+ Weibo topic views for a women-focused communication project
- 107K followers gained in one day
- 20+ creators screened and introduced

**Reflection**

Today, I would define the audience tension and measurement framework earlier—not only tracking reach, but separating attention, resonance, follower quality, and longer-term brand value.

**Asset**

- `assets/portfolio/jovan-yan-kuaishou-internship-card.jpeg`

### Impact Snapshot

沿用参考稿的大数字网格，暂定展示：

| 数字 | 标签 | 对应内容 |
| --- | --- | --- |
| 100M+ | Weibo topic views | Kuaishou |
| 45M+ | Launch impressions | PepsiCo / Quaker |
| 1.4M | First-order units | ZURU × Walmart |
| 200K+ | Product reservations | PepsiCo / Quaker |
| 3–5% | Cost reduction | ZURU × Walmart |

## 6. 05 — Me & AI

### Heading

> AI shortens the distance between curiosity and creation.

### Opening position

I use AI as an operating layer for research, synthesis, prototyping, storytelling, and everyday learning. It helps me move faster from a messy question to something I can inspect, test, or use—but the priorities, trade-offs, and final judgment remain mine.

### Section A — Featured product: Time Anchor

**Title**

> A five-year diary for meeting your past self.

**Role**

> Independent Product Creator

**Summary**

After hearing why physical five-year diaries were difficult to maintain, I designed and built a digital alternative that balances the ritual of handwriting with the feedback and searchability of digital tools.

**Core product decisions**

- Five-year same-day timeline
- Visual annual memory map
- Keyword search across past entries
- Locked primary entries with reflective follow-up notes

**How AI supported the build**

- ChatGPT: clarified requirements, product logic, content structure, and interaction questions
- Gemini: supported visual exploration and early frontend implementation
- Codex: supported code iteration, debugging, content integration, and product QA
- My role: user observation, priorities, feature trade-offs, experience principles, visual direction, and final acceptance

**Status**

> Working local-first frontend prototype; external user testing has not started.

**Product**

- Live iframe: `apps/time-anchor/`
- Primary action: `Try the product`
- Secondary action: `See how I built it`

### Section B — How I work with AI

使用四个横向折叠工作流，重点展示真实输入、AI 的作用、我的判断和输出。

#### Workflow 01 — Research & signal collection

**Input**

Competitor specifications, industry information, user reviews, and fragmented market signals.

**AI contribution**

Codex helps collect and normalize source material; ChatGPT helps cluster repeated needs and differences.

**My judgment**

I verify sources, decide which signals matter, separate a repeated complaint from a meaningful opportunity, and connect findings to product constraints.

**Output**

Structured research reports, comparison tables, product questions, and decision material.

#### Workflow 02 — Synthesis & product direction

**Input**

Interview notes, comments, research findings, product requirements, and competing priorities.

**AI contribution**

AI helps organize ambiguity, surface patterns, compare possible framings, and expose gaps in the brief.

**My judgment**

I choose the target user, define the real problem, set priorities, and decide what not to build.

**Output**

Sharper positioning, product principles, feature priorities, and an actionable brief.

#### Workflow 03 — Storytelling & content intelligence

**Input**

Audience questions, comments, product benefits, campaign results, and draft content.

**AI contribution**

AI groups recurring questions, explores story angles, adapts information for different audiences, and helps review performance patterns.

**My judgment**

I decide which tension is human and specific enough to lead with, what evidence is credible, and how the story should sound.

**Output**

Content themes, creator briefs, scripts, messaging systems, and iteration ideas.

#### Workflow 04 — Prototyping, testing & iteration

**Input**

A product idea, interaction question, rough visual direction, and user feedback.

**AI contribution**

AI helps turn ideas into testable interfaces, identify implementation issues, and accelerate revisions.

**My judgment**

I own the experience principle, interaction trade-offs, visual hierarchy, acceptance criteria, and next-step priority.

**Output**

Working prototypes, QA findings, and a clearer iteration roadmap.

### Section C — The AI I like and use

不做 Logo 墙，而做三张带个人观点的工具卡：

| Tool | I use it for | Why it stays in my workflow |
| --- | --- | --- |
| ChatGPT | Thinking partner, synthesis, requirement clarification, writing, and learning | It is most useful when the problem is still ambiguous and I need to sharpen the question before producing the answer. |
| Codex | Building, debugging, browser-assisted research, document and spreadsheet work, and repeatable workflows | It helps me carry work across research, files, prototypes, and implementation instead of stopping at conversation. |
| Gemini | Visual exploration, alternative directions, and rapid frontend experimentation | I use it when seeing a possible form is more useful than discussing one abstractly. |

### Section D — Skills & apps in my AI toolkit

以能力标签或小型索引呈现，不暗示每项都由 AI 自动完成：

- Browser research & source checking
- Market and competitor synthesis
- Documents and presentation structuring
- Spreadsheet analysis
- Prompt and reusable workflow design
- Visual exploration and image generation
- Frontend prototyping
- Product and design QA
- Personal learning, planning, and reflection

**Closing line**

> The tool can accelerate the path. I am still responsible for choosing the destination.

### Layout and interaction

- Time Anchor 继续使用参考稿的左侧说明 + 右侧实时 iframe，并成为本章最大视觉模块。
- 四个 AI 工作流使用 `<details>` 横向折叠列表，避免一次展示过多文字。
- 三张工具卡使用相同高度，但不使用品牌 Logo 墙。
- Skills & apps 使用紧凑标签矩阵或滚动索引。
- 移动端顺序：Time Anchor → Workflows → Tools → Skills & apps。

## 7. 06 — Contact

### Heading

> Let’s build something people want to join.

### Copy

> Have an idea, question, or interesting problem? Let’s connect.

### Contact

- Email: `yanzhuofan333@163.com`
- Phone / WeChat: `13903992996`
- QR: `assets/portfolio/jovan-yan-wechat-qr.jpg`

## 8. 内容与隐私规则

- 不公开内部预算、达人报价、达人名单、个人账号评论页或未脱敏内部材料。
- 团队结果旁必须说明个人角色，避免把团队成果写成个人独立成果。
- 首页文字保持短；具体方法与反思放入折叠详情。
- 所有数字保留口径、时间和市场范围。
- 暂不提供的信息不使用占位假数据。

## 9. 生成代码前只需确认的项目

请直接在下面修改：

```text
[已确认] 页面顺序：
INTRO → ABOUT × JOURNEY → SELECTED CASES → SELECTED IMPACT → ME & AI → CONTACT

[已确认] Hero 主标题：
Hi, I’m Jovan Yan.

[已确认] Selected Cases 第三个案例：
Kuaishou

[已确认] Time Anchor 展示位置：
Me & AI 的主视觉产品

[待确认] 是否提供英文简历下载：
是 / 否

[待确认] Journey 封面更偏向：
职业总结 / 个人故事 / 两者平衡

[待确认] “The AI I like and use” 是否保留以下三个工具：
ChatGPT / Codex / Gemini

[待确认] 是否有其他真实使用的 AI app 需要加入：

[待确认] 当前联系方式是否继续公开：
Email：是 / 否
Phone：是 / 否
WeChat QR：是 / 否

[自由修改]

```

## 10. 后续代码映射

| 文档章节 | 代码目标 |
| --- | --- |
| Intro | `#intro` |
| About Me × My Journey | `#journey` |
| Selected Cases | `#work` |
| Impact Snapshot | `#impact` |
| Me & AI | `#ai-builds` |
| Contact | `#contact` |

代码生成时不改变本文件的章节顺序与核心文案；如出现冲突，先更新本文件，再同步实现。
