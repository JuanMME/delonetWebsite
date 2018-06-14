import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../members.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MembersDialogComponent } from '../../components/members-dialog/members-dialog.component';
import { Member } from '../../models/member';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  moduleId: module.id,
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.scss'],
  providers: [FilterPipe]
})

export class MembersComponent implements OnInit {

  members: Member[];
  membersFiltered: Member[];
  bsModalRef: BsModalRef;
  openFilterMenu: boolean;

  constructor(
    private _membersService: MembersService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private filter: FilterPipe
  ) { }

  ngOnInit() {
    this.getMembers();
    this.openFilterMenu = false;
  }

  getMembers() {
    this._membersService.getMembers().subscribe(
      members => {
        this.members = members;
        this.membersFiltered = this.members;
      }
    );
  }

  addMember(): void {
    const initialState = {
      member: null,
      title: 'Añadir socio'
    };
    this.bsModalRef = this.modalService.show(MembersDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.modalService.onHide.subscribe(data => {
      this.getMembers();
    });
  }

  editMember(member: Member) {
    const initialState = {
      member: member,
      title: 'Editar socio'
    };
    this.bsModalRef = this.modalService.show(MembersDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.bsModalRef.content.member = member;
    this.modalService.onHide.subscribe(data => {
      this.getMembers();
    });
  }

  deleteMember(member: Member) {
    const initialState = {
      title: 'Eliminar socio',
      content: '¿Está seguro que desea borrar a este socio? Se eliminará permanentemente del sistema'
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.modalService.onHide.subscribe(useless => {
      if (this.bsModalRef.content.borrar) {
        this._membersService.deleteMember(member.id_socio).subscribe(data => {
          if (data) {
            if (data.affectedRows > 0) {
              this.toastr.success('El socio ha sido eliminado correctamente');
              this.getMembers();
            } else {
              this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
            }
          }
        });
      }
    });
  }

  openFilter() {
   if (this.openFilterMenu) {
     this.openFilterMenu = false;
   } else {
    this.openFilterMenu = true;
   }
  }

  closeFilter() {
    this.openFilterMenu = false;
  }

  onChangeFilter(event) {
    this.membersFiltered = this.filter.transform(
      this.members,
      event.target.value.toLowerCase()
    );
  }

}
