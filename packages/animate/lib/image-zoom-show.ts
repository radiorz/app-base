export function getImageZoomState(imageEl: HTMLElement) {
  const rect = imageEl.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}
export function imageZoom(imageEl: HTMLElement) {
  let first = getImageZoomState(imageEl);
  // toLast
  imageEl.style.position = "fixed";
  imageEl.onclick = () => {
    // f放大
  };
  let last = getImageZoomState(imageEl);

  const dis = {};
  function invert() {}
  function play() {}
  requestAnimationFrame(() => {});
}
