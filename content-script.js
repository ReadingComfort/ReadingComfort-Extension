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

    case "fontFamily":
      const isHaveWebFontEmbeddingCode = document.head.querySelector("link[href='https://fonts.googleapis.com']") && document.head.querySelector("link[href='https://fonts.gstatic.com']");
      const isHaveTargetFontEmbeddingCode = !document.head.querySelector(`link[href='https://fonts.googleapis.com/css2?family=${request.data}:wght@400;500;700&display=swap']`);

      if (isHaveWebFontEmbeddingCode) {
        if (isHaveTargetFontEmbeddingCode) {
          document.head.insertAdjacentHTML("afterbegin", `<link href="https://fonts.googleapis.com/css2?family=${request.data}:wght@400;500;700&display=swap" rel="stylesheet" />`);
        }
      } else {
        document.head.insertAdjacentHTML(
          "afterbegin",
          `
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=${request.data}:wght@400;500;700&display=swap" rel="stylesheet" />
            `
        );
      }

      fontAction("fontFamily", `"${request.data}", sans-serif`);
      break;

    case "fontBold":
      fontAction("fontWeight", request.data ? "700" : "500");
      break;

    case "fontColor":
      fontAction("color", request.data);
      break;
  }
});
