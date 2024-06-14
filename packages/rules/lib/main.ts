// 统一管理的表单规则
export const checkEmpty =
  (tips = "此处不为空") =>
  (v: any) =>
    !!v || tips;

// 电话号码...
export const checkPhone =
  (tips = "电话号码格式不正确") =>
  (v: any) =>
    /^(?:(?:\+|00)86)?1\d{10}$/.test(v) || tips;

// 整数
export const checkInteger =
  (tips = "请填整数") =>
  (v: any) =>
    Number.isInteger(v * 1) || tips;

export const checkPositiveInteger =
  (tips = "请输入正整数(1到正无穷)") =>
  (v: any) =>
    (Number.isInteger(v * 1) && v * 1 > 0) || tips;

// -1 以上
export const checkBiggerThanMinusOne =
  (tips = "请输入符合规范的数") =>
  (v: any) =>
    v * 1 >= -1 || tips;

// 自然数 0 1 ...
export const checkNativeNumber =
  (tips = "请输入自然数(>=0)") =>
  (v: any) =>
    /^[0-9]*$/.test(v) || tips;

// 激活码
export const checkActivationCode =
  (tips = "请输入正确格式的激活码") =>
  (v: any) =>
    /^[A-Z0-9]{10}$/.test(v) || tips;

// 设备序列号
export const checkDeviceId = () => [
  (v: any) => !!v || "请输入设备序列号",
  (v: any) => /^[a-zA-Z0-9]*$/.test(v) || "请输入正确格式的设备序列号",
];
