//Whenever the devtools is open we create a panel
chrome.devtools.panels.create("Fireproof Storage",
    "fireproof.png",
    "panel.html",
    function(panel) {
      // code invoked on panel creation
      console.log('The panel has been added to devtools')
    }
);

chrome.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message) {
  console.log("This is the devtools page");
  if (message.target != "devtools") {
    return;
  }
  switch (message.type) {
    case "populate-data":
      await changedevtools(message);
      break;
    default:
      return;
  }
}

async function changedevtools(message)
{
  //Now we add the details to the panel
  console.log('The devtools has received the content from background')

}