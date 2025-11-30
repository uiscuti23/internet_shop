import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
  constructor() {
    this._devices = [];
    this._isLoading = true;
    makeAutoObservable(this);
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setIsLoading(bool) {
    this._isLoading = bool;
  }

  get devices() {
    return this._devices;
  }
  get isLoading() {
    return this._isLoading;
  }
}
