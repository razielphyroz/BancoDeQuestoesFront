import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { User } from '../core/models/user.model';
import { SUBJECTS } from '../core/enums/subjects';
import { UserType } from '../core/enums/user-type';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAutenticated = false;
  showMenuEmitter = new EventEmitter<boolean>();

  users: User[] = [
    {
      id: "8396",
      email: "matematica@professor.com",
      password: "123123",
      permissions: [UserType.DOCENT],
      subjectId: SUBJECTS.MATEMATICA
    },
    {
      id: "2347",
      email: "matematica@validador.com",
      password: "123123",
      permissions: [UserType.VALIDATOR],
      subjectId: SUBJECTS.MATEMATICA
    },
    {
      id: "4331",
      email: "biologia@professor.com",
      password: "123123",
      permissions: [UserType.DOCENT],
      subjectId: SUBJECTS.BIOLOGIA
    },
    {
      id: "3532",
      email: "biologia@validador.com",
      password: "123123",
      permissions: [UserType.VALIDATOR],
      subjectId: SUBJECTS.BIOLOGIA
    },
  ]

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  async login(userForm: FormGroup) {
 
    const { email, password } = userForm.value;

    for (const user of this.users) {
      if (email == user.email && password == user.password) {
        localStorage.clear();
        this.userAutenticated = true;
        this.showMenuEmitter.emit(true);
        this.userService.setUser(user);
        this.router.navigate(['/home']);
        return;
      }
    }

    this.toastr.error("Invalid Email or Password.");

    /*
    const loginObj = {
      'username': email,
      'password': password
    }
  
    await this.http.post(`${environment.URI_API}/sessions`, loginObj).pipe(
      take(1)
    ).subscribe(
      res => {
        localStorage.clear();
        this.userAutenticated = true;
        this.showMenuEmitter.emit(true);
        this.tokenService.setToken(res['token']);
        this.userService.setUser(res['user']);
        this.router.navigate(['/home']);
        console.log('Logado com sucesso');
      },
      err => console.error('Deu Ruim...', err)
    );
    */
  }

  logout() {
    this.userAutenticated = false;
    this.showMenuEmitter.emit(false);
    this.router.navigate(['/login']);
    localStorage.clear();
    console.log('Deslogado com sucesso');
  }

  isUserAuthenticated() {
    return this.userAutenticated;
  }
}
