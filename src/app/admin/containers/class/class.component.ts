import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../class.service';
import { Class } from '../../models/class';
import { ClassDialogComponent } from '../../components/class-dialog/class-dialog.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  private classes: Class[];
  private bsModalRef: BsModalRef;

  constructor(
    private classService: ClassService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.classService.getClasses().subscribe(
      classes => {
        this.classes = classes;
        console.log(classes);
      }
    );
  }

  addClass(): void {
    const initialState = {
      classe: null,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(ClassDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getClasses();
    });
  }

  editClass(classe: Class) {
    const initialState = {
      classe: classe,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(ClassDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getClasses();
    });
  }

  deleteClass(classe: Class) {
    this.classService.deleteClass(classe.id_clase).subscribe(data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('Operación realizada con éxito', 'La clase ha sido eliminada');
        this.getClasses();
      } else {
        this.toastr.error('Algo ha fallado en la operación', 'Inténtelo más tarde');
      }
    });
  }

}
