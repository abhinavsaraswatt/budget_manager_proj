var contextMenuItem = {
  id: "spendMoney",
  title: "SpendMoney",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
  // This function is for checking that is inputted data is integer
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  // in below if statement we are checking that, did we clicked on right option or our extension option
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(["total", "limit"], function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal >= budget.limit) {
            var notifOptions = {
              type: "basic",
              iconUrl: "india.png",
              title: "Limit reached!",
              message: "Uh oh! Looks like you've reached your limit!",
            };
            chrome.notifications.create("limitNotif", notifOptions);
          }
        });
      });
    }
  }
});

// Adding badge of total amount to our extension
chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
