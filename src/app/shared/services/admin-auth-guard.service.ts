import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class AdminAuthGuardService implements CanActivate {

    constructor(
      private router: Router,
      private toastrService: ToastrService
    ) {}

    canActivate() {
        if (localStorage.getItem('instructor_id')) {
            return true;
        } else {
            this.toastrService.error('Lo siento, no tiene permisos para acceder a esta parte de la web');
            this.router.navigate(['/']);
            return false;
        }
    }
}
