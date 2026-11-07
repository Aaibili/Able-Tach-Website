# Content License and Copyright Notice

**Project:** Able-Tach-Website

**Website:** Tianyuan Research Institute (田园研究所)

**Public Copyright Attribution:** Aai (the creator's public pen name)

**Copyright Notice:** © 2026 Aai. All rights reserved where applicable.

**Last updated:** 2026-11-07

**Public attribution:** Aai is the creator's personal public pen name and copyright attribution, not a separate legal entity.

**Website name:** Tianyuan Research Institute (田园研究所). This is the website name only.

The public copyright attribution used by the creator for original project-authored materials covered by this notice is Aai. It identifies the creator personally under a pen name and does not claim ownership of third-party materials or override separate rights held by contributors or other rights holders.

[简体中文](#内容许可与版权声明)

This document explains the distinction between the licensing of source code and the rights applicable to creative content in this repository. It is a project notice, not a substitute for file-specific licenses or applicable law.

## 1. Source Code

Only original source-code files and components expressly identified as covered by the project's GNU General Public License v3.0 (GPL-3.0-only), as described in [`LICENSE-SCOPE.md`](LICENSE-SCOPE.md) or in an individual file notice, are licensed under GPL-3.0-only.

This document does not replace, restrict, or modify the terms of GPL-3.0-only applicable to covered source code.

The GPL-3.0-only grant is limited to the program code identified in `LICENSE-SCOPE.md`. It does not grant a license to non-program text intended for display to website visitors merely because that text appears inside a covered HTML, CSS, JavaScript, or generator file. Examples include page titles, navigation labels, introductions, descriptions, disclaimers and legal notices, button text, image captions and alternative text, display-oriented metadata, and footer copy. This clarification applies to the wording itself and does not remove the GPL coverage of the surrounding program code. Whether particular wording is protected by copyright depends on applicable law.

The current site-wide visitor-facing copy is stored separately in `site-content/site-copy.json`, and the disclaimer text is stored in `site-content/disclaimer.html`. Article fragments are stored in `Papers and Achievements/article-content/`. These are content files, not reusable page program code, and are not included in the project's GPL-3.0-only grant. The page template and shared JavaScript load this content at runtime. Article metadata in `Papers and Achievements/articles.json`, the generated publication manifest `Papers and Achievements/papers.json`, and paired `.txt` descriptions are data or display-content files, not GPL-covered program code under this scope notice. This separation is the project's intended source-code/content boundary; it does not determine how every possible HTML or other combination must be characterized under applicable law.

The presence of the root `LICENSE` file does not, by itself, place every file in this repository under GPL-3.0-only. Consult the scope document and individual notices.

## 2. Original Images and Visual Assets

Unless an individual file or accompanying notice states otherwise, original visual materials—including website backgrounds, illustrations, cover images, photographs, design assets, and AI-generated images—are not included in the GPL-3.0-only grant.

No general permission is granted by this document to reproduce, adapt, modify, redistribute, publicly display, or commercially use these materials. Please obtain permission from the applicable rights holder before using them beyond what is permitted by applicable law or an explicit license.

AI-generated material may be subject to the terms of the generation service, applicable law, and third-party rights. Its copyright status and the availability of exclusive rights may vary according to the circumstances. This notice does not assert that every AI-generated image is necessarily protected by exclusive copyright.

## 3. Articles and Research Materials

Unless otherwise indicated, original articles, research reports, theoretical models, written explanations, and other creative works are separate from the source code licensed under GPL-3.0-only. The current article texts are stored as HTML content fragments in `Papers and Achievements/article-content/`; these fragments contain article markup and prose, not the reusable page program code, and are not included in the GPL-3.0-only grant.

For clarity, the HTML markup inside these article fragments is article-specific document structure, not the reusable page framework. It includes the elements and attributes used to organize an individual article, such as its headings, sections, paragraphs, tables, figures, captions, image and link references, and fragment-level IDs, classes, and data attributes. Under the project's stated licensing intent, this markup remains part of the article content and is not included in the GPL-3.0-only grant merely because it is written in HTML.

The reusable page framework is separately identified in `LICENSE-SCOPE.md`: the page template supplies the shared document shell and page regions; the shared JavaScript implements common page behavior. In particular, `assets/js/article-page.js` retrieves the manifest and fragment, parses the fragment, validates its permitted structure and attributes, and inserts the article element into the page. The loader rejects program and embedding elements such as scripts, styles, frames, and forms, as well as inline event-handler attributes and JavaScript URLs. The listed CSS files provide shared presentation rules; classes in an article fragment can serve as selectors' hooks without making the article prose or fragment itself part of those CSS files.

The page shell, loader, generators, and listed stylesheets remain subject to the GPL-3.0-only scope assigned to their original program code. The article fragment remains separately identified as content in the project's intended licensing scheme. Because HTML and CSS can interact when a page is rendered, this description does not settle every possible derivative-work or combined-work question under every jurisdiction; those questions depend on the specific materials and applicable law.

The article metadata in `Papers and Achievements/articles.json` is used to build the published HTML page shells. The generated `papers.json` manifest and paired `.txt` homepage descriptions are used to populate the homepage list. Their presence in the repository does not, by itself, grant a license to the articles or place these data and display-content files under GPL-3.0-only.

The source code license does not automatically grant permission to reproduce, adapt, modify, redistribute, publicly display, or commercially use these materials.

Please obtain authorization from the relevant rights holder before using these materials beyond what is permitted by applicable law or an explicit license notice.

The current fictional-content statement and the rules for distinguishing fictional works from real-world materials are set out in Section 7 below and in the website disclaimer.

## 4. Project Name, Logos, and Branding

The project name "Able-Tach-Website," the website name "Tianyuan Research Institute" (田园研究所), and associated logos, icons, and other identifying brand assets are not automatically licensed under GPL-3.0-only.

Permission to use the source code does not imply permission to use these names or assets in a way that suggests official affiliation, endorsement, or authorization.

Any applicable trademark or other rights remain unaffected by the source code license.

## 5. Third-Party Materials

The current browser-facing site does not load externally hosted fonts, JavaScript libraries, CSS frameworks, or remote image assets. The GitHub Actions workflow currently references two third-party workflow dependencies: `actions/checkout@v4` and `actions/setup-python@v5`. They are not part of the website's runtime code; their upstream projects identify them as MIT-licensed, and their respective upstream license texts and notices apply.

The repository also contains seven local image files. Their filenames, hashes, apparent project usage, and provenance status are listed in [`ASSET-SOURCES.md`](ASSET-SOURCES.md). The original creator or source for these images is not fully recorded in the repository at this time. Do not infer ownership or permission from their presence in the repository; verify the applicable source and rights before reuse.

## 6. Default Permission and Individual Notices

This section is a scope clarification identifying creative materials that the project does not include in its GPL-3.0-only grant. It is not an additional condition, limitation, or restriction on rights granted by GPL-3.0-only, and it must not be interpreted to narrow or withdraw any such right.

Recipients of GPL-covered program code retain all rights granted by GPL-3.0-only to copy, modify, and distribute that code, subject to the license terms. This includes passing along the complete GPL-3.0-only license text and preserving the notices that GPL-3.0-only requires to be retained. The root `LICENSE` file is provided for that purpose. Nothing in this content notice prevents copying or distributing the GPL-3.0-only text as permitted by the license.

This clarification does not, by itself, place `README.md`, `README.zh-CN.md`, `LICENSE-SCOPE.md`, this `CONTENT-LICENSE.md`, or other project documentation under GPL-3.0-only. Aai expressly permits `README.md`, `README.zh-CN.md`, `LICENSE-SCOPE.md`, this `CONTENT-LICENSE.md`, and `ASSET-SOURCES.md` to be reproduced and distributed verbatim and in full only when accompanying copies of the GPL-3.0-only-covered program code, for the limited purpose of explaining the project and the licensing scope of that code. This permission does not authorize modification of these documents or their standalone distribution as separate works. It applies only to the documents and does not add conditions to the GPL-3.0-only license governing the covered program code.

The fact that creative content is publicly viewable, downloadable, or included in this repository does not by itself constitute permission for unrestricted reuse. Rights and exceptions available under applicable law remain unaffected.

## 7. Disclaimer

As of 2026-11-07, all currently published creative works on the website—including articles, research reports, theoretical models, fictional people and institutions, events, and related visual materials—are fictional. Operational notices, legal notices, and licensing information are not fictional works.

Future real-world educational materials or genuine research will be clearly identified on the relevant page and, where appropriate, accompanied by sources, authors, and publication or review dates.

Academic terms such as “paper,” “published,” “experiment,” or “professor” used within fictional works are part of the fictional setting and do not imply actual publication, peer review, institutional certification, or experimentally verified results.

Fictional or hypothetical materials should not be treated as established scientific facts or professional advice. Content expressly labeled as real-world information should be checked against its cited sources and does not replace professional judgment.

This document does not provide warranties concerning the accuracy, completeness, or suitability of individual creative works.

## 8. Scope and Interpretation

This document describes the separation between source code licensing and content permissions. It does not replace the full text of GPL-3.0-only or override an independent license attached to a specific file.

Nothing in this notice is intended to remove rights granted by applicable law or by an explicit license applicable to a particular work.

If you wish to use content beyond the permissions available to you, contact the relevant rights holder where possible.

---

For source code licensing, see [`LICENSE`](LICENSE) and [`LICENSE-SCOPE.md`](LICENSE-SCOPE.md).

For project information, see [`README.md`](README.md) or [`README.zh-CN.md`](README.zh-CN.md).

# 内容许可与版权声明

[English](#content-license-and-copyright-notice) | **简体中文**

**项目：** Able-Tach-Website

**网站：** 田园研究所（Tianyuan Research Institute）
**公开版权署名：** Aai（创作者本人使用的公开笔名）

**版权声明：** © 2026 Aai。在适用法律允许的范围内保留相关权利。

**最后更新日期：** 2026年11月7日

“Aai”是创作者本人使用的公开笔名及公开版权署名，并非独立法人或其他法律实体。“田园研究所”仅为网站名称。

本文件用于说明本仓库中程序代码的许可证范围，以及文章、图片和其他创作性内容所适用的权利安排。它是项目说明，不替代具体文件的单独许可声明或适用法律。

## 一、源代码

只有 [LICENSE-SCOPE.md](LICENSE-SCOPE.md) 明确列出，或在具体文件中另行明确标注为 GPL-3.0-only 的原创程序代码，才采用 GNU 通用公共许可证第三版（GPL-3.0-only）。

本文件不会替代、限制或修改适用于上述代码的 GPL-3.0-only 条款。

GPL-3.0-only 的授权对象是明确列出的程序代码，不会仅因为面向访问者展示的非程序性文字出现在 HTML、CSS、JavaScript 或生成脚本中，就自动将该文字纳入代码许可证。此类文字包括页面标题、导航标签、介绍、简介、免责声明及其他法律声明、按钮文字、图片说明与替代文本、展示用元数据和页脚文案等。此项说明针对文字表达本身，不影响同一文件中符合 LICENSE-SCOPE.md 所列范围的程序代码；文字是否受到版权保护仍取决于适用法律。

目前，网站范围内的界面文案存放在 site-content/site-copy.json，免责声明正文存放在 site-content/disclaimer.html。文章正文片段位于 Papers and Achievements/article-content/。Papers and Achievements/articles.json、Papers and Achievements/papers.json 以及配套的 .txt 简介文件属于文章元数据、清单或展示内容数据，不因本说明而纳入 GPL-3.0-only。上述文件与可复用页面程序代码分开管理；文件扩展名本身不能决定许可证。

根目录存在 LICENSE 文件，并不意味着仓库中的所有文件都自动采用 GPL-3.0-only。判断具体文件的许可范围时，请同时查阅范围说明及文件级声明。

## 二、原创图片与视觉素材

除非具体文件或随附声明另有说明，原创视觉材料——包括网站背景、插画、封面图、照片、设计素材及 AI 生成图片——均不属于 GPL-3.0-only 授权范围。

本文件不授予对这些材料进行复制、改编、修改、再分发、公开展示或商业使用的一般许可。超出适用法律允许范围或明确许可证所授予权限的使用，应事先取得相关权利人的许可。

AI 生成材料还可能受到生成服务条款、适用法律及第三方权利的影响。其版权状态及是否能够享有排他性权利，可能因具体情况而异。本声明不主张所有 AI 生成图片必然受到排他性版权保护。

## 三、文章与研究材料

除非另有明确说明，原创文章、研究报告、理论模型、文字说明及其他创作性作品均与采用 GPL-3.0-only 的程序代码分开处理。Papers and Achievements/article-content/ 中的 HTML 文件是文章内容片段，其中的 HTML 标记用于组织和呈现具体文章，例如标题、章节、段落、表格、图片、图注、链接及片段级属性；按照本项目声明的授权安排，这些文章专属标记与相应文章内容一并处理，不纳入 GPL-3.0-only。

可复用页面框架另行列于 LICENSE-SCOPE.md。页面模板提供共享文档外壳及页面区域；共享 JavaScript 实现通用页面行为。具体而言，assets/js/article-page.js 读取清单和文章片段，校验允许的结构与属性，解析片段并将文章元素插入页面。加载器会拒绝脚本、样式、框架、表单等程序或嵌入元素，也会拒绝内联事件处理属性和 JavaScript URL。列明的 CSS 文件提供共享呈现规则；文章片段中的类名可作为样式选择器钩子，但这不会仅凭技术关联就使文章正文或片段成为 CSS 文件的一部分。

页面外壳、加载器、生成脚本及列明的样式表，在其原创程序代码范围内仍按 GPL-3.0-only 处理。文章片段则依照本项目的授权安排单独作为内容处理。HTML 与 CSS 在渲染时可能发生交互；本说明不对所有可能的组合或衍生作品问题作出普遍法律认定，具体仍取决于材料本身及适用法律。

Papers and Achievements/articles.json 中的元数据用于生成已发布的 HTML 页面外壳；papers.json 和配套 .txt 文件用于构建或展示首页成果列表。这些文件不因用于网站生成或展示，就自动获得 GPL-3.0-only 许可，也不构成对文章正文的许可授予。

仅凭文章或研究材料被纳入公开仓库，不代表项目授予对其复制、改编、修改、再分发、公开展示或商业使用的一般许可。超出适用法律允许范围或具体文件明确许可范围的使用，应事先取得相关权利人的授权。

## 四、项目名称、标识与品牌

项目名称 Able-Tach-Website、网站名称 田园研究所（Tianyuan Research Institute），以及相关 Logo、图标和其他品牌识别素材，不会自动纳入 GPL-3.0-only 授权范围。

获得程序代码的使用权，并不意味着可以用可能使他人误认为存在官方关联、认可、背书或授权的方式使用上述名称或素材。

适用的商标权及其他权利不受程序代码许可证影响。

## 五、第三方材料

当前网站前端没有加载外部托管字体、JavaScript 库、CSS 框架或远程图片资源。GitHub Actions 工作流目前引用两项第三方工作流依赖：`actions/checkout@v4` 和 `actions/setup-python@v5`。它们不是网站运行时程序代码；其上游项目声明采用 MIT 许可证，并分别适用其上游许可证文本及声明。

仓库还包含七张本地图片。文件名、哈希值、从项目引用位置判断的用途以及来源核实状态列于 [`ASSET-SOURCES.md`](ASSET-SOURCES.md)。目前仓库尚未完整记录这些图片的原始创作者或来源。不得仅因图片存在于仓库中就推定项目拥有相关权利或已经获得再利用许可；使用前应核实其来源和适用权利。

## 六、默认权限与单独声明

本节用于说明哪些创作性材料未被项目纳入 GPL-3.0-only 授权范围。它不是 GPL-3.0-only 的附加条件、限制或其他条款，也不得被解释为缩小或撤回该许可证已经授予的权利。

接收 GPL 授权程序代码的人，仍可在遵守许可证条款的前提下，行使 GPL-3.0-only 授予的复制、修改和分发权利。这包括依照许可证要求随代码提供完整的 GPL-3.0-only 许可证文本，并保留许可证要求保留的声明。根目录中的 LICENSE 文件用于提供该许可证全文。本内容声明不妨碍按照 GPL-3.0-only 允许的方式复制和分发 GPL 许可证文本。

README.md、README.zh-CN.md、LICENSE-SCOPE.md、本 CONTENT-LICENSE.md 及其他项目说明文档，不会仅因与 GPL 授权代码一同存放或分发就自动采用 GPL-3.0-only。Aai 明确允许使用者仅为说明项目及代码授权范围之目的，在分发 GPL-3.0-only 授权程序代码时，逐字、完整复制和分发上述五份说明文档。本项有限许可不允许修改这些文档，也不允许将其作为独立作品单独分发。该许可仅适用于说明文档本身，不对适用 GPL-3.0-only 的程序代码增加任何条件。

创作性内容可被公开查看、下载或收录在本仓库中，并不因此构成不受限制的再利用许可。适用法律赋予的权利与例外不受影响。

## 七、免责声明与内容性质

截至2026年11月7日，网站目前已发布的创作性作品——包括文章、研究报告、理论模型、虚构人物与机构、事件及相关视觉材料——均为虚构内容。网站运营通知、法律声明和许可信息不属于虚构作品。

未来如加入基于现实的知识性资料或真实研究成果，将在相应页面明确标注，并在适当情况下附上来源、作者及发布日期或核查日期。

虚构作品中使用“论文”“已发表”“实验”或“教授”等学术表达，仅属于作品设定，不代表真实发表、同行评审、机构认证或实验验证。

虚构或假设性材料不应被视为已确立的科学事实或专业建议。明确标注为现实资料的内容，应结合其列明来源进行核查，也不能替代专业判断。

本文件不对具体创作性作品的准确性、完整性或适用性作出保证。

## 八、范围与解释

本文件说明的是程序代码许可证与内容使用权限之间的区分。它不替代 GPL-3.0-only 全文，也不覆盖针对具体文件单独授予的许可证。

本声明无意剥夺适用法律赋予的权利，也不影响明确适用于特定作品的许可证所授予的权利。

如需在现有权限之外使用相关内容，请尽可能联系相应权利人。

---

程序代码许可证请参阅 LICENSE 与 LICENSE-SCOPE.md。

项目介绍请参阅 README.md 或 README.zh-CN.md。
