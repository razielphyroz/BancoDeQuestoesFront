import { Injectable } from '@angular/core';
import { localStorageConst } from '../core/enums/configLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    return localStorage.getItem(localStorageConst.TOKEN);
  }

  setToken(token) {
    localStorage.setItem(localStorageConst.TOKEN, JSON.stringify(token));
  }
}
