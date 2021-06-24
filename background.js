// example code
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

//from documentation
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

// timer code moved over from popup
let sec = document.getElementById("minutes").value*60

let timer = setInterval(function(){
    let displayMinutes = Math.floor(sec/60);
    // set seconds to always display two digits
    let displaySeconds = sec%60
    displaySeconds +=""
    if(displaySeconds.length == 1 || displaySeconds==9) {
      displaySeconds = "0" + displaySeconds;
    }
    let remainingTime= displayMinutes.toString() +":"+displaySeconds.toString();
    document.getElementById('timeLeft').innerHTML= remainingTime
    sec--;
    if (sec < 0) {
        clearInterval(timer);
    }
}, 1000);