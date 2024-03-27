chrome.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message) {
  console.log("This is the offscreen document");
  if (message.target != "offscreen-doc") {
    return;
  }
  switch (message.type) {
    case "access-localstorage":
      await storelocalstorageitems(message);
      break;
    default:
      return;
  }
}

async function storelocalstorageitems(message) {
  //Inside this lies the logic of whether we got back new data from the web browser's local storage and we stored it here
  //I think what we can do is take the hash value of the new returned data
  //If the hash value is different from the previous one, this means that the data has changed and store the changed data
  chrome.runtime.sendMessage({
    type: "localstorage-access-result",
    updated: true,
    stored: "New data was stored",
  });
}
