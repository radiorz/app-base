/**
 *
 我想要做一个marquee也就是跑马灯特效 
文字可以从上到下 从左到右 或者从右到左 或者从下到上移动
溢出的部分需要隐藏
水平移动 text就 不能换行
请用 FLIP 原则给我写以下的文本
使用ts 原生编写
 * @param el 
 */
export function marquee(el: HTMLElement) {
  // 首先获取元素的初始状态
  const initialStyle = window.getComputedStyle(el);
  const initialLeft = parseFloat(initialStyle.left);
  const finalLeft = -el.scrollWidth + el.offsetWidth; // 假设从右到左移动
  
  // 动画持续时间
  const duration = 5000; // 5秒

  // 动画开始时的回调
  function animate(currentTime: number) {
    if (currentTime === 0) {
      el.style.left = `${initialLeft}px`; // 确保开始时元素位置正确
    }

    // 计算当前时间与开始时间的差值
    const elapsedTime = currentTime - startTime;

    // 根据FLIP原则，计算当前位置
    const currentLeft =
      initialLeft + (finalLeft - initialLeft) * (elapsedTime / duration);

    // 设置元素的当前位置
    el.style.left = `${currentLeft}px`;

    // 判断动画是否结束
    if (elapsedTime < duration) {
      requestAnimationFrame(animate);
    } else {
      // 动画结束，重置位置，实现循环效果
      el.style.left = `${finalLeft}px`;
      requestAnimationFrame(animate); // 重新开始动画
    }
  }

  // 记录动画开始的时间
  let startTime = 0;

  // 开始动画
  requestAnimationFrame((timestamp) => {
    startTime = timestamp;
    animate(timestamp);
  });
}
