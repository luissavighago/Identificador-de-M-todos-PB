console.log("Content is running");

// Frases a serem procuradas
const phrases = [
  "public function",
  "public subroutine",
  "private function",
  "private subroutine",
  "end function",
  "end subroutine"
];

// Classe CSS para destacar o texto
const highlightClass = 'ext-pb-highlighted-text';

// Estilo CSS para a classe de destaque
const style = document.createElement('style');
style.textContent = `
    .${highlightClass} {
        background-color: yellow;
        color: black;
        font-weight: bold;
    }
`;
document.head.append(style);

function highlightTextInDocument() {

  function highlightNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
          let content = node.textContent;
          phrases.forEach(phrase => {
              if (content.includes(phrase)) {
                  const highlightedContent = content.split(phrase).join(`<span class="${highlightClass}">${phrase}</span>`);
                  const tempElement = document.createElement('div');
                  tempElement.innerHTML = highlightedContent;

                  while (tempElement.firstChild) {
                      node.parentNode.insertBefore(tempElement.firstChild, node);
                  }
                  node.parentNode.removeChild(node);
              }
          });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(child => highlightNode(child));
      }
  }

  highlightNode(document.body);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let response = message.action == "LOAD" ? highlightTextInDocument() : {}
    sendResponse(response)
})
