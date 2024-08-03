import { reactive, effect } from "@vue/reactivity";

const config = reactive({
  // 在这里定义您的config对象的属性和初始值
  a: 123,
});

effect(() => {
  // 在这里处理属性变化时的逻辑
  console.log(`newValue`, config);
});
config.a = 1111;
