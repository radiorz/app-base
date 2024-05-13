/**
 * @author
 * @file ParentChildManager.ts
 * @fileBase ParentChildManager
 * @path packages\client-core\device\ParentChildManager.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */
export interface Device {
  id: string;
}
export class ParentChildManager<Device> {
  parent: Device | null;
  children: Map<string, Device> = new Map();
  constructor(private store: DeviceStore) {}
  getChildren() {
    return [...this.children];
  }
  setChild(device: Device) {
    this.children.set(device.id, device);
  }
  removeChild(id: string) {
    const child = this.children.delete(id);
  }
  setParent(device: Device) {
    this.parent = device;
    // 提示设置父亲成功
  }
  removeFromParent() {}
}
