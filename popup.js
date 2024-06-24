

document.getElementById("btn-execute").onclick = (event) =>{
  chrome.tabs.query({active:true,currentWindow:true},async (tabs) => {
    var tab = tabs[0];
    await chrome.tabs.sendMessage(tab.id,{action: "LOAD"},(response) => {
      console.log(response)
    })
  });
}