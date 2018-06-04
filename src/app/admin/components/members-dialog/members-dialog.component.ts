import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../../containers/members/members.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Member } from '../../models/member';

@Component({
  selector: 'app-members-dialog',
  templateUrl: './members-dialog.component.html',
  styleUrls: ['./members-dialog.component.scss']
})
export class MembersDialogComponent implements OnInit {

  private memberForm: FormGroup;
  private submitted: Boolean;
  member: Member;

  constructor(
    private _membersService: MembersService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createMember() {
    this.submitted = true;
    this._membersService.createMember(this.memberForm.value).subscribe( data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('Operación realizada con éxito', 'El socio ha sido añadido');
      } else {
        this.toastr.error('Algo ha fallado en la operación', 'Inténtelo más tarde');
      }
    });
  }

  modifyMember() {
    this._membersService.modifyMember(this.member.id_socio, this.memberForm.value).subscribe(data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('Operación realizada con éxito', 'El socio ha sido modificado');
      } else {
        this.toastr.error('Algo ha fallado en la operación', 'Inténtelo más tarde');
      }
    });
  }
  
  createForm() {
    if (this.member) {
      this.memberForm = this.fb.group({
        nombre: [this.member.nombre, [<any>Validators.required]],
        apellidos: [this.member.apellidos, [<any>Validators.required]],
        direccion: [this.member.direccion, [<any>Validators.required]],
        fecha_alta: [this.member.fecha_alta, [<any>Validators.required]],
        fecha_baja: [this.member.fecha_baja, [<any>Validators.required]], // cambiar
        telefono: [this.member.telefono, [<any>Validators.required]],
        email: [this.member.email, [<any>Validators.required]],
        id_clase: [this.member.id_clase]
      });
    } else {
      this.memberForm = this.fb.group({
        nombre: [, [<any>Validators.required]],
        apellidos: [, [<any>Validators.required]],
        direccion: [, [<any>Validators.required]],
        fecha_alta: [new Date(), [<any>Validators.required]],
        fecha_baja: [new Date(), [<any>Validators.required]], // cambiar
        telefono: [, [<any>Validators.required]],
        email: [, [<any>Validators.required]],
        id_clase: [2]
      });
    }
    
  }
  
}
