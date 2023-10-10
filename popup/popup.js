// dom
const $fontSizeSection = document.querySelector(".font-size-wrap");
const $fontSelectButton = document.querySelector(".font-select-button");
const $fontBoldCheckBox = document.getElementById("font-bold");
const $fontBoldToggleButton = document.querySelector(".toggle");
const $fontOptionsDropDown = document.querySelector(".font-options");
const $fontColors = document.querySelector(".font-colors");
const $backgroundColors = document.querySelector(".background-colors");
const FONT_SIZE_MAX = 64;
const FONT_SIZE_MIN = 14;

// content-script로 message 보내는 함수
const sendToContentScript = (title, data) => {
  // active tab에 대한 정보를 가져옵니다.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // content script에 메시지를 보내어 DOM 변경을 요청합니다.
    chrome.tabs.sendMessage(tabs[0].id, { title: title, data: data });
  });
};

// 폰트 사이즈 조정 함수
const adjustFontSize = ($fontSizeSpan, adjustment) => {
  let newFontSize = Number($fontSizeSpan.textContent) + Number(adjustment);

  if (newFontSize >= FONT_SIZE_MIN && newFontSize <= FONT_SIZE_MAX) {
    $fontSizeSpan.textContent = newFontSize;
    sendToContentScript("fontSize", newFontSize);
  }
};

// fontSize 조절 관련 기능 함수
const fontSizeHandler = (e) => {
  const isPlusBtnClicked = e.target.classList.contains("plus");
  const isMinusBtnClicked = e.target.classList.contains("minus");
  if (!isPlusBtnClicked && !isMinusBtnClicked) return;

  const $plusButton = e.currentTarget.querySelector(".plus");
  const $minusButton = e.currentTarget.querySelector(".minus");
  const $fontSizeSpan = e.currentTarget.querySelector(".font-size");
  const adjustmentValue = isPlusBtnClicked ? 2 : -2;

  adjustFontSize($fontSizeSpan, adjustmentValue);

  $plusButton.disabled = $fontSizeSpan.textContent == FONT_SIZE_MAX;
  $minusButton.disabled = $fontSizeSpan.textContent == FONT_SIZE_MIN;
};

// 폰트 드롭다운 메뉴 닫기
const fontDropDownClose = (e) => {
  $fontSelectButton.classList.remove("active");
};

// 폰트 드롭다운 메뉴 토글
const fontDropDownToggle = () => {
  $fontSelectButton.classList.toggle("active");
};

// 폰트 종류 설정
const assignFontOption = (e) => {
  console.log(e.currentTarget);
  if (e.target.type === "button") {
    $fontSelectButton.querySelector(".selected-font").textContent = e.target.textContent;
    sendToContentScript("fontFamily", e.target.value);
    fontDropDownClose();
  }
};

// 폰트 굵기 토글
const toggleBoldFont = (e) => {
  sendToContentScript("fontBold", e.target.checked);
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

$fontSizeSection.addEventListener("click", fontSizeHandler);
$fontSelectButton.addEventListener("click", fontDropDownToggle);
$fontOptionsDropDown.addEventListener("click", assignFontOption);
$fontBoldCheckBox.addEventListener("click", toggleBoldFont);
$fontBoldToggleButton.addEventListener("keydown", (e) => keyboardItemClick(e, $fontBoldCheckBox));
$fontColors.addEventListener("click", (e) => colorHandler(e));
$backgroundColors.addEventListener("click", (e) => colorHandler(e));
