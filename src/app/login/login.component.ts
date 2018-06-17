import { Component, TemplateRef, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.scss'
  ]
})

export class LoginComponent implements OnInit {
  @Output() isLogged = new EventEmitter<boolean>();
  @Output() isAdmin = new EventEmitter<boolean>();

  modalRef: BsModalRef;
  loginForm: FormGroup;
  userName: string;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit() {
    if (localStorage.getItem('user_name')) {
      this.userName = localStorage.getItem('user_name');
      this.isLogged.emit(true);
    }
    if (localStorage.getItem('instructor_id')) {
      this.isAdmin.emit(true);
    }
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [<any>Validators.required, <any>Validators.email]],
      password: ['', [<any>Validators.required]]
    });
  }

  openLoginModal(template: TemplateRef<any>) {
    this.loginForm.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  login() {
    if (this.loginForm.value) {
      this._loginService.login(this.loginForm.value).subscribe(
        response => {
          if (response.email) {
            this.createSession(response);
            this.modalRef.hide();
            this.loginForm.reset();
            this.router.navigate(['/login']);
          } else if (response.message === 'Usuario no encontrado') {
            this.toastr.error('Usuario no encontrado');
          } else if (response.message === 'Contraseña incorrecta') {
            this.toastr.error('Contraseña incorrecta');
          }
        }
      );
    }
  }

  createSession(loginResponse) {
    localStorage.clear();
    this.isLogged.emit(true);
    if (loginResponse.id_socio) {
      localStorage.setItem('member_id', loginResponse.id_socio);
      this.isAdmin.emit(false);
    } else if (loginResponse.id_monitor) {
      localStorage.setItem('instructor_id', loginResponse.id_monitor);
      this.isAdmin.emit(true);
    }
    localStorage.setItem('user_name', loginResponse.nombre);
    localStorage.setItem('user_email', loginResponse.email);
    localStorage.setItem('profile_image', loginResponse.profile_image);
    this.userName = loginResponse.nombre;
    this.toastr.success(`Bienvenido/a ${this.userName}`);
  }

  logout() {
    localStorage.clear();
    this.userName = null;
    this.isLogged.emit(false);
    this.isAdmin.emit(false);
    this.toastr.success('Sesión cerrada con éxito');
    this.router.navigate(['/logout']);
  }
}
