var arr = [];

Object.keys(localStorage).forEach(function (key) {
  if (key.includes("fp.0.16.meta.")) {
    let temp = key.slice(13);
    let temparr = temp.split(".");
    arr.push(temparr[0]);
  }
});

console.log("This is the array containing keys for metadata", arr);

(() => {
  chrome.runtime.sendMessage({
    type: "content-script",
    data: window.localStorage,
  });
})();
