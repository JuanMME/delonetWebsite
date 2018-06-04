import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MonitorService } from '../../monitor.service';
import { Monitor } from '../../models/monitor';
import { MonitorsDialogComponent } from '../../components/monitors-dialog/monitors-dialog.component';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.scss']
})
export class MonitorsComponent implements OnInit {
  private monitors: Monitor[];
  private bsModalRef: BsModalRef;

  constructor(
    private monitorsService: MonitorService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getMonitors();
  }

  getMonitors() {
    this.monitorsService.getMonitors().subscribe(
      monitors => {
        this.monitors = monitors;
      }
    );
  }
  
  addMonitor(): void {
    const initialState = {
      monitor: null,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(MonitorsDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getMonitors();
    });
  }

  editMonitor(monitor: Monitor) {
    const initialState = {
      monitor: monitor,
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(MonitorsDialogComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.modalService.onHide.subscribe(data => {
      this.getMonitors();
    });
  }

  deleteMonitor(monitor: Monitor) {
    this.monitorsService.deleteMonitor(monitor.id_monitor).subscribe(data => {
      if (data && data['affectedRows'] > 0) {
        this.toastr.success('Operación realizada con éxito', 'El monitor ha sido eliminado');
        this.getMonitors();
      } else {
        this.toastr.error('Algo ha fallado en la operación', 'Inténtelo más tarde');
      }
    });
  }

}
