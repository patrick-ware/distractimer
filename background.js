// example code
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const testTime = '525,600 minutes'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === 'get-user-data') {
    sendResponse(testTime);
  }
});

// //from documentation
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   if (message) {
//     let timer = setInterval(function(){
//       let displayMinutes = Math.floor(sec/60);
//       // set seconds to always display two digits
//       let displaySeconds = sec%60
//       displaySeconds +=""
//       if(displaySeconds.length == 1 || displaySeconds==9) {
//         displaySeconds = "0" + displaySeconds;
//       }
//       let remainingTime= displayMinutes.toString() +":"+displaySeconds.toString();
//       sec--;
//       if (sec < 0) {
//           clearInterval(timer);
//       }
//   }, 1000);
//     sendResponse(remainingTime);
//   }
// });