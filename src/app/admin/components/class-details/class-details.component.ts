import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../class.service';
import { Location } from '@angular/common';
import { MembersService } from '../../members.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassAddMemberComponent } from '../class-add-member/class-add-member.component';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../../models/member';
import { Class } from '../../models/class';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  id_clase;
  classe: Class[];
  my_messages = {
    'emptyMessage': '¡Esta clase no tiene aún socios apuntados!',
    'totalMessage': 'registros totales'
  };
  bsModalRef: BsModalRef;

  constructor(
    private ar: ActivatedRoute,
    private classService: ClassService,
    private membersService: MembersService,
    private location: Location,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.id_clase = this.ar.snapshot.params.id;
    if (this.id_clase) {
      this.getClasse();
    }
  }

  getClasse() {
    this.classService.getClassMembers(this.id_clase).subscribe(data => {
      this.classe = data;
    });
  }
  goBack() {
    this.location.back();
  }

  addMember() {
    const initialState = {
      id_clase: this.id_clase,
      members: this.classe.length,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(ClassAddMemberComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      if (this.bsModalRef.content.ok === true) {
        this.toastr.success('Operación completada con éxito');
      } else if (this.bsModalRef.content.ok === false) {
        this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
      }
      this.getClasse();
    });
  }

  deleteMember(member: Member) {
    member.id_clase = null;
    const initialState = {
      title: 'Eliminar clase',
      content: '¿Está seguro que desea borrar esta clase? Se eliminará permanentemente del sistema'
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.modalService.onHide.subscribe(useless => {
      if (this.bsModalRef.content.borrar) {
        this.membersService.modifyMember(member.id_socio, member).subscribe(data => {
          if (data) {
            if (data.affectedRows > 0) {
              this.toastr.success('El socio ya no está en esta clase');
            } else {
              this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
            }
          }
          this.getClasse();
        });
      }
    });
  }

}
