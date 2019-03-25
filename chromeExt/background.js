chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var data = JSON.stringify(tab.url);
        if (String(tab.url) != "undefined") {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:4201/user-data";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    });
  }); 

