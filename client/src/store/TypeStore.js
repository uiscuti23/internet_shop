import { makeAutoObservable } from 'mobx';

export default class TypeStore {
  constructor() {
    this._types = [];
    this._selectedType = {};
    this._isLoading = true;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setType(type) {
    this._types = [...this._types, type];
  }
  setSelectedType(type) {
    this._selectedType = type;
  }
  setIsLoading(bool) {
    this._isLoading = bool;
  }
  get types() {
    return this._types;
  }
  get selectedType() {
    return this._selectedType;
  }
  get isLoading() {
    return this._isLoading;
  }
}
