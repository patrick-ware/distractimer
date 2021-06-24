// example code
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const testTime = '525,600 minutes'

//from documentation
let timerID;
let timerTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'START_TIMER') {
    timerTime = new Date(request.when);
    timerID = setTimeout(() => {
       // the time is app, alert the user.
    }, timerTime.getTime() - Date.now());
  } else if (request.cmd === 'GET_TIME') {
    sendResponse({ time: timerTime });
  }
});