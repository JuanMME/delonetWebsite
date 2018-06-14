import { Directive, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
    selector: '[appMenuClose]'
})
export class CloseMenuDirective implements OnInit {
    @Input()
    public menu: any;

    constructor(
      private router: Router
    ) {}

    ngOnInit() {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
        this.menu.classList.remove('show');
      });
    }
}
