document.addEventListener("DOMContentLoaded", () => {
    const notionApiKeyInput = document.getElementById("notionApiKey");
    const notionDatabaseIdInput = document.getElementById("notionDatabaseId");
    const saveSettingsButton = document.getElementById("saveSettings");

    // 讀取已儲存的 API Key & Database ID
    chrome.storage.local.get(["notionApiKey", "notionDatabaseId"], (data) => {
        if (data.notionApiKey) notionApiKeyInput.value = data.notionApiKey;
        if (data.notionDatabaseId) notionDatabaseIdInput.value = data.notionDatabaseId;
    });

    // 按下「儲存設定」按鈕時存入 storage
    saveSettingsButton.addEventListener("click", () => {
        chrome.storage.local.set({
            notionApiKey: notionApiKeyInput.value,
            notionDatabaseId: notionDatabaseIdInput.value
        }, () => {
            alert("設定已儲存！");
        });
    });
});
