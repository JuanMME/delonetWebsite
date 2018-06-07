import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ClassService } from '../../class.service';
import { MembersService } from '../../members.service';
import { Member } from '../../models/member';

@Component({
  selector: 'app-class-add-member',
  templateUrl: './class-add-member.component.html',
  styleUrls: ['./class-add-member.component.scss']
})
export class ClassAddMemberComponent implements OnInit {

  id_clase;
  noMembers: Member[];

  constructor(
    public bsModalRef: BsModalRef,
    private classService: ClassService,
    private membersService: MembersService
  ) { }

  ngOnInit() {
    this.classService.getNotMembersInClass(this.id_clase).subscribe(data => {
      this.noMembers = data;
      this.noMembers.forEach(member => {
        Object.assign(member, {checked: false});
      });
    });
  }

  onChange(member) {
    if (member.checked) {
      member.checked = false;
    } else {
      member.checked = true;
    }
  }

  addAllMembersToClass() {
    let ok = false;
    this.noMembers.forEach(member => {
      if (member['checked'] === true) {
        member.id_clase = this.id_clase;
        this.membersService.modifyMember(member.id_socio, member).subscribe(data => {
          if (data) {
            this.bsModalRef.content.ok = true;
          } else {
            this.bsModalRef.content.ok = false;
          }
        });
      }
    });
  }

}
