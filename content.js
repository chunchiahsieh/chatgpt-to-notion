function createSaveButton() {
    console.log("創建儲存按鈕");

    // 找到 ChatGPT 的按鈕列
    let buttonBar = document.querySelector(".flex.items-center.rounded.bg-token-sidebar-surface-primary");

    if (!buttonBar) {
        console.error("❌ 找不到 ChatGPT 的按鈕列！");
        return;
    }

    // 檢查是否已經有按鈕，避免重複添加
    if (document.getElementById("saveToNotionButton")) {
        console.log("⚠️ 按鈕已經存在，跳過創建");
        return;
    }

    // 創建按鈕
    let button = document.createElement("button");
    button.id = "saveToNotionButton";
    button.innerText = "儲存到 Notion";
    button.style.position = "relative";
    button.style.zIndex = "1000";
    button.style.padding = "8px 12px";
    button.style.marginLeft = "10px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    // 插入按鈕
    buttonBar.appendChild(button);
    console.log("✅ 按鈕成功插入按鈕列！");
}

function monitorDOMChanges() {
    console.log("🔄 監測 DOM 變更...");
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            console.log("👀 偵測到變更，嘗試添加按鈕");
            createSaveButton();
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

createSaveButton();
monitorDOMChanges();
