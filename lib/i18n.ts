export const locales = ["en", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
};

export const content = {
  en: {
    meta: {
      title: "Academic Profile | Theoretical Physics & Semiconductors",
      description:
        "Academic homepage focused on theoretical physics and semiconductor research, featuring biography, projects, and contact details.",
      keywords: [
        "theoretical physics",
        "semiconductor research",
        "quantum materials",
        "academic profile",
        "researcher",
      ],
    },
    hero: {
      name: "DA BO",
      title:
        "Principal Researcher, Quantum Beam Diffraction Group, Advanced Analysis Division, Research Center for Materials Science"
    },
    info: {
      phoneLabel: "Phone",
      phone: "+86 000-0000-0000",
      addressLabel: "Address",
      address: "305-0047 1-2-1 Sengen, Tsukuba, Ibaraki, Japan",
      emailLabel: "Email",
      email: "DA.Bo@nims.go.jp",
      fieldsLabel: "Research Fields",
      fields: [
        "Theoretical Physics",
        "Quantum Materials",
        "Semiconductor Devices",
        "Nanophotonics",
      ],
    },
    sections: {
      shortBioTitle: "Short Bio",
      shortBio:
        "Your Name is an assistant professor specializing in theoretical physics and semiconductor research. Their work bridges quantum theory, material modeling, and device-level applications with a focus on scalable, energy-efficient technologies.",
      longBioTitle: "Long Bio",
      longBio: [
        "Your Name received a Ph.D. in Physics from Your University and completed postdoctoral training in condensed matter theory. They joined the Institute of Theoretical Physics in 2022 and currently lead a semiconductor research group focused on quantum devices and low-dimensional materials.",
        "Their research combines ab initio modeling, transport theory, and device simulation to understand charge, spin, and heat dynamics in emerging semiconductor systems. Their work has been published in leading journals and presented at international conferences in physics and materials science.",
      ],
      personalIntroTitle: "Personal Introduction",
      personalProfile: {
        title: "Personal Profile",
        content:
          "Your Name holds a BA in International Economics from Institute of International Relations, and an MA and Ph.D in economics from University of Windsor and University of Guelph in Canada respectively. They were appointed Assistant Professor at the school of Public Policy and Public Finance at Central University of Finance and Economics in 2009, Associate Professor in 2016. In March 2021, they joined Tsinghua University as an associate professor. Since March 2023, they have served as the Director of Global Climate Governance Research at the Institute of Climate Change and Sustainable Development at Tsinghua University.",
      },
      mainResearchAreas: {
        title: "Main Research Areas",
        content:
          "Their main research areas include climate policy and governance, climate risk and adaptation, and environmental economics. Their papers on climate policy and governance have appeared in journals such as Foreign Policy, Financial and Economic Review, China International Studies, Environmental Science & Ecotechnology, World Environment. Their research on climate adaptation and risk has been appeared in such outlets as Journal of Insurance Issues, Climatic Change, Social Indicators Research, Economics and Human Biology. Their work in environmental economics has appeared in journals such as Environmental and Resource Economics, Journal of Cleaner Production, European Journal of Health Economics, et al. In 2015, their paper Climatic Variations and the Market Value of Insurance Firms was awarded the second-best paper by the Journal of Insurance Issues and the School of Insurance, Actuarial Science, and Risk Management at St. John's University in US. In 2023, they served as the executive deputy editor of the book Introduction to Global Climate Governance, a series of books on carbon peak and carbon neutrality published by the Chinese Association for Science and Technology, with former China Climate Special Envoy Zhenhua Xie serving as the editor-in-chief.",
      },
      researchContent: {
        title: "Research Content",
        keywords: ["Nanomaterial", "Surface analysis", "Background signal", "Secondary electron"],
        description:
          "Dr Bo Da has been engaged in developing novel measurement-analysis methods to extract more information from measured spectra by surface analysis techniques. For instance, he developed the reverse Monte Carlo method to extract optical constant of bulk material from measured surface electron spectra, and the extended Mermin method to determine low energy electron mean free path of bulk material. Most recently, Da's research focus has been largely related to development of new measurement-analysis method for nanomaterial samples. The virtual substrate method developed by him represents a benchmark for surface analysis to provide \"free-standing\" information about supported nanomaterials, and brought him President's Prize awarded by NIMS. He has had ten first-author papers related to these new methods published in various journals, including Nature Communications, Physical Review Letters and Journal of Applied Physics, among others.",
        detailedDescription:
          "Characterization techniques available for bulk or thin-film solid-state materials have been extended to substrate-supported nanomaterials, but generally non-quantitatively. This is because the nanomaterial signals are inevitably buried in the signals from the underlying substrate in common reflection-configuration techniques. Here, we propose a virtual substrate method, inspired by the four-point probe technique for resistance measurement as well as the chop-nod method in infrared astronomy, to characterize nanomaterials without the influence of underlying substrate signals from four interrelated measurements. This method in secondary electron (SE) microscopy, a SE spectrum (white electrons) associated with the reflectivity difference between two different substrates can be tracked and controlled. The SE spectrum is used to quantitatively investigate the covering nanomaterial based on subtle changes in the transmission of the nanomaterial with high efficiency rivaling that of conventional core-level electrons. The virtual substrate method represents a benchmark for surface analysis to provide \"free-standing\" information about supported nanomaterials.",
      },
      experience: {
        title: "Experience",
        items: [
          { year: "2023", institution: "Research Center for Materials Science, Advanced Analysis Division, Quantum Beam Diffraction Group", position: "Principal Researcher" },
          { year: "2021", institution: "Research Center for Materials Science", position: "Researcher" },
          { year: "2016", institution: "Research Center for Materials Science", position: "Researcher" },
          { year: "2009", institution: "Research Center for Materials Science", position: "Researcher" },
        ],
      },
      projectsTitle: "Projects & Consulting",
      projects: [
        "National program on quantum-enabled semiconductor devices",
        "Industry collaboration on wide-bandgap materials reliability",
        "Cross-disciplinary initiative on nanoscale heat transport",
      ],
      conferencesTitle: "Conferences & Media",
      conferences: [
        "Invited talks at APS March Meeting and MRS",
        "Keynote on quantum device modeling at NanoTech Summit",
        "Featured in university research highlights and science media",
      ],
    },
    navigation: {
      overview: "Overview",
      bio: "Biography",
      projects: "Projects",
      media: "Media",
      contact: "Contact",
      home: "Home",
      forum: "NIMS x LAM Forum",
      achievements: "Achievements",
      papers: "Papers",
    },
    papers: {
      title: "Research Papers",
      description: "A comprehensive list of published research papers and publications.",
      previous: "Previous",
      next: "Next",
      pageInfo: "Page {current} of {total}",
      noResults: "No papers found.",
      showing: "Showing",
      to: "to",
      of: "of",
      items: "items",
    },
    forum: {
      title: "NIMS x LAM Forum",
      host: "Host",
      speaker: "Speaker",
      date: "Date",
      viewDetails: "View Details",
      introduction: "Introduction",
      backToList: "Back to Forum List",
    },
    achievements: {
      mediaReports: {
        title: "Media Coverage of Research Achievements",
        readMore: "READ MORE",
        items: [
          {
            image: "/media-report-1.png",
            title: "Breakthrough in Semiconductor Manufacturing Equipment: Precise Control of Electron Beams with World's First Crystal",
            content: "NIMS Principal Researcher Dr. Bo Da interviewed on the development of breakthrough technology for precision electron beam control using a world-first crystal structure, supported by TNP Partners in Yokohama.",
            date: "2025-04",
            journals: ["Regional Economic Intelligence"],
          },
          {
            images: [
              { src: "/media-report-2c.png", alt: "Surface-Sensitive Low-Speed Electron Distance (Kagaku Shimbun)" },
              { src: "/media-report-2b.png", alt: "Electron Travel Distance Calculation (Nikkan Kogyo Shimbun)" },
              { src: "/media-report-2a.png", alt: "NIMS New Algorithm (Nikkan Sangyo Shimbun)" },
              { src: "/media-report-2d.png", alt: "Algorithm for Low-Speed Electron Travel Distance (NIMS News)" }
            ],
            title: "High-accuracy electron-solid interaction model",
            content: "Dr. Bo Da's specialized algorithms for precisely calculating electron travel distance were featured across multiple major scientific outlets, representing a fundamental advance in surface analysis characterization.",
            date: "2014-08/09",
            journals: ["Kagaku Shimbun", "Nikkan Kogyo Shimbun", "Nikkan Sangyo Shimbun", "NIMS News"],
          },
          {
            image: "/media-report-3.png",
            title: "President's Prize Awarded for Surface Analysis Innovation",
            content: "NIMS recognizes outstanding contribution to materials science with prestigious award for groundbreaking measurement techniques in surface analysis.",
            date: "2020-09",
            journals: ["NIMS News"],
          },
        ],
      },
      awards: {
        title: "Awards and Honors",
        items: [
          { year: "2023", name: "Kurata Grant, The Hitachi Global Foundation" },
          { year: "2023", name: "Iketani Science and Technology Foundation Research Grant, Iketani Science and Technology Foundation" },
          { year: "2020", name: "Kao Science Award, Kao Foundation for Arts and Sciences" },
          { year: "2019", name: "Excellent Presentation Award, NIMS WEEK Organizing Committee" },
          { year: "2018", name: "Excellent Presentation Award, Joint Symposium on Materials Integration and Advanced Characterization Executive Committee" },
          { year: "2017", name: "President's Award for Progress, NIMS Board of Directors" },
          { year: "2016", name: "Excellent Presentation Award, Joint Symposium on Multi-field Measurements Executive Committee" },
        ],
      },
    },
  },
  zh: {
    meta: {
      title: "学术主页｜理论物理与半导体研究",
      description:
        "以理论物理与半导体研究为主题的学术主页，包含个人简介、项目与联系方式。",
      keywords: [
        "理论物理",
        "半导体研究",
        "量子材料",
        "学术主页",
        "科研",
      ],
    },
    hero: {
      name: "达 博",
      title: "材料基础研究中心 先进解析领域 量子束衍射组 主任研究员"
    },
    info: {
      phoneLabel: "电话",
      phone: "+86 000-0000-0000",
      addressLabel: "地址",
      address: "305-0047 日本茨城县筑波市千现1-2-1",
      emailLabel: "邮箱",
      email: "DA.Bo@nims.go.jp",
      fieldsLabel: "研究方向",
      fields: ["纳米材料", "表面分析", "背景信号", "二次电子"],
    },
    sections: {
      shortBioTitle: "简短简介",
      shortBio:
        "你的姓名为理论物理与半导体研究方向的助理教授，研究贯通量子理论、材料建模与器件应用，关注可扩展的高效能技术。",
      longBioTitle: "详细简介",
      longBio: [
        "你的姓名毕业于某某大学物理学博士，随后从事凝聚态理论博士后研究。2022 年加入理论物理研究所，现主持半导体研究组，聚焦量子器件与低维材料。",
        "研究结合第一性原理建模、输运理论与器件仿真，揭示新型半导体体系中的电荷、自旋与热输运机制。相关成果发表于重要期刊，并在国内外学术会议报告。",
      ],
      personalIntroTitle: "个人介绍",
      personalProfile: {
        title: "个人简介",
        content:
          "你的姓名持有国际关系学院国际经济学士学位，以及加拿大温莎大学和圭尔夫大学的经济学硕士和博士学位。2009 年被任命为中央财经大学公共政策与公共财政学院助理教授，2016 年晋升为副教授。2021 年 3 月，加入清华大学担任副教授。自 2023 年 3 月起，担任清华大学气候变化与可持续发展研究院全球气候治理研究中心主任。",
      },
      mainResearchAreas: {
        title: "主要研究领域",
        content:
          "主要研究领域包括气候政策与治理、气候风险与适应、环境经济学。关于气候政策与治理的论文发表在《外交政策》、《财经评论》、《中国国际研究》、《环境科学与生态技术》、《世界环境》等期刊。关于气候适应与风险的研究发表在《保险问题杂志》、《气候变化》、《社会指标研究》、《经济学与人类生物学》等期刊。环境经济学方面的研究发表在《环境与资源经济学》、《清洁生产杂志》、《欧洲健康经济学杂志》等期刊。2015 年，论文《气候变化与保险公司的市场价值》获得《保险问题杂志》和美国圣约翰大学保险、精算科学与风险管理学院颁发的第二优秀论文奖。2023 年，担任《全球气候治理导论》一书的执行副主编，该书是中国科学技术协会碳达峰碳中和系列丛书之一，前中国气候特使解振华担任主编。",
      },
      researchContent: {
        title: "研究内容",
        keywords: ["纳米材料", "表面分析", "背景信号", "二次电子"],
        description:
          "达波博士一直致力于开发新颖的测量分析方法，从表面分析技术测量的光谱中提取更多信息。例如，他开发了反向蒙特卡洛方法，从测量的表面电子光谱中提取块体材料的光学常数，以及扩展的 Mermin 方法来确定块体材料的低能电子平均自由程。最近，达的研究重点主要与纳米材料样品的新测量分析方法的开发相关。他开发的虚拟基底方法代表了表面分析的基准，为支撑纳米材料提供\"独立\"信息，并为他赢得了 NIMS 颁发的总裁奖。他有十篇与这些新方法相关的第一作者论文发表在各种期刊上，包括 Nature Communications、Physical Review Letters 和 Journal of Applied Physics 等。",
        detailedDescription:
          "适用于块体或薄膜固态材料的表征技术已扩展到基底支撑的纳米材料，但通常是非定量的。这是因为在常见的反射配置技术中，纳米材料信号不可避免地埋藏在底层基底的信号中。在这里，我们提出了一种虚拟基底方法，灵感来自电阻测量的四探针技术以及红外天文学中的 chop-nod 方法，通过四个相互关联的测量来表征纳米材料，而不受底层基底信号的影响。这种在二次电子（SE）显微镜中的方法，可以跟踪和控制与两种不同基底之间的反射率差异相关的 SE 光谱（白电子）。SE 光谱用于基于纳米材料透射的细微变化来定量研究覆盖的纳米材料，其效率可与传统的芯能级电子相媲美。虚拟基底方法代表了表面分析的基准，为支撑纳米材料提供\"独立\"信息。",
      },
      experience: {
        title: "经历",
        items: [
          { year: "2023年", institution: "材料基础研究中心 先进解析领域 量子束衍射组", position: "主任研究员" },
          { year: "2021年", institution: "材料基础研究中心", position: "研究员" },
          { year: "2016年", institution: "材料基础研究中心", position: "研究员" },
          { year: "2009年", institution: "材料基础研究中心", position: "研究员" },
        ],
      },
      projectsTitle: "项目与咨询",
      projects: [
        "量子增强半导体器件国家重点项目",
        "宽禁带材料可靠性产业合作",
        "纳米尺度热输运交叉研究计划",
      ],
      conferencesTitle: "会议与媒体",
      conferences: [
        "APS March Meeting、MRS 邀请报告",
        "纳米器件建模主题大会主旨演讲",
        "高校科研动态与科普媒体报道",
      ],
    },
    navigation: {
      overview: "概览",
      bio: "简介",
      projects: "项目",
      media: "媒体",
      contact: "联系",
      home: "首页",
      forum: "NIMS x LAM 论坛",
      achievements: "成就",
      papers: "论文",
    },
    papers: {
      title: "研究论文",
      description: "已发表的研究论文和出版物的完整列表。",
      previous: "上一页",
      next: "下一页",
      pageInfo: "第 {current} 页，共 {total} 页",
      noResults: "未找到论文。",
      showing: "显示",
      to: "-",
      of: "条，共",
      items: "条数据",
    },
    forum: {
      title: "NIMS x LAM 论坛",
      host: "主持人",
      speaker: "主讲人",
      date: "举办时间",
      viewDetails: "查看详情",
      introduction: "论坛介绍",
      backToList: "返回论坛列表",
    },
    achievements: {
      mediaReports: {
        title: "新闻报道",
        readMore: "阅读更多",
        items: [
          {
            image: "/media-report-1.png",
            title: "半导体制造装置取得突破：利用世界首个结晶体精确控制电子束",
            content: "NIMS 主任研究员达博博士接受采访，介绍了一项利用世界首创结晶结构实现精密电子束控制的突破性技术，该技术由横滨 TNP Partners 提供支持。",
            date: "2025年4月",
            journals: ["地域经济情报"],
          },
          {
            images: [
              { src: "/media-report-2c.png", alt: "低速电子距离（科学新闻）" },
              { src: "/media-report-2b.png", alt: "电子走行距离计算（日刊工业新闻）" },
              { src: "/media-report-2a.png", alt: "NIMS 新算法（日刊产业新闻）" },
              { src: "/media-report-2d.png", alt: "低速电子走行距离算法（NIMS 新闻）" }
            ],
            title: "高准确度电子与固体相互作用模型",
            content: "达博博士开发的用于精确计算电子走行距离的专门算法被多家主流科学媒体报道，代表了表面分析表征领域的重大进展。",
            date: "2014年8月/9月",
            journals: ["科学新闻", "日刊工业新闻", "日刊产业新闻", "NIMS News"],
          },
          {
            image: "/media-report-3.png",
            title: "表面分析创新获总裁奖",
            content: "NIMS 表彰在材料科学领域的杰出贡献，授予突破性测量技术方面的最高荣誉（NIMS 总裁奖）。",
            date: "2020年9月",
            journals: ["NIMS News"],
          },
        ],
      },
      awards: {
        title: "获得奖项",
        items: [
          { year: "2023年", name: "仓田奖励金 -- 日本日立财团" },
          { year: "2023年", name: "池谷财团研究助成金 -- 日本池谷科学技术振兴财团" },
          { year: "2020年", name: "花王科学奖励金 -- 日本花王财团" },
          { year: "2019年", name: "优秀发表赏 -- 日本国立材料研究所 NIMS WEEK 组委会" },
          { year: "2018年", name: "优秀发表赏 -- 日本材料集成与先进材料表征联合研讨会执行委员会" },
          { year: "2017年", name: "理事长进步赏 -- 日本国立材料研究所理事会" },
          { year: "2016年", name: "优秀发表赏 -- 日本多领域测量联合研讨会执行委员会" },
        ],
      },
    },
  },
  ja: {
    meta: {
      title: "研究者ページ｜理論物理と半導体研究",
      description:
        "理論物理と半導体研究に焦点を当てた研究者ページ。略歴、プロジェクト、連絡先を掲載。",
      keywords: [
        "理論物理",
        "半導体研究",
        "量子材料",
        "研究者ページ",
        "学術",
      ],
    },
    hero: {
      name: "達 博",
      title:
        "マテリアル基盤研究センター 先端解析分野 量子ビーム回折グループ 主任研究員"
    },
    info: {
      phoneLabel: "電話",
      phone: "+86 000-0000-0000",
      addressLabel: "住所",
      address: "305-0047 茨城県つくば市千現1-2-1",
      emailLabel: "メール",
      email: "DA.Bo@nims.go.jp",
      fieldsLabel: "研究分野",
      fields: [
        "理論物理",
        "量子材料",
        "半導体デバイス",
        "ナノフォトニクス",
      ],
    },
    sections: {
      shortBioTitle: "ショートバイオ",
      shortBio:
        "あなたの名前は理論物理と半導体研究を専門とする助教で、量子理論、材料モデリング、デバイス応用を横断する研究を行っています。",
      longBioTitle: "詳細バイオ",
      longBio: [
        "あなたの名前は○○大学で物理学の博士号を取得し、凝縮系理論のポスドク研究を経て 2022 年に理論物理研究所に着任しました。現在は量子デバイスと低次元材料に焦点を当てた半導体研究グループを率いています。",
        "研究では第一原理計算、輸送理論、デバイスシミュレーションを統合し、新規半導体系における電荷・スピン・熱輸送の理解を進めています。",
      ],
      personalIntroTitle: "個人紹介",
      personalProfile: {
        title: "個人プロフィール",
        content:
          "あなたの名前は国際関係学院で国際経済学の学士号を取得し、カナダのウィンザー大学とゲルフ大学で経済学の修士号と博士号を取得しました。2009 年に中央財経大学公共政策・公共財政学部の助教に任命され、2016 年に准教授に昇進しました。2021 年 3 月、清華大学に准教授として着任しました。2023 年 3 月より、清華大学気候変動・持続可能発展研究院のグローバル気候ガバナンス研究センター長を務めています。",
      },
      mainResearchAreas: {
        title: "主要研究分野",
        content:
          "主要研究分野は、気候政策・ガバナンス、気候リスク・適応、環境経済学です。気候政策・ガバナンスに関する論文は、『Foreign Policy』、『Financial and Economic Review』、『China International Studies』、『Environmental Science & Ecotechnology』、『World Environment』などのジャーナルに掲載されています。気候適応・リスクに関する研究は、『Journal of Insurance Issues』、『Climatic Change』、『Social Indicators Research』、『Economics and Human Biology』などのジャーナルに掲載されています。環境経済学に関する研究は、『Environmental and Resource Economics』、『Journal of Cleaner Production』、『European Journal of Health Economics』などのジャーナルに掲載されています。2015 年、論文「気候変動と保険会社の市場価値」が『Journal of Insurance Issues』と米国セントジョンズ大学保険・アクチュアリー科学・リスク管理学部から第二優秀論文賞を受賞しました。2023 年、中国科学技術協会のカーボンピーク・カーボンニュートラルシリーズの一冊である『グローバル気候ガバナンス入門』の執行副編集長を務め、前中国気候特使の解振華氏が編集長を務めました。",
      },
      researchContent: {
        title: "研究内容",
        keywords: ["ナノ材料", "表面分析", "バックグラウンド信号", "二次電子"],
        description:
          "達波博士は、表面分析技術によって測定されたスペクトルからより多くの情報を抽出するための新しい測定分析方法の開発に従事してきました。例えば、測定された表面電子スペクトルからバルク材料の光学定数を抽出する逆モンテカルロ法、およびバルク材料の低エネルギー電子平均自由行程を決定する拡張 Mermin 法を開発しました。最近、達の研究焦点は主にナノ材料サンプルの新しい測定分析方法の開発に関連しています。彼が開発した仮想基板法は、支持ナノ材料に関する「独立」情報を提供する表面分析のベンチマークを表し、NIMS から総裁賞を受賞しました。彼は、Nature Communications、Physical Review Letters、Journal of Applied Physics など、さまざまなジャーナルにこれらの新しい方法に関連する 10 本の第一著者論文を発表しています。",
        detailedDescription:
          "バルクまたは薄膜の固体材料に利用可能な特性評価技術は、基板支持ナノ材料に拡張されていますが、一般的に非定量的です。これは、一般的な反射構成技術では、ナノ材料信号が必然的に下層基板からの信号に埋もれるためです。ここでは、抵抗測定のための 4 点プローブ技術および赤外天文学の chop-nod 法に触発された仮想基板法を提案し、4 つの相互関連する測定から下層基板信号の影響を受けずにナノ材料を特性評価します。二次電子（SE）顕微鏡におけるこの方法では、2 つの異なる基板間の反射率の差に関連する SE スペクトル（白電子）を追跡および制御できます。SE スペクトルは、従来のコアレベル電子に匹敵する高効率で、ナノ材料の透過の微妙な変化に基づいて被覆ナノ材料を定量的に調査するために使用されます。仮想基板法は、支持ナノ材料に関する「独立」情報を提供する表面分析のベンチマークを表します。",
      },
      experience: {
        title: "経歴",
        items: [
          { year: "2023年", institution: "マテリアル基盤研究センター 先端解析分野 量子ビーム回折グループ", position: "主任研究員" },
          { year: "2021年", institution: "マテリアル基盤研究センター", position: "研究員" },
          { year: "2016年", institution: "マテリアル基盤研究センター", position: "研究員" },
          { year: "2009年", institution: "マテリアル基盤研究センター", position: "研究員" },
        ],
      },
      projectsTitle: "プロジェクト／コンサルティング",
      projects: [
        "量子支援半導体デバイス国家プロジェクト",
        "ワイドバンドギャップ材料の信頼性評価",
        "ナノスケール熱輸送の学際的研究",
      ],
      conferencesTitle: "会議・メディア",
      conferences: [
        "APS March Meeting、MRS での招待講演",
        "ナノデバイスモデリング会議での基調講演",
        "大学研究ニュースおよび科学メディアに掲載",
      ],
    },
    navigation: {
      overview: "概要",
      bio: "バイオ",
      projects: "プロジェクト",
      media: "メディア",
      contact: "連絡先",
      home: "ホーム",
      forum: "NIMS x LAM フォーラム",
      achievements: "実績",
      papers: "論文",
    },
    papers: {
      title: "研究論文",
      description: "発表された研究論文と出版物の包括的なリスト。",
      previous: "前へ",
      next: "次へ",
      pageInfo: "ページ {current} / {total}",
      noResults: "論文が見つかりません。",
      showing: "表示中",
      to: "-",
      of: "件中",
      items: "件",
    },
    forum: {
      title: "NIMS x LAM フォーラム",
      host: "司会者",
      speaker: "講演者",
      date: "開催日",
      viewDetails: "詳細を見る",
      introduction: "紹介",
      backToList: "フォーラムリストに戻る",
    },
    achievements: {
      mediaReports: {
        title: "メディア報道による研究成果",
        readMore: "詳しく見る",
        items: [
          {
            image: "/media-report-1.png",
            title: "半導体製造装置にブレークスルー：世界初の結晶体で電子ビームを精密制御",
            content: "NIMS主任研究員・達博博士へのインタビュー。横浜のTNPパートナーズがサポートする、世界初の結晶体を用いた電子ビーム精密制御技術の革新的開発について詳述。",
            date: "2025年4月",
            journals: ["地域経済情報"],
          },
          {
            images: [
              { src: "/media-report-2c.png", alt: "低速電子走行距離を正確計算（科学新聞）" },
              { src: "/media-report-2b.png", alt: "電子の走行距離を正確計算（日刊工業新聞）" },
              { src: "/media-report-2a.png", alt: "NIMSが新アルゴリズム（日刊産業新聞）" },
              { src: "/media-report-2d.png", alt: "低粘度電子走行距離アルゴリズム（NIMSニュース）" }
            ],
            title: "高精度な電子・固体相互作用モデル",
            content: "電子走行距離を精密に計算するための達博博士のアルゴリズムが主要な科学メディアで特集され、表面分析における画期的な進展として紹介されました。",
            date: "2014年8月/9月",
            journals: ["化学工業日報", "日刊工業新聞", "日刊産業新聞", "NIMS News"],
          },
          {
            image: "/media-report-3.png",
            title: "表面分析の革新で総裁賞を受賞",
            content: "NIMS が材料科学分野での卓越した貢献を表彰し、画期的な表面分析測定技術に対して最高の栄誉（NIMS 総裁賞）を授与しました。",
            date: "2020年9月",
            journals: ["NIMS News"],
          },
        ],
      },
      awards: {
        title: "受賞歴",
        items: [
          { year: "2023年", name: "倉田奨励金 -- 日本日立財団" },
          { year: "2023年", name: "池谷財団研究助成金 -- 日本池谷科学技術振興財団" },
          { year: "2020年", name: "花王科学奨励金 -- 日本花王財団" },
          { year: "2019年", name: "優秀発表賞 -- 日本国立材料研究所 NIMS WEEK 組織委員会" },
          { year: "2018年", name: "優秀発表賞 -- 日本材料統合と先進材料キャラクタリゼーション合同シンポジウム実行委員会" },
          { year: "2017年", name: "理事長進歩賞 -- 日本国立材料研究所理事会" },
          { year: "2016年", name: "優秀発表賞 -- 日本多分野測定合同シンポジウム実行委員会" },
        ],
      },
    },
  },
} as const satisfies Record<Locale, unknown>;
