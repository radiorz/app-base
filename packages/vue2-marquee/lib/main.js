import "./index.css";
export var SCROLL_DIRECTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};
// TODO 
// 这里取的父节点，不是一种很好的做法，最好是自己生children比较合适


export async function marquee(el, settings = {}) {
  try {
    
    Vue.nextTick(() => {
      // 子节点
      var parent = el.parentNode; // 父节点
      var resets = []; // 重置属性
      var { scrollDirection, scrollSpeed, auto = true } = settings;
      // ******* 自动设置默认值
      if (auto) {
        scrollDirection = scrollDirection || SCROLL_DIRECTIONS.left;
        scrollSpeed = scrollSpeed || 10;
      }
      // ******* 排除一些不滚动的情况
      var noNeedToScroll =
        !scrollDirection || !SCROLL_DIRECTIONS[scrollDirection] || !scrollSpeed;
      if (noNeedToScroll) {
        // 需要重置一些属性
        el.classList.remove("marquee-content");
        el.style.right = "0px";
        el.style.bottom = "0px";
        return;
      }

      var isHorizontal = [
        SCROLL_DIRECTIONS.left,
        SCROLL_DIRECTIONS.right,
      ].includes(scrollDirection); // 水平滚动
      var isVertical = !isHorizontal; // 垂直
      // ******* 滚动前配置相关的类
      if (!parent.classList.contains("overflow-hidden")) {
        resets.push(() => {
          parent.classList.remove("overflow-hidden");
        });
        // 修改必须的样式
        parent.classList.add("overflow-hidden");
      }
      // 设置高度让其无法撑开(上下移动的情况)
      if (isVertical) {
        var oldParentHeight = parent.style.height;
        var parentHeight =
          (parent.style.lineHeight || 1) *
          parent.style.fontSize.replace("px", "");
        if (parentHeight) {
          // 当高度比实际小的时候不重新设置(保持原本的高度即可)
          if (!oldParentHeight || parentHeight >= oldParentHeight) {
            resets.push(() => {
              parent.style.height = oldParentHeight;
            });
            parent.style.height = parentHeight
              ? addPx(parentHeight)
              : undefined;
          }
        }
      }

      if (isHorizontal) {
        console.log(
          `!el.classList.contains('whitespace-nowrap')`,
          !el.classList.contains("whitespace-nowrap")
        );
        // 水平应该不折行显示
        if (!el.classList.contains("whitespace-nowrap")) {
          resets.push(() => {
            el.classList.remove("whitespace-nowrap");
          });
          el.classList.add("whitespace-nowrap");
          console.log(`el.classList`, el.classList);
        }
      } else if (isVertical) {
        // 垂直滚动应该折行显示
        if (el.classList.contains("whitespace-nowrap")) {
          // 这个用于解除
          resets.push(() => {
            el.classList.add("whitespace-nowrap");
          });
          el.classList.remove("whitespace-nowrap");
        }
        if (!el.classList.contains("whitespace-normal")) {
          resets.push(() => {
            el.classList.remove("whitespace-normal");
          });
          el.classList.add("whitespace-normal");
        }
        if (!el.classList.contains("break-all")) {
          resets.push(() => {
            el.classList.remove("break-all");
          });
          el.classList.add("break-all");
        }
      }

      var { offsetHeight: parentOffsetHeight, offsetWidth: parentOffsetWidth } =
        parent;
      // ****** 向右向下滚动需要从末开始滚动,需要移动位置
      if (
        [SCROLL_DIRECTIONS.right, SCROLL_DIRECTIONS.down].includes(
          scrollDirection
        )
      ) {
        const oldPosition = el.style.position;
        resets.push(() => {
          el.style.position = oldPosition;
        });
        el.style.position = "relative";
      } else {
        el.style.position = "static";
      }
      // 向下应该从末尾开始滚动 所以要 right
      if (SCROLL_DIRECTIONS.right === scrollDirection) {
        const oldRight = el.style.right;
        resets.push(() => {
          el.style.right = oldRight;
        });
        el.style.right = addPx(el.offsetWidth - parent.offsetWidth);
      } else {
        // 这里不知道为啥 delete 不起作用，只能手动设置默认值代替了...
        el.style.right = "0px";
      }
      // 向下应该从末尾开始滚动 所以要bottom
      if (SCROLL_DIRECTIONS.down === scrollDirection) {
        const oldBottom = el.style.bottom;
        resets.push(() => {
          el.style.bottom = oldBottom;
        });
        el.style.bottom = addPx(el.offsetHeight - parent.offsetHeight);
      } else {
        // 这里不知道为啥 delete 不起作用，只能手动设置默认值代替了...
        el.style.bottom = "0px";
      }

      // 自动判断
      // 如果足够宽度或高度就不设置了
      if (isHorizontal && parentOffsetWidth >= el.offsetWidth) {
        resets.forEach((resetFunc) => resetFunc());
        return;
      }
      if (isVertical && parentOffsetHeight >= el.offsetHeight) {
        resets.forEach((resetFunc) => resetFunc());
        return;
      }

      // 时间 * 速度 = 距离
      var distance = isHorizontal ? el.offsetWidth : el.offsetHeight;
      el.classList.add("marquee-content");
      el.style.animationDuration = distance / scrollSpeed + "s";
      el.style.animationName = "marquee" + "-" + scrollDirection;
    });
  } catch (error) {
    console.warn(`设置marquee出错`, error);
  }
}

export function marqueePlugin(Vue) {
  Vue.directive("marquee", marquee);
}
