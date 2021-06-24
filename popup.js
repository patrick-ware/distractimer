// Call this when the pop-up is shown
chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
  if (response.time) {
    const time = new Date(response.time);
    startTimer(time)
  }
});

// Start timer
function startTimer(time) {
  if (time.getTime() > Date.now()) {
    setInterval(() => {
      // Find the distance between now and the count down date
      let distance = time.getTime() - new Date().getTime();
      
      // Time calculations for minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      let remainingTime = minutes.toString() + ":" + seconds.toString();

      document.getElementById('timeLeft').innerHTML = remainingTime
    }, 1000)
  }
}

// Add minutes
function addMinutes() {
  let minutes = document.getElementById("minutes").value
  document.getElementById('didYouClickIt').innerHTML = new Date(Date.now() + minutes*60000);
  return new Date(Date.now() + minutes*60000);
}

// Send message to background.js
function startTime(time) {
  chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: time });
  startTimer(time);
}

// Event listener for when button is clicked
submitButton.addEventListener("click", () => {
  startTime(addMinutes())
  // document.getElementById("didYouClickIt").innerHTML = "you clicked it dawg"
})

///////////////////////////////////////////////// COLOR CHANGE ////////////////////////////////////////////////
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