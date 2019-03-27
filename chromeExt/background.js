chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab){
       

        chrome.identity.getProfileUserInfo(function(info) { email = info.email });

        if (String(tab.url) != "undefined") {

        let data = {URL: tab.url, Title: tab.title, Email: email};
        
        var jsonData = JSON.stringify(data);
            
            var xhr = new XMLHttpRequest();
            var url = "http://localhost:4201/user-data";
            
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(jsonData);
        }
    });
  }); 



