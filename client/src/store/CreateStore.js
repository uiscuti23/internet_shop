import { makeAutoObservable } from 'mobx';

export default class CreateStore {
  constructor() {
    this._objName = '';
    this._objName1 = '';
    this._objName2 = '';
    this._fileName = '';
    this._file = null;
    this._imgSrc = null;
    this._isInputDisabled = false;
    this._isSuccessActive = false;
    this._isResetBtnShow = false;
    this._isResetBtnShow1 = false;
    this._isResetBtnShow2 = false;
    this._isCheckValue = false;
    this._isError = false;
    this._objPriceVal = null;

    makeAutoObservable(this);
  }

  setObjName(name) {
    this._objName = name;
  }
  setObjName1(name) {
    this._objName1 = name;
  }
  setObjName2(name) {
    this._objName2 = name;
  }
  setIsResetBtnShow(bool) {
    this._isResetBtnShow = bool;
  }
  setIsResetBtnShow1(bool) {
    this._isResetBtnShow1 = bool;
  }
  setIsResetBtnShow2(bool) {
    this._isResetBtnShow2 = bool;
  }
  setFileName(name) {
    this._fileName = name;
  }
  setFile(objOrNull) {
    this._file = objOrNull;
  }
  setImgSrc(pathOrNull) {
    this._imgSrc = pathOrNull;
  }
  setIsInputDisabled(bool) {
    this._isInputDisabled = bool;
  }
  setIsSuccessActive(bool) {
    this._isSuccessActive = bool;
  }
  setIsCheckValue(bool) {
    this._isCheckValue = bool;
  }
  setIsError(bool) {
    this._isError = bool;
  }
  get objName() {
    return this._objName;
  }
  get fileName() {
    return this._fileName;
  }
  get file() {
    return this._file;
  }
  get imgSrc() {
    return this._imgSrc;
  }
  get isInputDisabled() {
    return this._isInputDisabled;
  }
  get isSuccessActive() {
    return this._isSuccessActive;
  }
  get isResetBtnShow() {
    return this._isResetBtnShow;
  }
  get isCheckValue() {
    return this._isCheckValue;
  }
  get isError() {
    return this._isError;
  }
}
