import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClassService } from '../admin/class.service';
import { Class } from '../admin/models/class';
import { MembersService } from '../admin/members.service';
import { Member } from '../admin/models/member';
import { ToastrService } from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'class-registration.component.html',
  styleUrls: [
    'class-registration.component.scss'
  ]
})

export class ClassRegistrationComponent implements OnInit {

  classes: Class[];
  memberId: number;
  modalRef: BsModalRef;
  classFilterSelected: number;
  clickedClass: Class;
  member: Member;
  clase: Class;

  constructor(
    private _classService: ClassService,
    private _membersService: MembersService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('member_id')) {
      this.memberId = parseInt(localStorage.getItem('member_id'), 10);
      this.getMember();
    }
    this.getClasses();
  }

  getClasses() {
    this._classService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  getMember() {
    this._membersService.getMember(this.memberId).subscribe(member => {
      this.member = member;
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
    this._classService.getClass(classId).subscribe(clase => {
      this.clase = clase;
      if (this.clase.num_plazas > this.clase.plazas_ocupadas) {
        this.member.id_clase = this.clase.id_clase;
        this._membersService.modifyMember(this.member.id_socio, this.member).subscribe(response => {
          this.toastr.success('Se ha inscrito en la clase con éxito.');
          this.getClasses();
        });
      } else {
        this.toastr.error('La clase ya está completa.');
      }
      this.modalRef.hide();
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
