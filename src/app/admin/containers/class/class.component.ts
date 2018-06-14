import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../class.service';
import { Class } from '../../models/class';
import { ClassDialogComponent } from '../../components/class-dialog/class-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [FilterPipe]
})
export class ClassComponent implements OnInit {

  classesFiltered: Class[];
  classes: Class[];
  bsModalRef: BsModalRef;
  openFilterMenu: boolean;

  constructor(
    private classService: ClassService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
    private filter: FilterPipe
  ) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.classService.getClasses().subscribe(
      classes => {
        this.classes = classes;
        this.classesFiltered = this.classes;
      }
    );
  }

  addClass(): void {
    const initialState = {
      classe: null,
      title: 'Añadir clase'
    };
    this.bsModalRef = this.modalService.show(ClassDialogComponent, {initialState,  class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getClasses();
    });
  }

  editClass(classe: Class) {
    const initialState = {
      classe: classe,
      title: 'Editar clase'
    };
    this.bsModalRef = this.modalService.show(ClassDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getClasses();
    });
  }

  deleteClass(classe: Class) {
    const initialState = {
      title: 'Eliminar clase',
      content: '¿Está seguro que desea borrar esta clase? Se eliminará permanentemente del sistema'
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.modalService.onHide.subscribe(useless => {
      if (this.bsModalRef.content.borrar) {
        this.classService.deleteClass(classe.id_clase).subscribe(data => {
          if (data) {
            if (data.affectedRows > 0) {
              this.toastr.success('La clase ha sido eliminada correctamente');
              this.getClasses();
            } else {
              this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
            }
          }
        });
      }
    });
  }

  viewDetails(classe: Class) {
    this.router.navigate(['/admin/clases/' + classe.id_clase]);
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
     this.classesFiltered = this.filter.transform(
       this.classes,
       event.target.value.toLowerCase()
     );
   }
}
