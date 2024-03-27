function iterate(sendmessage)
{
  var arr = [];
  Object.keys(localStorage).forEach(function (key) {
    const regex = /fp\.0\.\d+\.meta/g;
    const matches = key.match(regex);
    if (matches!=null) {
      const value=localStorage.getItem(key);
      const extractregex = /meta(.*)/;
      const substring = key.match(extractregex);
      let temp = substring[1];
      let temparr = temp.split(".");
      arr.push([temparr[1],JSON.parse(value)]);
    }
  });
  console.log("This is the array containing keys for metadata", arr);
  sendmessage(arr);
}


function sendmessage(arr)
{
  chrome.runtime.sendMessage({
    type: "content-script",
    data: JSON.stringify(arr),
  });
}

iterate(sendmessage);

if (!window.hasOwnProperty('contentscriptexecuted'))
{
  window.contentscriptexecuted = true; 
  window.addEventListener("message", (event) => {
  if (event.source !== window) {
    return;
  }
  if (event.data.type && (event.data.type === "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    //Now is the time to iterate through the localstorage and send the message to the background js
    iterate(sendmessage)
  }
  }, false);
}
