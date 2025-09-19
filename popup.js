function newBlockedDomainElement(domain) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const removeButton = document.createElement('button');
  p.textContent = domain;
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', async () => {
    document.getElementById('blockedDomainList').removeChild(li);
    deleteBlockedDomainFromStorage(domain);
  });
  li.appendChild(p);
  li.appendChild(removeButton);
  document.getElementById('blockedDomainList').appendChild(li);
};

async function deleteBlockedDomainFromStorage(domain) {
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;
  const { blockedDomains = [] } = await storage.local.get('blockedDomains');
  const index = blockedDomains.indexOf(domain);
  if (index !== -1) {
    blockedDomains.splice(index, 1);
    await storage.local.set({ blockedDomains });
  }
}

async function addBlockedDomainToStorage(domain) {
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;
  const { blockedDomains = [] } = await storage.local.get('blockedDomains');
  blockedDomains.push(domain);
  await storage.local.set({ blockedDomains });
}

(async function () {
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;
  const { blockedDomains = [] } = await storage.local.get('blockedDomains');

  blockedDomains.forEach(domain => newBlockedDomainElement(domain));

  document.getElementById('addDomainBtn').addEventListener('click', async () => {
    const domain = document.getElementById('addDomainInput').value.trim();
    newBlockedDomainElement(domain);
    addBlockedDomainToStorage(domain);
    document.getElementById('addDomainInput').value = '';
  });
})();
