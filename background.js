chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("chat.openai.com")) {
        console.log(`🔍 偵測到 ChatGPT 頁面，嘗試注入 content.js (Tab ID: ${tabId})`);

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        }).then(() => {
            console.log("✅ 強制注入 content.js 成功！");
        }).catch(err => {
            console.error("❌ 強制注入 content.js 失敗：", err);
        });
    }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveToNotion") {
        chrome.storage.local.get(["notionApiKey", "notionDatabaseId"], (data) => {
            if (!data.notionApiKey || !data.notionDatabaseId) {
                sendResponse({ success: false, message: "請先設定 API Key 和 Database ID" });
                return;
            }

            fetch("https://api.notion.com/v1/pages", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${data.notionApiKey}`,
                    "Content-Type": "application/json",
                    "Notion-Version": "2022-06-28"
                },
                body: JSON.stringify({
                    parent: { database_id: data.notionDatabaseId },
                    properties: {
                        title: {
                            title: [{ text: { content: "ChatGPT Response" } }]
                        }
                    },
                    children: [
                        {
                            object: "block",
                            type: "paragraph",
                            paragraph: { rich_text: [{ text: { content: request.content } }] }
                        }
                    ]
                })
            })
            .then(response => response.json())
            .then(result => sendResponse({ success: true, message: "已成功儲存到 Notion" }))
            .catch(error => sendResponse({ success: false, message: "儲存失敗：" + error }));

            return true; // 讓 sendResponse 可用於非同步操作
        });
    }
});
