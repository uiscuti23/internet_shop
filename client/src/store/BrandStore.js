import { makeAutoObservable } from 'mobx';

export default class BrandStore {
  constructor() {
    this._brands = [];
    this._selectedBrand = {};
    this._isLoading = true;
    makeAutoObservable(this);
  }

  setBrands(brands) {
    this._brands = brands;
  }
  setBrand(brand) {
    this._brands = [...this._brands, brand];
  }
  setSelectedBrand(brands) {
    this._selectedBrand = brands;
  }
  setIsLoading(bool) {
    this._isLoading = bool;
  }
  get brands() {
    return this._brands;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get isLoading() {
    return this._isLoading;
  }
}
