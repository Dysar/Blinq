chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    document.getElementById("myText").innerHTML = url;
    chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:"png"}, function (image) { 
        document.getElementById("image").innerHTML = image;
    });
});


// window.onload=function(){document.getElementById("myForm").addEventListener("submit", funcSubmit, false);  //Modern browsers
// }

// function funcSubmit() {
//   var usr = document.getElementById("myUsername").value;
//   var pwd = document.getElementById("myPassword").value;
//   alert(usr + pwd);
// }