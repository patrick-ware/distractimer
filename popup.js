// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
  }

// Checking to see if button is responsive
let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
  document.getElementById("didYouClickIt").innerHTML = "you clicked it dawg"
})

// demo timer
let sec = document.getElementById("minutes").value*60

let timer = setInterval(function(){
    let displayMinutes = Math.floor(sec/60);
    let displaySeconds = sec%60;
    let remainingTime= displayMinutes.toString() +":"+ displaySeconds.toString();
    document.getElementById('timeLeft').innerHTML= remainingTime
    sec--;
    if (sec < 0) {
        clearInterval(timer);
    }
}, 1000);