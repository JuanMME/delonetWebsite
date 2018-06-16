import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClassService } from '../admin/class.service';
import { Class } from '../admin/models/class';

@Component({
  moduleId: module.id,
  templateUrl: 'class-registration.component.html',
  styleUrls: [
    'class-registration.component.scss'
  ]
})

export class ClassRegistrationComponent implements OnInit {

  classes: Class[];
  isLogged: boolean;
  loginModalRef: BsModalRef;
  classFilterSelected: number;

  constructor(
    private _classService: ClassService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    this._classService.getClasses().subscribe(classes => {
      this.classes = classes;
      console.log(classes);
    });
  }

  checkIsLogged() {
    if (localStorage.getItem('email')) {
      this.isLogged = true;
    }
  }

  newMember(classId: number, template: TemplateRef<any>) {
    if (this.isLogged) {

    } else {
      this.openLoginModal(template);
    }
  }

  openLoginModal(template: TemplateRef<any>) {
    this.loginModalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  filterClass(option: number) {
    this.classFilterSelected === option ? this.classFilterSelected = null : this.classFilterSelected = option;
  }

}
