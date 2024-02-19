
/**
 * 简单的
 * @deprecated Use {@link ahook useRequest} instead.
 */
export function useData({ url, method = "GET" }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    // 即使成功也忽略
    let ignore = false;
    // 取消
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {
      method,
      signal: signal, // <------ This is our AbortSignal
    })
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      // 控制取消
      controller.abort();
      ignore = true;
    };
  }, [url]);
  return data;
}
