/**
 * MiYa (iOS) privacy policy + support page copy, shared by the React page
 * (`components/MiyaPrivacyPage.tsx`) and the prerendered static body
 * (`seo-static-content.ts`). Keep the two languages in step: this text is the
 * policy App Store Review reads at https://eden-tan.com/project/miya/.
 *
 * Inline markup: `**bold**` and `` `code` ``. Nothing else is interpreted.
 */

export type MiyaLocalized = { en: string; zh: string };

export type MiyaBlock =
  | { kind: 'p'; text: MiyaLocalized }
  | { kind: 'h3'; text: MiyaLocalized }
  | { kind: 'ul'; items: MiyaLocalized[] }
  | { kind: 'table'; head: [MiyaLocalized, MiyaLocalized]; rows: Array<[MiyaLocalized, MiyaLocalized]> };

export type MiyaSection = { id: string; title: MiyaLocalized; blocks: MiyaBlock[] };

const L = (en: string, zh: string): MiyaLocalized => ({ en, zh });

export const MIYA_SUPPORT_EMAIL = 'd.tytern@gmail.com';

export const MIYA_PRIVACY = {
  title: L('MiYa Privacy Policy', 'MiYa 隐私政策'),
  kicker: L('MiYa for iOS · Privacy & Support', 'MiYa iOS 版 · 隐私与支持'),
  standfirst: L(
    'MiYa takes the health data your Apple Watch and iPhone have already recorded and turns it into a report you can browse, entirely on your own device.',
    '「MiYa」把你的 Apple Watch 和 iPhone 已经记录下来的健康数据，在你自己的设备上整理成一份可以翻看的报告。',
  ),
  meta: [
    { label: L('Effective', '生效日期'), value: L('September 5, 2026', '2026 年 9 月 5 日') },
    { label: L('Applies to', '适用于'), value: L('MiYa for iOS 1.0', 'MiYa iOS 版 1.0') },
  ],
  supportCta: L('Need help? Email support', '需要帮助？发邮件给我们'),
  claim: L(
    'This app collects no data, because it has no way to send data anywhere. It doesn\'t connect to the internet, has no servers and no accounts, and contains no third-party analytics or advertising components.',
    '这个 App 不收集任何数据，因为它根本没有能力把数据送出去——它不联网，没有服务器，没有账号系统，也没有任何第三方分析或广告组件。',
  ),
  claimFine: L(
    'Your health data is read from the Health app, all calculations happen on this device, and the results are written to a database file on this device. No step of the process leaves your phone.',
    '你的健康数据从「健康」App 读出来，在这台设备上完成全部计算，结果写进这台设备上的一个数据库文件。整个过程没有一步会离开这部手机。',
  ),
  flowTitle: L('Where your data goes', '数据流向'),
  flow: [
    { label: L('Health app', '「健康」App'), note: L('Data already recorded on your device', '你已经记录在本机的数据'), stop: false },
    { label: L('On-device processing', '本机计算'), note: L('Summaries, scores, charts', '汇总、评分、生成图表'), stop: false },
    { label: L('On-device database', '本机数据库'), note: L('Stored only on this device', '只存在这台设备上'), stop: false },
    { label: L('Server / cloud', '服务器 / 云端'), note: L('This step doesn\'t exist', '不存在这一步'), stop: true },
  ],
  flowCaption: L(
    'Where your data goes. The last box is empty, and most of this policy explains why.',
    '数据流向。最右边那一格是空的，这份政策余下的部分基本都在解释这一点。',
  ),
  sections: [
    {
      id: 'collect',
      title: L('What information we collect', '我们收集哪些信息'),
      blocks: [
        { kind: 'p', text: L(
          '**None.** Under Apple\'s definition of “collect” (data leaving the user\'s device in any form), this app collects nothing.',
          '**不收集任何信息。**按照 Apple 对「收集」的定义——数据以任何形式离开用户设备——这个 App 的收集范围是零。',
        ) },
        { kind: 'p', text: L(
          'The developer cannot see, obtain, or infer anything about you: not who you are, whether you installed the app, how often you open it, or what your health data looks like. No line of code in the app makes a network request.',
          '具体来说，开发者无法看到、无法获取、也无法推断出关于你的任何信息：不知道你是谁，不知道你有没有安装过，不知道你打开过几次，不知道你的健康数据长什么样。App 里没有任何一行代码会发起网络请求。',
        ) },
      ],
    },
    {
      id: 'health-data',
      title: L('Which health data the app reads', 'App 读取哪些健康数据'),
      blocks: [
        { kind: 'p', text: L(
          'The app asks for **read-only** access to data that is already in the Health app. It never writes anything to Health.',
          'App 会向你申请**只读**权限，用来读取「健康」App 里已有的数据。它从不向「健康」写入任何内容。',
        ) },
        {
          kind: 'table',
          head: [L('Category', '类别'), L('Used for', '用来做什么')],
          rows: [
            [L('Steps, distance, active energy, exercise minutes, stand hours', '步数、距离、活动能量、锻炼分钟、站立'), L('Activity trends, calendar heat map, Activity ring progress', '活动趋势、日历热力图、活动圆环完成度')],
            [L('Heart rate, resting heart rate, HRV, blood oxygen, respiratory rate', '心率、静息心率、心率变异性、血氧、呼吸频率'), L('Daily heart rhythm, heart rate zones, recovery and stress estimates', '心率节律、心率区间分布、恢复与压力估算')],
            [L('Sleep', '睡眠'), L('Sleep duration and stages', '睡眠时长与阶段分布')],
            [L('Workouts and workout segments', '锻炼记录与分段'), L('Workout details and Strain estimates', '逐次锻炼详情、体能负荷估算')],
            [L('Workout GPS routes', '锻炼的 GPS 轨迹'), L('Route, elevation and pace maps in workout details', '在锻炼详情里画出路线、海拔与配速剖面')],
            [L('ECG waveforms', '心电图波形'), L('Displaying the waveform on the heart page', '在心率页面里显示波形图')],
            [L('Height, weight, date of birth, biological sex', '身高、体重、出生日期、生理性别'), L('Estimating maximum heart rate and heart rate zones', '估算最大心率与心率区间，换算相对指标')],
            [L('Activity ring summaries', '活动圆环摘要'), L('Cross-checking against Apple\'s own ring data', '与 Apple 自己的圆环数据对照校准')],
          ],
        },
        { kind: 'p', text: L(
          'The permission screen is provided by iOS, and you can choose item by item. **Anything you don\'t allow is never read**; the matching charts are simply left empty and everything else works as usual.',
          '授权页面由 iOS 系统提供，你可以逐项勾选。**没有勾选的部分不会被读取**，报告里对应的图表会显示为空，其余部分照常工作。',
        ) },
      ],
    },
    {
      id: 'storage',
      title: L('Where the data is stored', '数据存在哪里'),
      blocks: [
        { kind: 'p', text: L(
          'The app writes its results to a SQLite database file in its own sandbox (`Application Support`). This file:',
          'App 把计算结果写进一个 SQLite 数据库文件，位置是 App 自己的沙盒目录（`Application Support`）。这个文件：',
        ) },
        { kind: 'ul', items: [
          L('Can only be accessed by this app. Other apps and the Files app can\'t see it.', '只有这个 App 能访问，其他 App 和「文件」App 都看不到'),
          L('**Is explicitly excluded from iCloud backup.** App Store Review Guideline 5.1.3 requires this of HealthKit apps, and we agree with it.', '**被明确排除在 iCloud 备份之外**——这是 App Store 审核指南 5.1.3 对使用 HealthKit 的 App 的硬性要求，也是我们认同的做法'),
          L('Is deleted together with the app. Uninstall the app and this data is gone.', '随 App 一起被删除。卸载 App，这份数据就不存在了'),
        ] },
        { kind: 'p', text: L(
          'The app doesn\'t use CloudKit, iCloud Drive, or any other cloud sync. The report won\'t follow you to a new phone; you\'ll sync once more on the new device. That trade-off is deliberate.',
          'App 不使用 CloudKit、不使用 iCloud Drive、不使用任何形式的云端同步。换手机不会带走这份报告，需要在新设备上重新同步一次——这是刻意的取舍。',
        ) },
      ],
    },
    {
      id: 'never',
      title: L('What will never happen', '不会发生的事'),
      blocks: [
        { kind: 'ul', items: [
          L('Your data will **not** be uploaded to any server, including the developer\'s', '数据**不会**被上传到任何服务器，包括开发者的服务器'),
          L('Your data will **not** be sold, rented, or shared with any third party', '数据**不会**被出售、出租或分享给任何第三方'),
          L('Your data will **not** be used for advertising, marketing, or profiling', '数据**不会**用于广告、营销或用户画像'),
          L('Your data will **not** be used to train any machine learning or AI model', '数据**不会**被用于训练任何机器学习或 AI 模型'),
          L('The app contains **no** third-party SDKs, analytics, crash reporting, or tracking', 'App 内**没有**任何第三方 SDK、分析工具、崩溃上报或追踪组件'),
          L('The app **does not** require an account and never asks for your email, phone number, or identity', 'App **不需要**注册账号，也不索取邮箱、手机号或任何身份信息'),
          L('The app **does not** write to the Health app or change your existing health records', 'App **不会**向「健康」App 写入数据，不会修改你原有的健康记录'),
        ] },
      ],
    },
    {
      id: 'controls',
      title: L('Your controls', '你的控制权'),
      blocks: [
        { kind: 'h3', text: L('Revoke access', '撤销授权') },
        { kind: 'p', text: L(
          'Turn off any or all permissions at any time in **Settings → Privacy & Security → Health → MiYa**. The next sync won\'t be able to read that data.',
          '随时可以在 **设置 → 隐私与安全性 → 健康 → MiYa** 里关掉任意一项或全部授权。撤销之后，App 下一次同步就读不到对应数据了。',
        ) },
        { kind: 'h3', text: L('Delete generated data', '删除已生成的数据') },
        { kind: 'p', text: L(
          'On the in-app “About & Privacy” screen, tap **“Delete Data on This Device”** to clear everything the app generated. Your original records in the Health app are not affected.',
          '在 App 内的「关于与隐私」页面，点**「删除本机数据」**即可清空 App 生成的全部内容。你在「健康」App 里的原始记录不受影响。',
        ) },
        { kind: 'h3', text: L('Remove completely', '彻底移除') },
        { kind: 'p', text: L(
          'Delete the app. iOS removes its sandbox, database included, leaving nothing behind.',
          '删除 App 即可。沙盒目录连同数据库一起被系统清除，不留残余。',
        ) },
        { kind: 'p', text: L(
          'Because the developer never holds any of your data, there is nothing to request deletion of.',
          '因为开发者从未持有你的任何数据，所以不存在「向开发者申请删除数据」这件事——没有可删的东西。',
        ) },
      ],
    },
    {
      id: 'not-medical',
      title: L('Not a medical product', '这不是医疗产品'),
      blocks: [
        { kind: 'p', text: L(
          'The **Recovery, Stress, Strain and Battery** scores in the report are **relative estimates** calculated from your own recent data, meant for watching personal trends. They:',
          '报告中的**恢复分、压力分、负荷（Strain）和能量余量**，是根据你自己过去一段时间的数据算出来的**相对估算值**，用于观察个人趋势。它们：',
        ) },
        { kind: 'ul', items: [
          L('Are not a medical diagnosis and cannot be used to identify any condition', '不是医疗诊断，不能用来判断任何疾病'),
          L('Are not equivalent to readings from any professional medical device or other app', '不等同于任何专业医疗设备或第三方 App 的读数'),
          L('Do not replace a doctor, a check-up, or professional medical advice', '不能替代医生、体检或专业医疗建议'),
        ] },
        { kind: 'p', text: L(
          'ECG waveforms are displayed for visualization only, and the app **does not interpret them**. For heart rhythm results, rely on Apple\'s classification in the Health app and on your doctor.',
          '心电图波形的显示仅为可视化呈现，App **不做任何判读**。心律相关的结论请以「健康」App 中 Apple 的官方分类结果和医生的意见为准。',
        ) },
        { kind: 'p', text: L(
          'If you experience chest pain, marked shortness of breath, dizziness, or palpitations, stop exercising and seek medical care.',
          '如果出现胸痛、明显气短、头晕或心悸，请停止运动并及时就医。',
        ) },
      ],
    },
    {
      id: 'children',
      title: L('Children', '儿童'),
      blocks: [
        { kind: 'p', text: L(
          'This app is intended for adults. It is not designed for children under 13 and does not knowingly read children\'s health data. Since the app collects no information, no child\'s data can be transmitted to the developer.',
          '本 App 面向成年人，不针对 13 岁以下儿童设计，也不会有意读取儿童的健康数据。由于 App 不收集任何信息，也不存在向开发者传输儿童数据的可能。',
        ) },
      ],
    },
    {
      id: 'changes',
      title: L('Changes to this policy', '政策变更'),
      blocks: [
        { kind: 'p', text: L(
          'If this policy changes materially, the effective date at the top will be updated and the change will be noted in the app\'s release notes. The app\'s privacy model, where data never leaves the device, is a structural design decision; any change to it would be treated as a major change and announced clearly in the app.',
          '如果这份政策有实质性修改，本页面顶部的生效日期会同步更新，变更也会在 App 更新说明里注明。因为 App 的隐私模型是「数据不离开设备」这一条结构性设计，任何会改变它的修改都会被视为重大变更，并在 App 内明确告知。',
        ) },
      ],
    },
  ] satisfies MiyaSection[],
  contact: {
    id: 'support',
    title: L('Contact and support', '联系与支持'),
    intro: L(
      'For questions about this policy, help using the app, or bug reports, email us. This is also the app\'s support channel.',
      '关于这份政策、App 的使用问题或 bug 反馈，欢迎直接发邮件。这也是本 App 的技术支持渠道。',
    ),
    details: [
      { label: L('Email', '邮箱'), value: L(MIYA_SUPPORT_EMAIL, MIYA_SUPPORT_EMAIL), href: `mailto:${MIYA_SUPPORT_EMAIL}` },
      { label: L('App', 'App'), value: L('MiYa (iOS)', 'MiYa（iOS）') },
      { label: L('Developer', '开发者'), value: L('Eden', 'Eden') },
    ] as Array<{ label: MiyaLocalized; value: MiyaLocalized; href?: string }>,
    footer: L(
      'This page serves as both the privacy policy and the support page for MiYa.',
      '本页面同时作为「MiYa」的隐私政策地址与技术支持地址。',
    ),
  },
};

/** Strip the inline markup for plain-text contexts (static prerender body, meta). */
export function miyaPlainText(value: string): string {
  return value.replace(/\*\*/g, '').replace(/`/g, '');
}
