# vue2-marquee

使用 css 动画写的一个简单的 marquee 显示

## 使用
### 直接引入umd格式并从全局变量获取使用
```html
<div id="root">
  <div id="father" :style="fatherStyle" :key="key">
    <span id="children" v-marquee="scrollOptions">{{text}}</span>
  </div>
</div>
<script src="../../dist/marquee.umd.cjs"></script>
<script>
  Vue.use(window.Marquee.marqueePlugin);
  new Vue({
    el: "#root",
    name: "the-app",
    data() {
      return {
        text: "123456789",
        key: 0,
        scrollOptions: {
          scrollDirection: "left",
          scrollSpeed: 10,
        },
        fatherStyle: {
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
        },
      };
    },
  });
</script>
```
