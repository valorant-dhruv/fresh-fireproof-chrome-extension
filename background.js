async function setupOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["LOCAL_STORAGE"],
    justification: "Monitor the Local storage",
  });
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function executecontentscript(value) {
  console.log("The execute content script function has been called");
  let currenttab = await getCurrentTab();
  if (currenttab == undefined) {
    return;
  }
  if (currenttab.url.startsWith("chrome://")) {
    return;
  }
  console.log("This is the current tab", currenttab);
  if (!value) {
    chrome.scripting.executeScript({
      target: { tabId: currenttab.id },
      files: ["content-script.js"],
    });
  } else {
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: currenttab.id },
        files: ["content-script.js"],
      });
    }, 5000);
  }
}

chrome.runtime.onMessage.addListener(async (message) => {
  console.log(message.type);
  if (message.type == "content-script") {
    console.log("Data received from content script", message.data);
    await setupOffscreenDocument();
    await chrome.runtime.sendMessage({
      type: "access-localstorage",
      target: "offscreen-doc",
    });
    executecontentscript(true);
  } else if (message.type == "localstorage-access-result") {
    console.log("This is the data that was stored", message.stored);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  executecontentscript(false);
});

executecontentscript(false);
