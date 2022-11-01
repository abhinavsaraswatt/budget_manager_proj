$(function () {
  chrome.storage.sync.get("limit", function (budget) {
    $("#limit").val(budget.limit);
  });
  $("#saveLimit").click(function () {
    var inputLimit = $("#limit").val();
    if (inputLimit) {
      chrome.storage.sync.set({ limit: inputLimit }, function () {
        close(); // Means when user stores the value, then close the tab automatically
      });
    }
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      var notifOptions = {
        type: "basic",
        iconUrl: "india.png",
        title: "Total Reset",
        message: "Total has been reset to 0",
      };
      chrome.notifications.create("resetNotif", notifOptions);
    });
  });
});
