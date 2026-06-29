# Jiju Revamp Positioning（参考文档）

> 用途：Jiju 从 pet-friendly directory 转向 context-based local discovery 的完整定位。
> 未来 agent 改 `/jiju-revamp` 页面（`JijuRevampFullPage`，App.tsx）或相关内容时，先读这份。
> 来源：Eden 在 2026-06-29 给出的详细 pivot 方向。

## 一句话定位

- 不是 pet-friendly app，而是 **A local discovery guide for places worth visiting**。
- 中文：**“本地人也会用的去处指南。”**
- 最终定位：**Jiju = Local places, filtered by real-life needs（用真实生活需求筛选地点）。**
- 品牌承诺：**Not just highly rated. Actually useful.**（不是看星级、不是看网红、不是看谁广告大。）

## 核心洞察：卖的是“场景”，不是“地点”

Google Map 是**地点数据库**；Jiju 要做的是**场景数据库**。

同一家 cafe，在 Google Map 上只有 name / address / rating / opening hour / reviews。
在 Jiju 里应该被拆成可回答的问题：

- 适合 laptop work 吗？有 power plug 吗？WiFi 稳吗？
- Parking 难吗？冷气够吗？吵不吵？可不可以坐久？
- 午餐便宜吗？有没有 lunch set？
- 适合宠物 / 一个人去 / date 吗？
- food 是真好吃还是只是环境美？local 会不会回访？

这就是从 niche directory 转成 **lifestyle utility**：where to go, based on mood, need, time, budget, and lifestyle。

## 用户脑内的真实问题（产品要直接命中）

今天 lunch 去哪 / 哪里有 lunch set promo / 哪里适合 laptop work / 哪家 cafe 有 plug / 哪里好 parking / 哪里适合约会 / 哪里适合带猫狗 / Michelin 推荐但 local 觉得怎样 / tourist hyped 但 local 觉得 overrated 吗 / 下雨天去哪 / 一个人去哪吃不尴尬 / 哪里可以坐久 / 哪里适合拍照 / 哪里适合周末半日游。

## 5 大主分类（含具体标签）

### 1. Eat（流量最大）
Lunch set、Local favorite、Michelin / Bib Gourmand、Cheap good food、Date night、Solo meal、Family dinner、Supper、Hidden gem、Tourist trap warning。

### 2. Work（Google Map 查不到，价值高）
Power plug、WiFi、Quiet、Can sit long、Good coffee、Big table、Parking easy、Aircon strong、Not too crowded、Laptop friendly、Meeting friendly。

### 3. Chill（适合内容化）
Afternoon cafe、Rainy day place、Chill with friend、First date、Healing place、Good view、Walkable area、Photo spot、Weekend half-day trip。

### 4. Pet（保留差异化，但只做“强 filter”，不做唯一主轴）
Pet allowed indoor、Pet allowed outdoor only、Cat friendly、Dog friendly、Water bowl provided、Pet menu、Nearby walking area、Spacious seating、Staff friendly to pets。

### 5. Promo（很实用的流量入口，每天有人搜）
Lunch set、Coffee promo、Student promo、Weekday deal、Happy hour、Buy 1 free 1、Set meal under RM20、New opening promo。

## Jiju Fit Score（差异化展示，不只显示 rating）

每个地点给自己的分数，例如：

- Food 8.5 / Comfort 7.8 / Parking 6.5 / Work-friendly 9.0 / Pet-friendly 7.0 / Value 8.2 / Local approval 8.8

再配一句话总结，例如：
> Best for weekday laptop work and affordable lunch set, but parking gets difficult after 12:30pm.

## Place Profile（资料要像数据库，比 Google Map 更有用）

```
Name: XXX Cafe
Area: Georgetown
Best for: Laptop work / brunch / quiet afternoon
Price: RM20–40
Parking: Medium difficulty
Power plug: Yes, limited
WiFi: Stable
Can sit long: Yes
Pet-friendly: Outdoor only
Lunch set: Weekday 12pm–3pm
Local verdict: Good place to work, food average but coffee reliable
Avoid: Weekend 2pm–5pm
Best time: Weekday morning
```

## 最大差异化：Local Context

Michelin / Google / Tripadvisor / 小红书的问题：太游客化、太网红化、太多假 review、没有场景标签、不知道 parking、不知道能不能坐久、不知道 local 是否真去、不知道 promo 是否还 active。
Jiju 占的位置就是补齐这些。

## Slogan 选项

- Jiju — Find places worth visiting.
- Jiju — Where should we go today?（直接命中脑内问题，最强）
- Jiju — Local spots, real context.
- Jiju：今天去哪里？

## 首页结构：场景入口，不是地图 / search bar

第一屏标题：**Where should we go today?**
Subtext：Find local places by real-life needs: lunch sets, laptop-friendly cafes, parking, promos, pet-friendly spots, and local-approved food.

场景按钮（比普通 search bar 更有感觉）：
I need lunch / I want to work at cafe / I’m bringing my pet / I need easy parking / Show me promos / Local favorites / Michelin & local picks。

下方 “Today’s useful picks”：
Best lunch set under RM20 / Cafes with plug & parking / Local-approved Michelin spots / Pet-friendly places this weekend / Quiet places to work today。

## MVP（不要太大）

- 先做一个城市甚至一个区域：Penang / KL / PJ / Georgetown / Mont Kiara / Bangsar。
- 先做 100 个地点，但每个地点资料要比 Google Map 更有用。
- 第一版只做 8 个 filters：
  1. Lunch set
  2. Work-friendly
  3. Power plug
  4. Easy parking
  5. Pet-friendly
  6. Local favorite
  7. Date-friendly
  8. Promo available

## 商业模式（比 pet directory 多很多，且日常高频）

Featured listing、Promo placement、Merchant subscription、Verified place badge、Campaign page、Lunch set promotion listing、Cafe work-friendly badge、Local guide sponsorship、Affiliate booking、Event listing、Pet-friendly premium badge、Data insights for merchants。
关键：用户可以每周用，而不是只有带宠物时才用。

## 分工（partner + Eden）

新方向更适合 partner 发挥（pet-only 发挥空间有限）：
去店里验证、拍短视频、跟商家谈 promo、拿 lunch set info、做 cafe work list、做本地人推荐、做 merchant onboarding、TikTok series、IG story poll、community submission、带人探店。
Eden 负责系统化：标签系统、搜索系统、推荐系统、地点 database、scoring、merchant dashboard、user submission、AI recommendation、SEO landing pages。

## Domain 策略

- 选 A：继续 `jiju.pet`，品牌解释变宽（“started with pet-friendly, now expanding…”）。缺点：新用户误会只跟宠物有关。
- 选 B：买新主域名（jiju.my / jiju.place / jiju.city / visitjiju.com / gojiju.com / jiju.guide），`jiju.pet` 变成其中一个频道。**最好。**
- 选 C：先用 `jiju.pet` 做 MVP，验证后再换域名。**最现实。**
- 当下结论：先不纠结 domain，先验证有没有人真的用“场景搜索”。

## 总判断

这是正确方向：从 niche directory → local discovery infrastructure。
Pet-friendly 是一个有记忆点的 filter，但真正的大市场是每天都有人问的“我现在要去哪里？”。
