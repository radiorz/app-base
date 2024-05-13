/**
 * @author
 * @file Device.ts
 * @fileBase Device
 * @path packages\client-core\device\Device\Device.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { OnDestroy } from "../interfaces/OnDestroy";
import { OnInit } from "../interfaces/OnInit";

export class Device implements OnInit, OnDestroy {
  public id: string;
  init() {}
  destroy() {}
  onServiceReady() {}
  run() {}
  onError() {}
}
