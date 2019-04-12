chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid

    //can use chrome.tabs.getCurrent(function callback)
    chrome.tabs.get(activeInfo.tabId, function(tab){

        chrome.identity.getProfileUserInfo(function(info) { this.email = info.email });

        if (String(tab.url) != "undefined") {
        

        let screenShot = chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:"png"}, function (image) {
            //alert(image);
            return image; //the image variable is a base64 encoded image which you should be able to load in either canvas or src attribute of an image.
        });

        var ts = Math.round((new Date()).getTime() / 1000);

        let data = {URL: tab.url, Title: tab.title, Email: this.email, Time: ts, ScreenShot: screenShot};
        
        var jsonData = JSON.stringify(data);
            
            var xhr = new XMLHttpRequest();
            const url = "http://localhost:4200/api/MonitoringData";
            //const url = "http://localhost:4201/user-data";
            
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(jsonData);
        }
    });
  }); 



