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
  memberId: string;
  modalRef: BsModalRef;
  classFilterSelected: number;
  clickedClass: Class;

  constructor(
    private _classService: ClassService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('member_id')) {
      this.memberId = localStorage.getItem('member_id');
    }
    this._classService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  newMember(classId: number, loginTemplate: TemplateRef<any>, registrationTemplate: TemplateRef<any>) {
    if (this.memberId) {
      this.openRegistrationModal(registrationTemplate, classId);
    } else {
      this.openLoginModal(loginTemplate);
    }
  }

  registerNewMember(classId: number) {
    this._classService.registerMember(classId, this.memberId).subscribe(response => {
      console.log(response);
    });
  }

  openLoginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  openRegistrationModal(template: TemplateRef<any>, classId: number) {
    this._classService.getClass(classId).subscribe(classItem => {
      this.clickedClass = classItem;
      console.log(classItem);
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  filterClass(option: number) {
    this.classFilterSelected === option ? this.classFilterSelected = null : this.classFilterSelected = option;
  }

}
