import { Component, TemplateRef, OnInit } from '@angular/core';
import { MembersService } from './members.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MembersDialogComponent } from '../../components/members-dialog/members-dialog.component';
import { Member } from '../../models/member';
import { ToastrService } from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.scss']
})

export class MembersComponent implements OnInit {

  private members: Member[];
  private bsModalRef: BsModalRef;

  constructor(
    private _membersService: MembersService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

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

  addMember(): void {
    const initialState = {
      member: null,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(MembersDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getMembers();
    });
  }

  editMember(member: Member) {
    const initialState = {
      member: member,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(MembersDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.member = member;
    this.modalService.onHide.subscribe(data => {
      this.getMembers();
    });
  }

  deleteMember(member: Member) {
    this._membersService.deleteMember(member.id_socio).subscribe(data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('Operación realizada con éxito', 'El socio ha sido eliminado');
        this.getMembers();
      } else {
        this.toastr.error('Algo ha fallado en la operación', 'Inténtelo más tarde');
      }
    });
  }

}
