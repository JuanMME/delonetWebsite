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

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {

  id_clase;
  classe: Class;
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
    this.classService.getClasse(this.id_clase).subscribe(data => {
      this.classe = data;
    });
  }
  goBack() {
    this.location.back();
  }

  addMember() {
    const initialState = {
      id_clase: this.id_clase,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(ClassAddMemberComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      if (this.bsModalRef.content.ok === true) {
        this.toastr.success('Se han añadido correctamente todos los socios a esta clase', 'Operación completada con éxito');
      } else if (this.bsModalRef.content.ok === false) {
        this.toastr.error('Algo ha salido mal, inténtelo más tarde.', 'Error');
      }
      this.getClasse();
    });
  }

  deleteMember(member: Member) {
    member.id_clase = null;
    this.membersService.modifyMember(member.id_socio, member).subscribe(data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('El socio ya no está en esta clase', 'Operación realizada con éxito');
      } else {
        this.toastr.error('Inténtelo más tarde','Algo ha fallado en la operación');
      }
      this.getClasse();
    });
  }

}
