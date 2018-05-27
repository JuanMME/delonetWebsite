import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: [
    'nav.component.scss'
  ]
})

export class NavbarComponent {

  navItems: any[] = [
    { routerLink: '', label: 'Home', active: false },
    { routerLink: '/reservas', label: 'Reservas', active: false },
    { routerLink: '/clases', label: 'Clases', active: false },
    { routerLink: '/admin', label: 'Administración', active: false },
    { routerLink: '/contacto', label: 'Contacto', active: false }
  ];

}
