let isFiltering = false;
let intervalId = null;

document.getElementById("start").addEventListener("click", () => {
  if (!isFiltering) {
    startFiltering();
  }
});

document.getElementById("toggle").addEventListener("click", () => {
  isFiltering ? stopFiltering() : startFiltering();
});

function startFiltering() {
  isFiltering = true;
  document.getElementById("status").textContent = "Filtering: ON";
  logMessage("Filtering started...");

  intervalId = setInterval(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const messages = document.querySelectorAll('.chat-message');
        return messages.length ? messages[messages.length - 1].innerText : null;
      }
    }, (results) => {
      const lastMsg = results[0].result;
      if (lastMsg) {
        logMessage("Captured message: " + lastMsg);

        chrome.runtime.sendMessage({ action: 'sendMessage', message: lastMsg }, (response) => {
          if (response && response.success) {
            logMessage("Filtered: " + (response.data.cleaned || "N/A"));
          } else {
            logMessage("Error: " + (response?.error || "No response"));
          }
        });
      }
    });
  }, 3000);
}

function stopFiltering() {
  isFiltering = false;
  clearInterval(intervalId);
  document.getElementById("status").textContent = "Filtering: OFF";
  logMessage("Filtering stopped.");
}

function logMessage(text) {
  const logDiv = document.getElementById("log");
  const line = document.createElement("div");
  line.textContent = text;
  logDiv.appendChild(line);
  logDiv.scrollTop = logDiv.scrollHeight;
}
