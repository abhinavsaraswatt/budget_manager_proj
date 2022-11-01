$(function () {
  // display existing amount if present, everytime we clicks on extension icon.
  // here this budget is displaying context of storage used by our budget_manager extension !!!!!!!!!!!!!!!IMPORTANT
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    $("#total").text(budget.total);
    $("#limit").text(budget.limit);
  });

  // we can use multiple items at once by using array like this => ['total', 'limit']
  //   chrome.storage.sync.get("limit", function (budget) {
  //     $("#limit").text(budget.limit);
  //   });

  $("#spendAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      var newTotal = 0;

      // checking if there is existing amount present, if present then considering it for results
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      var amount = $("#amount").val();
      if (amount) {
        // Adding entered amount to exisiting amount
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
          var notifOptions = {
            type: "basic",
            iconUrl: "india.png",
            title: "Limit reached!",
            message: "Uh oh! Looks like you've reached your limit!",
          };
          chrome.notifications.create("limitNotif", notifOptions);
        }
      });

      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});
