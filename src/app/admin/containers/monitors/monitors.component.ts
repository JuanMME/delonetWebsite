import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';
import { MonitorService } from '../../monitor.service';
import { Monitor } from '../../models/monitor';
import { MonitorsDialogComponent } from '../../components/monitors-dialog/monitors-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss'],
  providers: [FilterPipe]
})
export class MonitorsComponent implements OnInit {
  monitorsFiltered: Monitor[];
  monitors: Monitor[];
  bsModalRef: BsModalRef;
  openFilterMenu: boolean;


  constructor(
    private monitorsService: MonitorService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private filter: FilterPipe
  ) { }

  ngOnInit() {
    this.getMonitors();
  }

  getMonitors() {
    this.monitorsService.getMonitors().subscribe(
      monitors => {
        this.monitors = monitors;
        this.monitorsFiltered = this.monitors;
      }
    );
  }

  addMonitor(): void {
    const initialState = {
      monitor: null,
      title: 'Añadir monitor'
    };
    this.bsModalRef = this.modalService.show(MonitorsDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getMonitors();
    });
  }

  editMonitor(monitor: Monitor) {
    const initialState = {
      monitor: monitor,
      title: 'Editar monitor'
    };
    this.bsModalRef = this.modalService.show(MonitorsDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getMonitors();
    });
  }

  deleteMonitor(monitor: Monitor) {
    const initialState = {
      title: 'Eliminar monitor',
      content: '¿Está seguro que desea borrar a este monitor? Se eliminará permanentemente del sistema',
    };
    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Cerrar';
    this.modalService.onHide.subscribe(useless => {
      if (this.bsModalRef.content.borrar) {
        this.monitorsService.deleteMonitor(monitor.id_monitor).subscribe(data => {
          if (data && data['affectedRows'] > 0) {
            this.toastr.success('El monitor ha sido eliminado correctamente');
            this.getMonitors();
          } else {
            this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
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
     this.monitorsFiltered = this.filter.transform(
       this.monitors,
       event.target.value.toLowerCase()
     );
   }

}
