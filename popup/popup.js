// dom
const $fontSizeSection = document.querySelector(".font-size-wrap");
const $fontSelectButton = document.querySelector(".font-select-button");
const $fontBoldCheckBox = document.getElementById("font-bold");
const $fontBoldToggleButton = document.querySelector(".toggle");
const $fontOptionsDropDown = document.querySelector(".font-options");
const $fontColors = document.querySelector(".font-colors");
const $backgroundColors = document.querySelector(".background-colors");
const FONT_SIZE_MAX = 64;
const FONT_SIZE_MIN = 10;

// content-script로 message 보내는 함수
const sendToContentScript = (title, data) => {
  // active tab에 대한 정보를 가져옵니다.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // content script에 메시지를 보내어 DOM 변경을 요청합니다.
    chrome.tabs.sendMessage(tabs[0].id, { title: title, data: data });
  });
};

const increaseFontSize = ($fontSizeSpan) => {
  $fontSizeSpan.textContent = 1 * $fontSizeSpan.textContent + 2;
};

const dicreaseFontSize = ($fontSizeSpan) => {
  $fontSizeSpan.textContent -= 2;
};

const fontSizeTextHandler = (e) => {
  const $fontSizeSpan = e.currentTarget.querySelector(".font-size");
  const $plusButton = e.currentTarget.querySelector(".plus");
  const $minusButton = e.currentTarget.querySelector(".minus");

  switch (e.target.className) {
    case "plus":
      increaseFontSize($fontSizeSpan);
      break;
    case "minus":
      dicreaseFontSize($fontSizeSpan);
      break;
  }

  $plusButton.disabled = $fontSizeSpan.textContent == FONT_SIZE_MAX;
  $minusButton.disabled = $fontSizeSpan.textContent == FONT_SIZE_MIN;
};

const fontDropDownClose = (e) => {
  $fontSelectButton.classList.remove("active");
};

const fontDropDownToggle = () => {
  $fontSelectButton.classList.toggle("active");
};

const assignFontOption = (e) => {
  if (e.target.type === "button") {
    $fontSelectButton.querySelector(".selected-font").textContent = e.target.textContent;
    fontDropDownClose();
  }
};

const colorHandler = (e) => {
  if (e.target.classList.contains("custom")) {
    e.currentTarget.querySelector("input[type='color']").click();
  }
};

const keyboardItemClick = (e, item) => {
  if (e.key === " " || e.key === "Enter") {
    item.click();
  }
};

$fontSelectButton.addEventListener("click", fontDropDownToggle);
$fontSizeSection.addEventListener("click", fontSizeTextHandler);
$fontOptionsDropDown.addEventListener("click", assignFontOption);
$fontColors.addEventListener("click", (e) => colorHandler(e));
$backgroundColors.addEventListener("click", (e) => colorHandler(e));
$fontBoldToggleButton.addEventListener("keydown", (e) => keyboardItemClick(e, $fontBoldCheckBox));
