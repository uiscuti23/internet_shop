import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  constructor() {
    this._appIsLocked = false;
    this._location = '/';
    this._isHaveScroll = false;
    makeAutoObservable(this);
  }
  setAppIsLocked(bool) {
    this._appIsLocked = bool;
  }
  setLocation(str) {
    this._location = str;
  }
  setIsHaveScroll(bool) {
    this._isHaveScroll = bool;
  }
  get appIsLocked() {
    return this._appIsLocked;
  }
  get location() {
    return this._location;
  }
  get isHaveScroll() {
    return this._isHaveScroll;
  }
}
