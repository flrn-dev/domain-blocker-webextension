(async function () {
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;
  const { blockedDomains = [] } = await storage.local.get('blockedDomains');
  const sucherergebnisseQuerySelector = 'div#search h1 + div div[data-rpos]:has(a > h3)';
  const hypertextlinkInSucherergebnisQuerySelector = 'div#search h1 + div div[data-rpos] a:has(> h3)';

  const getAllSucherergebnisse = () => [...document.querySelectorAll(sucherergebnisseQuerySelector)]
  const isSucherergebnisBlocked = (sucherergebnis) => {
    const url = new URL(sucherergebnis.querySelector(hypertextlinkInSucherergebnisQuerySelector).href);
    return blockedDomains.some(domain => url.hostname.endsWith(domain));
  };
  const renderSucherergebnis = (sucherergebnis) => sucherergebnis.style.display = 'none';

  getAllSucherergebnisse().filter(isSucherergebnisBlocked).forEach(renderSucherergebnis);
})();
