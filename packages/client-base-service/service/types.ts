export interface IService {
  on: (eventName) => {};
  once: (eventName, listener) => void;
  off: (eventName, listener) => void;
  offAll: (eventName) => void;
}
