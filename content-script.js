const fontAction = (key, value) => {
  const fontElements = ["p", "span", "strong", "b", "a", "h1", "h2", "h3", "h4", "h5", "h6", "li", "code", "div"];

  fontElements.map((element) => {
    document.querySelectorAll(element).forEach((v) => {
      v.style[key] = value;
    });
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // 원하는 변화 적용
  switch (request.title) {
    case "fontSize":
      fontAction("fontSize", request.data + "px");
      break;
  }
});
