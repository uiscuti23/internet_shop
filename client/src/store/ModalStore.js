import { makeAutoObservable } from 'mobx';

export default class ModalStore {
  constructor() {
    this._isDelay = false;
    this._isClose = false;
    makeAutoObservable(this);
  }
  setIsDelay(bool) {
    this._isDelay = bool;
  }
  setIsClose(bool) {
    this._isClose = bool;
  }
  get isDelay() {
    return this._isDelay;
  }
  get isClose() {
    return this._isClose;
  }
}
