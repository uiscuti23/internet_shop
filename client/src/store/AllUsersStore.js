import { makeAutoObservable } from 'mobx';

export default class AllUsersStore {
  constructor() {
    this._allUsers = [];
    this._isLoading = true;
    makeAutoObservable(this);
  }
  setAllUsers(array) {
    this._allUsers = array;
  }
  setIsLoading(bool) {
    this._isLoading = bool;
  }
  get allUsers() {
    return this._allUsers;
  }
  get isLoading() {
    return this._isLoading;
  }
}
