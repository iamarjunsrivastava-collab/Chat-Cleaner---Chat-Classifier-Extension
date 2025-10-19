document.getElementById("start").addEventListener("click", () => {
    chrome.storage.local.set({ isFiltering: true }, () => {
        console.log("Filtering enabled");
        document.getElementById("status").textContent = "Filtering: ON";
    });
});

document.getElementById("toggleFiltering").addEventListener("click", () => {
    chrome.storage.local.get("isFiltering", (data) => {
        const newFilteringStatus = !data.isFiltering;
        chrome.storage.local.set({ isFiltering: newFilteringStatus }, () => {
            console.log(newFilteringStatus ? "Filtering enabled" : "Filtering disabled");
            document.getElementById("status").textContent = newFilteringStatus ? "Filtering: ON" : "Filtering: OFF";
        });
    });
});

// Message detection logic
setInterval(() => {
    chrome.storage.local.get("isFiltering", (data) => {
        if (data.isFiltering) {
            // Your message detection and processing logic here
            const msg = "This is a sample message."; // Replace with actual message capture logic
            console.log("Captured message:", msg);

            // Add your filtering/processing logic here, e.g.:
            // - Check if the message is toxic
            // - Check if the message is a duplicate
        }
    });
}, 3000);
