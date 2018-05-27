import { Component, TemplateRef, OnInit } from '@angular/core';
import { MembersService } from './members.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'members.template.html'
})

export class MembersComponent implements OnInit {

  members;
  newMemberModal = true;
  submitted = false;
  modalRef;
  memberForm;

  constructor(
    private _membersService: MembersService,
    private modalService: BsModalService,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this._membersService.getMembers().subscribe(
      members => {
        this.members = members;
      }
    );
  }

  createMember() {
    console.log('hola');
    this._membersService.createMember(this.memberForm.value).subscribe(
      response => {
        console.log(response);
      },
      error => console.log(error)
    );
  }

  openNewMemberModal(template: TemplateRef<any>): void {
    this.submitted = false;
    this.newMemberModal = true;
    this.createForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  createForm() {
    this.memberForm = this.fb.group({
      nombre: [, [<any>Validators.required]],
      apellidos: [, [<any>Validators.required]],
      direccion: [, [<any>Validators.required]],
      fecha_alta: [new Date(), [<any>Validators.required]],
      fecha_baja: [new Date(), [<any>Validators.required]], // cambiar
      telefono: [, [<any>Validators.required]],
      email: [, [<any>Validators.required]],
    });
  }
}
