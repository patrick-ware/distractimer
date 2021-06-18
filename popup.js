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
////////////////////////////////////////////////////////////////////////////////////////////

// Initialize button with user's preferred color
let submitButton = document.getElementById("submit");

// When the button is clicked, inject setPageBackgroundColor into current page
submitButton.addEventListener("click", () => {
  document.getElementById("didYouClickIt").innerHTML = "you clicked it dawg"
})

// demo timer
let sec = 30;
let timer = setInterval(function(){
    document.getElementById('timeLeft').innerHTML='00:'+sec;
    sec--;
    if (sec < 0) {
        clearInterval(timer);
    }
}, 1000);