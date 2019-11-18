import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAutenticated = false;
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router
  ) { }

  login(userForm: FormGroup) {
    if (userForm.value.email === 'admin@admin.com' && userForm.value.password === '123123') {
      this.userAutenticated = true;
      this.showMenuEmitter.emit(true);
      this.router.navigate(['/pesquisa-questao']);
      console.log('Logado com sucesso');
    }
  }

}
