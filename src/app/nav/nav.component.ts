import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: [
    'nav.component.scss'
  ]
})

export class NavbarComponent {

  isAdmin: boolean;
  isLogged: boolean;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  onLogin(isLogged: boolean) {
    this.isLogged = isLogged;
    this.cdr.detectChanges();
  }

  onAdminLogin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.cdr.detectChanges();
  }

}
