import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ClassService } from '../../class.service';
import { MembersService } from '../../members.service';
import { Member } from '../../models/member';
import { Class } from '../../models/class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-class-add-member',
  templateUrl: './class-add-member.component.html',
  styleUrls: ['./class-add-member.component.scss']
})
export class ClassAddMemberComponent implements OnInit {

  id_clase;
  classe: Class;
  noMembers: Member[];
  membersToAdd: number;
  members: number; // Num de socios que están apuntados

  constructor(
    public bsModalRef: BsModalRef,
    private classService: ClassService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this.membersToAdd = 0;
  }

  ngOnInit() {
    this.classService.getNotMembersInClass(this.id_clase).subscribe(data => {
      this.noMembers = data;
      this.noMembers.forEach(member => {
        Object.assign(member, {checked: false});
      });
    });
    this.membersToAdd = this.members;
    this.getClass();
  }

  getClass() {
    this.classService.getClass(this.id_clase).subscribe(data => {
      this.classe = data;
      if (this.classe.num_plazas === this.membersToAdd || this.members >= this.classe.num_plazas) {
        this.toastr.info('Esta clase no tiene más plazas disponibles');
      }
    });
  }

  onChange(member) {
      if (member.checked) {
        member.checked = false;
        this.membersToAdd--;
      } else {
        member.checked = true;
        this.membersToAdd++;
        if (this.classe.num_plazas === this.membersToAdd) {
          this.toastr.info('Esta clase no tiene más plazas disponibles');
        }
      }
  }

  addAllMembersToClass() {
    let error: boolean;
    this.noMembers.forEach(member => {
      if (member['checked'] === true) {
        member.id_clase = this.id_clase;
        this.membersService.modifyMember(member.id_socio, member).subscribe(data => {
          if (!data) {
            error = true;
          }
        });
      }
    });
    if (error) {
      this.bsModalRef.content.ok = false;
    } else {
      this.bsModalRef.content.ok = true;
    }
  }

}
