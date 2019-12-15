import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'BancoDeQuestoesFront';
  showHeader = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.authService.showMenuEmitter.subscribe(
      show => this.showHeader = show
    );
  }
}
