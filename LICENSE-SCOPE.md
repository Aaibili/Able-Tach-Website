# License Scope

Copyright © 2026 Aai. All rights reserved. This document may be reproduced and distributed verbatim and in full only when accompanying copies of the GPL-3.0-only-covered program code, solely to explain the scope of that code license. This permission does not allow modification or standalone distribution of this document and does not add conditions to the GPL-covered code.

**Last updated:** 2026-11-07

[简体中文](#许可证适用范围)

This document identifies the parts of Able-Tach-Website that are licensed under the GNU General Public License v3.0 (GPL-3.0-only).

**Version choice:** The project's SPDX identifier is `GPL-3.0-only`. It means GNU GPL version 3 only; it does not offer the GPL version 3-or-later option.

**Public copyright attribution for original project-authored materials:** Aai (the creator's personal public pen name; not a separate legal entity).

**Website name:** Tianyuan Research Institute (田园研究所), which is the website name only.

## 1. GPL-3.0-only Covered Materials

Only the original program code in the specific files listed below is covered by GPL-3.0-only. File extensions or general categories of source code do not independently extend this license to other files.

The GPL-3.0-only-licensed program code currently identified in this repository is limited to the following original code:

- `generate_papers_manifest.py`;
- `generate_article_pages.py`;
- `.github/workflows/generate-papers-manifest.yml`;
- the original page structure and program hooks in `index.html`;
- the homepage stylesheet in `assets/css/homepage.css`;
- the reusable page template in `page-layouts/article-page.html`;
- the shared homepage and article-page JavaScript in `assets/js/article-page.js`;
- the three article-page stylesheets:
  - `assets/css/article-pages/time-matter-model.css`;
  - `assets/css/article-pages/olea-1-virus.css`;
  - `assets/css/article-pages/black-body-organism.css`;
- the original page-shell program code in these three generated article-page files:
  - `Papers and Achievements/《时间物质理论与演算宇宙模型》.html`;
  - `Papers and Achievements/《欧油一型病毒研究报告》.html`;
  - `Papers and Achievements/《黑体生物研究报告》.html`.

The listed generated HTML pages contain the reusable page shell and references to separately stored content. The listed source files carry SPDX copyright and GPL-3.0-only identifiers; those identifiers apply to the original program code within the scope described in this document and do not override exclusions for separately stored content or third-party materials. GPL-3.0-only applies to their original program code, not to article prose or other creative content loaded from separate files. The article fragments in `Papers and Achievements/article-content/` are not included in the GPL-3.0-only grant. The metadata files `Papers and Achievements/articles.json` and `Papers and Achievements/papers.json`, as well as the paired `.txt` listing descriptions, are data or display-content files and are not included in the GPL-3.0-only grant by this scope notice. The file extension alone does not determine the license. The workflow file covers the project's own workflow configuration and commands only; GitHub Actions referenced through `uses:` (including `actions/checkout` and `actions/setup-python`) remain third-party components subject to their respective licenses.

### Article-specific markup and reusable page code

The HTML files in `Papers and Achievements/article-content/` are article-content documents. Their HTML elements and attributes organize and present the individual article—for example, article headings and sections, paragraphs, lists, tables, figures, captions, image and link references, and fragment-level `id`, `class`, and `data-*` attributes. For this project's intended licensing scope, that article-specific markup is part of the corresponding article content package and is excluded from the GPL-3.0-only grant along with the article prose and other article-specific material. This statement does not claim that every HTML tag, attribute, short phrase, class name, or simple document arrangement is independently copyrightable.

Reusable page code serves a different role. The template in `page-layouts/article-page.html` provides the shared document shell, disclaimer gate, site header and navigation, content mounting point, and footer structure. The shared script in `assets/js/article-page.js` implements common behavior, including disclaimer handling, metadata and content retrieval, fragment validation, parsing, and insertion into the page. The listed Python generators create the published page shells and homepage manifest, while the listed stylesheets provide reusable presentation rules. These listed program-code components remain within the GPL-3.0-only scope described here. The site-wide visitor-facing wording is now stored in the separate `site-content/` files, and article titles and descriptions are sourced from the separate article metadata and listing-description files. Any independent visitor-facing wording that remains embedded in a listed program file is not granted under GPL merely because it appears in that file, to the extent such wording is protected by applicable law.

Article-fragment classes, IDs, and data attributes may act as hooks that the shared loader or GPL-3.0-only-licensed stylesheets recognize. Their presence in an article fragment does not, by itself, make the fragment reusable page code or express an intention to license the article content under GPL-3.0-only. Likewise, the browser's runtime insertion of an article fragment into the shared page shell does not, by itself, expand the project's stated GPL grant to that fragment. This is a statement of the project's intended licensing scope, not a definitive legal ruling on whether a particular combination of HTML, CSS, or other material forms a derivative or combined work under applicable law.

**Visitor-facing wording is distinct from the covered program code.** Most site-wide interface copy and the disclaimer are stored in `site-content/`, while article-specific prose and descriptions are stored in the article-content, metadata, and listing-description files identified above. They are not included in the GPL-3.0-only grant. If independent non-program wording is embedded in or emitted by a listed program file, the project's intended grant remains limited to the program code and does not separately license that wording, to the extent the wording is protected by applicable law. This clarification does not remove GPL coverage from the HTML structure, CSS rules, JavaScript, template logic, or generator logic expressly listed above.

This list defines the current scope. No other file or component is covered merely because it has a listed file extension, belongs to the same directory, or contains similar code. Only original program code that the project has the right to license, and that is not subject to a separate or third-party license, is covered. A future source file will be covered only after it is expressly added to this scope or carries a file-specific notice that clearly licenses the applicable original code under GPL-3.0-only.

## 2. Materials Not Included by Default

Unless an individual file or accompanying notice expressly states otherwise, the following are not included in the GPL-3.0-only grant:

- original articles, essays, research reports, and other written works;
- visitor-facing static content stored in `site-content/`, including the disclaimer fragment and interface-copy data;
- original illustrations, photographs, website backgrounds, cover images, and other visual assets;
- AI-generated images and other creative media;
- logos, icons, project identity materials, and branding;
- third-party fonts, libraries, icons, images, and other externally sourced materials;
- article metadata, generated publication-list data, and paired `.txt` descriptions, unless a separate notice expressly states otherwise;
- user-facing static editorial or interface text embedded in files listed as GPL-covered program code, to the extent such text is protected by applicable law.

For the intended permissions governing creative content, see [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md).

## 3. Individual File Notices and Third-Party Licenses

The current browser-facing site does not load externally hosted fonts, JavaScript libraries, CSS frameworks, or remote image assets. The GitHub Actions workflow references `actions/checkout@v4` and `actions/setup-python@v5`; their upstream projects identify them as MIT-licensed, and their respective upstream license texts and notices govern those dependencies. The source and rights status of local image assets are tracked separately in `ASSET-SOURCES.md`.

A specific file may carry its own license or permission notice. Third-party materials remain governed by their respective licenses and terms. If a file-specific notice or third-party license applies, consult that notice rather than assuming the general project rule applies. Nothing in this document overrides a license granted by a third-party rights holder.

## 4. Root LICENSE File

The root `LICENSE` file contains the full text of the GNU General Public License version 3 for materials within the scope described above, which are designated GPL-3.0-only. Its presence should not be interpreted as relicensing every repository file under GPL-3.0-only.

## 5. Contributions

Contributors should submit only material they have the right to contribute. Contributions intended to become part of GPL-covered source code should be clearly identified as such. Contributions of articles, images, or other creative content do not automatically become GPL-3.0-only merely because they are submitted to this repository; the applicable terms should be agreed and documented.

---

# 许可证适用范围

版权所有 © 2026 Aai。保留相关权利。本文件仅可为说明 GPL 授权程序代码的范围之目的，在分发该等程序代码时逐字、完整复制和分发。本许可不允许修改本文件或将其作为独立作品单独分发，也不对 GPL 授权代码增加任何条件。

**最后更新日期：** 2026年11月7日

本文档明确 Able-Tach-Website 中哪些内容采用 GNU GPL v3.0（GPL-3.0-only）授权。

**版本选择：** 本项目使用的 SPDX 标识符为 `GPL-3.0-only`，即仅采用 GNU GPL 第三版，不提供“第三版或任何后续版本”的选择。

**本项目原创材料的公开版权署名：** Aai（创作者本人使用的公开笔名，并非独立法人或组织）。

**网站名称：** 田园研究所（Tianyuan Research Institute），仅为网站名称。

## 一、GPL-3.0-only 授权范围

GPL-3.0-only 仅适用于下方逐项列出的文件中属于本项目原创的程序代码。文件扩展名或源代码类型本身，不会使其他文件自动纳入该许可证范围。

当前仓库明确纳入 GPL-3.0-only 授权范围的程序代码，仅限于以下文件中的本项目原创代码：

- `generate_papers_manifest.py`；
- `generate_article_pages.py`；
- `.github/workflows/generate-papers-manifest.yml`；
- `index.html` 中原创的页面结构与程序挂载标记；
- 首页样式表 `assets/css/homepage.css`；
- 可复用页面模板 `page-layouts/article-page.html`；
- 共享首页与文章页面 JavaScript `assets/js/article-page.js`；
- 以下三份文章页面样式表：
  - `assets/css/article-pages/time-matter-model.css`；
  - `assets/css/article-pages/olea-1-virus.css`；
  - `assets/css/article-pages/black-body-organism.css`；
- 以下三篇生成式文章页面文件中的原创页面外壳程序代码：
  - `Papers and Achievements/《时间物质理论与演算宇宙模型》.html`；
  - `Papers and Achievements/《欧油一型病毒研究报告》.html`；
  - `Papers and Achievements/《黑体生物研究报告》.html`。

上述生成的 HTML 页面包含可复用的页面外壳，以及指向独立存储文章内容的引用。列明的源文件带有 SPDX 版权及 GPL-3.0-only 标识；该标识仅适用于本文件所界定的原创程序代码，不覆盖另行存储的内容或第三方材料。GPL-3.0-only 仅适用于其中的原创程序代码，不适用于从独立文件加载的文章正文或其他创作性内容。`Papers and Achievements/article-content/` 目录中的文章内容片段不纳入 GPL-3.0-only 授权范围。`Papers and Achievements/articles.json`、`Papers and Achievements/papers.json` 以及用于首页列表展示的同名 `.txt` 简介文件，属于数据或展示内容文件，本范围说明不将其纳入 GPL-3.0-only。不能仅凭文件扩展名判断许可证。工作流文件仅覆盖项目自行编写的工作流配置和命令；通过 `uses:` 引用的 GitHub Actions（包括 `actions/checkout` 和 `actions/setup-python`）仍属于第三方组件，适用各自的许可证。

### 文章专属标记与可复用页面程序代码的区别

`Papers and Achievements/article-content/` 目录中的 HTML 文件属于文章内容文档。其 HTML 元素和属性用于组织、呈现各篇文章自身的内容，例如文章标题与章节、段落、列表、表格、插图、图片说明、图片及链接引用，以及 `id`、`class` 和 `data-*` 等片段级属性。按照本项目声明的授权意图，这些文章专属标记与文章正文及其他文章专属材料一并作为文章内容处理，不纳入 GPL-3.0-only 授权范围。本说明并不主张每个 HTML 标签、属性、短语、类名或简单文档编排都必然构成可独立享有版权的作品。

可复用页面程序代码承担的是不同职责。`page-layouts/article-page.html` 模板提供共享的文档外壳、免责声明阅读入口、网站页眉与导航、文章内容挂载位置以及页脚结构。`assets/js/article-page.js` 实现通用功能，包括免责声明确认、元数据和正文读取、内容片段校验、解析及插入页面。清单中列出的 Python 生成脚本负责生成发布页面外壳和首页成果清单，列出的样式表则提供可复用的呈现规则。上述列明的程序代码组件仍按本文件所述范围适用 GPL-3.0-only。网站范围内的界面文案与免责声明现已分别存放于 `site-content/` 文件中；文章标题、简介及正文则来自单独的文章元数据、简介和正文文件。若列明的程序文件中仍嵌有独立的、面向访问者展示的非程序性文字，不会仅因其出现在该文件中就将该文字授予 GPL 许可，但仅限于该文字受到适用法律保护的范围。

文章内容片段中的类名、ID 和数据属性，可能被共享加载器或采用 GPL-3.0-only 的样式表识别并用作连接标记。它们出现在文章片段中，并不因此使文章片段变成可复用页面程序代码，也不表示项目有意将文章内容采用 GPL-3.0-only 授权。同样，浏览器在运行时将文章片段插入共享页面外壳这一技术过程，本身并不扩大项目声明的 GPL 授权范围，使该文章片段自动纳入 GPL-3.0-only。本段说明的是项目拟定的授权范围，并非对特定 HTML、CSS 或其他材料组合是否构成适用法律下的衍生作品或组合著作作出最终法律认定。

**面向访问者展示的文字与授权程序代码相互区分。** 网站范围内的大部分界面文案及免责声明存放于 `site-content/`，文章正文、标题和简介分别存放于上文列明的文章正文、元数据及简介文件中，均不纳入 GPL-3.0-only 授权范围。若列明的程序文件中仍嵌入或输出独立的非程序性文字，项目拟定的授权范围仍仅限于程序代码，不会另外授予对该文字的 GPL 许可，但仅限于该文字受到适用法律保护的范围。本说明不影响同一文件中已明确列入 GPL 范围的 HTML 结构、CSS 规则、JavaScript、模板逻辑或生成器逻辑。

以上清单界定当前授权范围。其他文件不会仅因具有相同扩展名、位于同一目录或包含类似代码而自动纳入 GPL-3.0-only。只有项目有权授权、属于项目原创且不受其他单独声明或第三方许可证约束的程序代码，才纳入本范围。今后新增的源代码，只有在本范围说明中被明确列出，或在具体文件中通过清晰的单独声明明确将相关原创代码采用 GPL-3.0-only 授权后，才适用 GPL-3.0-only。

## 二、默认不纳入 GPL-3.0-only 的内容

除非具体文件或随附声明明确另行授权，以下内容不纳入 GPL-3.0-only 授权范围：

- 原创文章、随笔、研究报告及其他文字作品；
- 存储于 `site-content/` 的面向访问者展示的静态内容，包括免责声明片段和界面文案数据；
- 原创插画、照片、网站背景图、封面图及其他视觉素材；
- AI 生成图片及其他创作性媒体；
- Logo、图标、项目识别素材及品牌标识；
- 第三方字体、代码库、图标、图片及其他外部来源素材；
- 嵌入 GPL 授权代码文件、面向网站访问者展示的静态编辑性文字或界面文案；但仅在此类文字受适用法律保护的范围内。

有关创作性内容的具体授权意图，请参阅 [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md)。

## 三、单独文件声明与第三方许可证

当前网站前端没有加载外部托管字体、JavaScript 库、CSS 框架或远程图片资源。GitHub Actions 工作流引用了 `actions/checkout@v4` 和 `actions/setup-python@v5`；其上游项目声明采用 MIT 许可证，并分别适用上游许可证文本及声明。本地图片的来源及权利状态另见 `ASSET-SOURCES.md`。

具体文件可能附带独立的许可证或授权声明。第三方素材仍由其各自的许可证和使用条款约束。如果文件级声明或第三方许可证适用，应以相应声明为准，不应直接假定项目的一般规则适用于该文件。本文档不覆盖或取消第三方权利人已经授予的许可。

## 四、根目录 LICENSE 文件

根目录中的 `LICENSE` 文件提供 GNU GPL 第三版的完整文本，适用于上述明确界定并标注为 GPL-3.0-only 的授权范围。该文件的存在不应被理解为仓库中的所有文件均自动采用 GPL-3.0-only。

## 五、贡献

贡献者应仅提交其有权贡献的材料。对 GPL 授权源代码的贡献，应明确标识。文章、图片或其他创作性内容不会仅因被提交到本仓库就自动采用 GPL-3.0-only；相关授权条件应事先协商并记录。
