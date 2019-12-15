import { Injectable } from '@angular/core';
import { localStorageConst } from '../core/enums/configLocalStorage';
import { UserType } from '../core/enums/user-type';
import { SUBJECTS } from '../core/enums/subjects';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getUser() {
    return JSON.parse(localStorage.getItem(localStorageConst.USER));
  }

  setUser(user) {
    localStorage.setItem(localStorageConst.USER, JSON.stringify(user));
  }

  getUserId() {
    return String(this.getUser().id);
  }

  getUserSubject() {
    return this.getUser().subjectId;
  }

  isDocent() : boolean {
    return this.getUser().permissions.includes(UserType.DOCENT) ? true : false;
  }

  isValidator() : boolean {
    return this.getUser().permissions.includes(UserType.VALIDATOR) ? true : false;
  }

  isAdmin() : boolean {
    return this.getUser().permissions.includes(UserType.ADMIN) ? true : false;
  }

  isLogged() {
    return !! this.getUser()
  }

  constructor() { }
}
