/* SPDX-FileCopyrightText: 2026 Aai
 * SPDX-License-Identifier: GPL-3.0-only
 * See LICENSE and LICENSE-SCOPE.md for the exact project scope.
 */
(function () {
  'use strict';

  const DISCLAIMER_VERSION = '2026-11-07';
  const ACK_STORAGE_KEY = 'tianyuan-disclaimer-acknowledgment';
  const CONTENT_ROOT = document.body.dataset.copyRoot || '../site-content/';

  function readPath(source, path) {
    return path.split('.').reduce((value, key) => value && value[key], source);
  }

  function applyCopy(copy) {
    document.querySelectorAll('[data-copy]').forEach((element) => {
      const value = readPath(copy, element.dataset.copy);
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-copy-aria-label]').forEach((element) => {
      const value = readPath(copy, element.dataset.copyAriaLabel);
      if (typeof value === 'string') element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-copy-alt]').forEach((element) => {
      const value = readPath(copy, element.dataset.copyAlt);
      if (typeof value === 'string') element.setAttribute('alt', value);
    });
  }

  async function loadSharedContent() {
    const contentRootUrl = new URL(CONTENT_ROOT, document.baseURI);
    const copyResponse = await fetch(new URL('site-copy.json', contentRootUrl), { cache: 'no-store' });
    if (!copyResponse.ok) throw new Error('Site copy request failed: HTTP ' + copyResponse.status);
    const copy = await copyResponse.json();
    applyCopy(copy);

    const disclaimerResponse = await fetch(new URL('disclaimer.html', contentRootUrl), { cache: 'no-store' });
    if (!disclaimerResponse.ok) throw new Error('Disclaimer request failed: HTTP ' + disclaimerResponse.status);
    const parsed = new DOMParser().parseFromString(await disclaimerResponse.text(), 'text/html');
    if (parsed.querySelector('script, style, iframe, object, embed, link, meta, base, form')) {
      throw new Error('Disclaimer content contains a forbidden element.');
    }
    for (const node of [parsed.body, ...parsed.body.querySelectorAll('*')]) {
      for (const attribute of Array.from(node.attributes || [])) {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim();
        if (name.startsWith('on')) throw new Error('Disclaimer contains an inline event handler.');
        if (['href', 'src', 'xlink:href', 'formaction'].includes(name) && /^javascript\s*:/i.test(value)) {
          throw new Error('Disclaimer contains a JavaScript URL.');
        }
      }
    }
    const mount = document.getElementById('disclaimer-copy');
    if (!mount) throw new Error('Disclaimer content mount is missing.');
    mount.replaceChildren(...Array.from(parsed.body.childNodes).map((node) => document.importNode(node, true)));

    if (!document.title.trim()) document.title = copy.site.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && !description.content.trim()) description.content = copy.site.description;
    return copy;
  }

  function scrollToHashTarget() {
    if (!window.location.hash) return;
    let targetId = window.location.hash.slice(1);
    try {
      targetId = decodeURIComponent(targetId);
    } catch (_) {
      // Keep the literal fragment when it is not valid percent-encoding.
    }
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ block: 'start' });
  }

  function unlockSite(gate, site) {
    if (gate) gate.remove();
    if (site) site.removeAttribute('inert');
    document.body.classList.remove('disclaimer-gate-active');
    if (window.location.hash) requestAnimationFrame(scrollToHashTarget);
  }

  function focusArticleHeading() {
    const heading = document.getElementById('page-title');
    if (heading && !document.body.classList.contains('disclaimer-gate-active')) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  function initializeDisclaimerGate(copy) {
    const gate = document.getElementById('disclaimer-gate');
    const site = document.getElementById('site-content');
    const readingArea = document.getElementById('disclaimer-scroll');
    const confirmation = document.getElementById('disclaimer-confirm');
    const enterButton = document.getElementById('disclaimer-enter');
    const status = document.getElementById('disclaimer-status');
    if (!gate || !site || !readingArea || !confirmation || !enterButton || !status) return;

    try {
      const saved = JSON.parse(localStorage.getItem(ACK_STORAGE_KEY) || 'null');
      if (saved && saved.version === DISCLAIMER_VERSION) {
        unlockSite(gate, site);
        return;
      }
    } catch (_) {
      // Keep the reading gate active when browser storage is unavailable.
    }

    let reachedEnd = false;
    function updateProgress() {
      const atEnd = readingArea.scrollTop + readingArea.clientHeight >= readingArea.scrollHeight - 4;
      if (atEnd && !reachedEnd) {
        reachedEnd = true;
        confirmation.disabled = false;
        status.textContent = copy.messages.disclaimerReachedEnd;
      }
      enterButton.disabled = !(reachedEnd && confirmation.checked);
    }
    readingArea.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    confirmation.addEventListener('change', function () {
      enterButton.disabled = !(reachedEnd && confirmation.checked);
      status.textContent = confirmation.checked
        ? copy.messages.disclaimerAccepted : copy.messages.disclaimerUnchecked;
    });
    enterButton.addEventListener('click', function () {
      if (!reachedEnd || !confirmation.checked) return;
      try {
        localStorage.setItem(ACK_STORAGE_KEY, JSON.stringify({
          version: DISCLAIMER_VERSION,
          acceptedAt: new Date().toISOString()
        }));
      } catch (_) {
        // The site can still be unlocked when browser storage is unavailable.
      }
      unlockSite(gate, site);
      focusArticleHeading();
    });
    updateProgress();
  }

  function validateArticleFragment(parsedDocument, articleRoot) {
    if (!articleRoot || parsedDocument.querySelectorAll('article.article').length !== 1) {
      throw new Error('Article content must contain exactly one article.article root.');
    }
    if (parsedDocument.querySelector('script, style, iframe, object, embed, link, meta, base, form')) {
      throw new Error('Article content contains a forbidden program or embedding element.');
    }
    const nodes = [articleRoot, ...articleRoot.querySelectorAll('*')];
    for (const node of nodes) {
      for (const attribute of Array.from(node.attributes)) {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim();
        if (name.startsWith('on')) throw new Error('Article content contains an inline event handler.');
        if (['href', 'src', 'xlink:href', 'formaction'].includes(name) && /^javascript\s*:/i.test(value)) {
          throw new Error('Article content contains a JavaScript URL.');
        }
      }
    }
  }

  async function loadArticleContent(copy) {
    const mount = document.getElementById('article-content');
    if (!mount) return;
    try {
      const manifestUrl = new URL(mount.dataset.articleManifest || 'articles.json', document.baseURI);
      const manifestResponse = await fetch(manifestUrl.href, { cache: 'no-store' });
      if (!manifestResponse.ok) throw new Error('Article metadata request failed: HTTP ' + manifestResponse.status);
      const manifest = await manifestResponse.json();
      const articles = manifest && Array.isArray(manifest.articles) ? manifest.articles : [];
      const article = articles.find((item) => item && item.id === mount.dataset.articleId);
      if (!article) throw new Error('The current page is missing from the article manifest.');

      if (typeof article.title === 'string' && article.title.trim()) document.title = article.title;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta && typeof article.description === 'string') descriptionMeta.content = article.description;
      const natureMeta = document.querySelector('meta[name="content-nature"]');
      if (natureMeta) natureMeta.content = ['fictional', 'hypothetical', 'reference', 'research'].includes(article.contentNature)
        ? article.contentNature : 'fictional';

      const contentUrl = new URL(article.contentFile || mount.dataset.articleSrc, manifestUrl);
      const allowedContentPath = new URL('article-content/', manifestUrl).pathname;
      if (contentUrl.origin !== manifestUrl.origin || !contentUrl.pathname.startsWith(allowedContentPath)) {
        throw new Error('Article content path is outside the permitted directory.');
      }
      const contentResponse = await fetch(contentUrl.href, { cache: 'no-store' });
      if (!contentResponse.ok) throw new Error('Article content request failed: HTTP ' + contentResponse.status);
      const parsed = new DOMParser().parseFromString(await contentResponse.text(), 'text/html');
      const articleRoot = parsed.querySelector('article.article');
      validateArticleFragment(parsed, articleRoot);
      mount.replaceWith(document.importNode(articleRoot, true));
      focusArticleHeading();
      if (window.location.hash && !document.body.classList.contains('disclaimer-gate-active')) {
        requestAnimationFrame(scrollToHashTarget);
      }
    } catch (error) {
      mount.classList.add('article-load-error');
      mount.textContent = copy ? copy.messages.articleLoadError : '';
      console.error('Article content loading failed:', error);
    }
  }

  async function initializePublicationList(copy) {
    const mainList = document.getElementById('paper-list');
    const allList = document.getElementById('paper-list-all');
    const moreButton = document.getElementById('papers-more');
    const modal = document.getElementById('papers-modal');
    const closeButton = document.getElementById('papers-close');
    if (!mainList || !allList || !moreButton || !modal || !closeButton) return;

    const messages = copy.messages;
    const folderUrl = new URL('Papers%20and%20Achievements/', document.baseURI);
    const manifestUrl = new URL('papers.json', folderUrl);
    const collator = new Intl.Collator('zh-CN', { numeric: true, sensitivity: 'base' });

    function normalizeNature(value) {
      return Object.prototype.hasOwnProperty.call(copy.natureLabels, value) ? value : 'fictional';
    }
    function validHtmlFilename(value) {
      return typeof value === 'string' && value.length > 5 &&
        !/[\\/]/.test(value) && value !== '.' && value !== '..' &&
        /\.html$/i.test(value) && value.toLowerCase() !== 'index.html';
    }
    async function readManifest() {
      try {
        const response = await fetch(manifestUrl.href, { cache: 'no-store' });
        if (!response.ok) return [];
        const data = await response.json();
        const raw = Array.isArray(data) ? data : (Array.isArray(data.files) ? data.files : []);
        return raw.map((item) => {
          const filename = typeof item === 'string' ? item : item && (item.file || item.html);
          if (!validHtmlFilename(filename)) return null;
          return {
            filename,
            contentNature: normalizeNature(item && typeof item === 'object' ? item.contentNature : 'fictional')
          };
        }).filter(Boolean).sort((a, b) => collator.compare(a.filename, b.filename));
      } catch (_) {
        return [];
      }
    }
    async function loadEntry(entry) {
      const filename = entry.filename;
      const htmlUrl = new URL(encodeURIComponent(filename), folderUrl).href;
      const txtFilename = filename.replace(/\.html$/i, '.txt');
      let description = '';
      try {
        const response = await fetch(new URL(encodeURIComponent(txtFilename), folderUrl).href, { cache: 'no-store' });
        if (response.ok) description = (await response.text()).trim();
        else description = messages.paperTxtMissing.replace('{filename}', txtFilename);
      } catch (_) {
        description = messages.paperTxtReadError.replace('{filename}', txtFilename);
      }
      if (!description) description = messages.paperTxtEmpty;
      return { filename, htmlUrl, description, contentNature: normalizeNature(entry.contentNature) };
    }
    function makeRow(entry) {
      const li = document.createElement('li');
      const title = document.createElement('p');
      title.className = 'paper-title';
      const link = document.createElement('a');
      link.href = entry.htmlUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const displayName = entry.filename.replace(/\.html$/i, '');
      link.textContent = displayName;
      link.setAttribute('aria-label', messages.paperOpenAria + displayName);
      title.appendChild(link);
      const nature = document.createElement('span');
      nature.className = 'paper-nature paper-nature--' + entry.contentNature;
      nature.textContent = copy.natureLabels[entry.contentNature];
      title.appendChild(nature);
      const detail = document.createElement('p');
      detail.className = 'paper-detail';
      detail.textContent = entry.description;
      li.append(title, detail);
      return li;
    }
    function renderList(list, entries) {
      list.replaceChildren();
      if (!entries.length) {
        const li = document.createElement('li');
        li.className = 'paper-empty';
        li.textContent = messages.paperListEmpty;
        list.appendChild(li);
        return;
      }
      entries.forEach((entry) => list.appendChild(makeRow(entry)));
    }

    const entries = await readManifest();
    const loaded = await Promise.all(entries.map(loadEntry));
    renderList(mainList, loaded.slice(0, 3));
    renderList(allList, loaded);

    let previousOverflow = '';
    function openModal() {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      modal.hidden = false;
      closeButton.focus();
    }
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = previousOverflow;
      moreButton.focus();
    }
    moreButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function (event) {
      if (event.target.matches('[data-close-papers]')) closeModal();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  function showSharedContentError() {
    const message = '网站必要内容加载失败，暂时无法进入。请确认通过网站服务器访问并刷新页面；如果问题持续，请联系网站维护者。';
    const gate = document.getElementById('disclaimer-gate');
    const site = document.getElementById('site-content');
    const readingArea = document.getElementById('disclaimer-scroll');
    const status = document.getElementById('disclaimer-status');
    const confirmation = document.getElementById('disclaimer-confirm');
    const enterButton = document.getElementById('disclaimer-enter');

    if (gate) gate.hidden = false;
    if (site) site.setAttribute('inert', '');
    document.body.classList.add('disclaimer-gate-active');
    if (readingArea) readingArea.textContent = message;
    if (status) status.textContent = '加载失败；网站内容已保持锁定。';
    if (confirmation) {
      confirmation.checked = false;
      confirmation.disabled = true;
    }
    if (enterButton) enterButton.disabled = true;
  }

  function getLicenseLoadError(copy) {
    const message = copy && copy.licensePage && copy.licensePage.loadError;
    return typeof message === 'string' && message.trim()
      ? message
      : '原始许可文件暂时无法读取。可使用本页的原始文件链接直接打开或下载。';
  }

  async function initializeLicenseReader(copy) {
    const panels = Array.from(document.querySelectorAll('[data-license-source]'));
    if (!panels.length) return;

    const sourceFiles = {
      gpl: 'LICENSE',
      scope: 'LICENSE-SCOPE.md',
      content: 'CONTENT-LICENSE.md'
    };

    await Promise.all(panels.map(async (panel) => {
      const file = sourceFiles[panel.dataset.licenseSource];
      if (!file) {
        panel.textContent = getLicenseLoadError(copy);
        panel.classList.add('license-source-text--error');
        return;
      }

      try {
        const response = await fetch(new URL(file, document.baseURI).href, { cache: 'no-store' });
        if (!response.ok) throw new Error('License source request failed: HTTP ' + response.status);
        panel.textContent = await response.text();
      } catch (error) {
        panel.textContent = getLicenseLoadError(copy);
        panel.classList.add('license-source-text--error');
        console.error('License source loading failed:', file, error);
      }
    }));
  }

  async function startLicensePage() {
    let copy = null;
    try {
      const contentRootUrl = new URL(CONTENT_ROOT, document.baseURI);
      const response = await fetch(new URL('site-copy.json', contentRootUrl), { cache: 'no-store' });
      if (!response.ok) throw new Error('Site copy request failed: HTTP ' + response.status);
      copy = await response.json();
      applyCopy(copy);
      const licenseCopy = copy && copy.licensePage;
      const description = document.querySelector('meta[name="description"]');
      if (!document.title.trim() && licenseCopy && typeof licenseCopy.documentTitle === 'string') {
        document.title = licenseCopy.documentTitle;
      }
      if (description && !description.content.trim() && licenseCopy && typeof licenseCopy.description === 'string') {
        description.content = licenseCopy.description;
      }
    } catch (error) {
      console.error('License page copy could not be initialized; original license documents will remain available:', error);
    }
    await initializeLicenseReader(copy);
    if (window.location.hash) requestAnimationFrame(scrollToHashTarget);
  }

  async function start() {
    if (document.body.dataset.page === 'license') {
      await startLicensePage();
      return;
    }

    let copy = null;
    try {
      copy = await loadSharedContent();
      initializeDisclaimerGate(copy);
    } catch (error) {
      showSharedContentError();
      console.error('Shared page content could not be initialized:', error);
    }
    if (copy) {
      await loadArticleContent(copy);
      initializePublicationList(copy).catch((error) => console.error('Publication list initialization failed:', error));
    }
  }

  start();
})();
