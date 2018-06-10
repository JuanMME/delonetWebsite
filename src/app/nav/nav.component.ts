import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: [
    'nav.component.scss'
  ]
})

export class NavbarComponent {

  isAdmin = false;
  isLogged = false;
  isCollapsed = true;

  onLogin(isLogged: boolean) {
    this.isLogged = isLogged;
  }

  onAdminLogin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }
}
