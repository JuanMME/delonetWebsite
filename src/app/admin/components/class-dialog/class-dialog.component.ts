import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap";
import { Class } from "../../models/class";
import { ClassService } from "../../class.service";
import { MonitorService } from "../../monitor.service";
import { Monitor } from "../../models/monitor";

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent implements OnInit {

  classForm: FormGroup;
  submitted: boolean;
  classe: Class;
  profilePhoto: String;

  horaClase: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();
  mstep = 60;
  valid = true;
  horaEnPunto = true;

  monitors: Monitor[];
  optionsModel: number[];

  constructor(
    private classService: ClassService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private monitorsService: MonitorService
  ) {
    if (this.horaClase.getHours() < 16 || this.horaClase.getMinutes() > 0) {
      this.horaClase.setHours(16);
      this.horaClase.setMinutes(0);
    } else if (this.horaClase.getHours() > 21) {
      this.horaClase.setHours(21);
      this.horaClase.setMinutes(0);
    }
  }

  ngOnInit() {
    this.getMonitors();
    this.createForm();
    this.setMinMaxTime();
  }

  getMonitors(){
    this.monitorsService.getMonitors().subscribe(data => {
      this.monitors = data;
      this.monitors.forEach(monitor => {
        if (this.classe) {
          Object.assign(monitor, {checked: this.classe.monitores.indexOf(monitor.id_monitor.toString()) >= 0 ? true : false});
        } else {
          Object.assign(monitor, {checked: false});
        }
      });
    });
  }

  createClass() {
    this.submitted = true;
    const time = this.classForm.controls.hora.value;
    this.classForm.controls.hora.patchValue(time.getHours() + ':' + time.getMinutes());
    this.classService.createClases(this.classForm.value).subscribe(data => {
      if (data) {
        this.toastr.success(
          "Operación realizada con éxito",
          "La clase ha sido añadida"
        );
      } else {
        this.toastr.error(
          "Algo ha fallado en la operación",
          "Inténtelo más tarde"
        );
      }
    });
  }

  modifyClass() {
    this.submitted = true;
    const time = this.classForm.controls.hora.value;
    this.classForm.controls.hora.patchValue(time.getHours() + ':' + time.getMinutes());
    this.classService
      .modifyClass(this.classe.id_clase, this.classForm.value)
      .subscribe(data => {
        if (data) {
          this.toastr.success(
            "Operación realizada con éxito",
            "La clase ha sido modificada"
          );
        } else {
          this.toastr.error(
            "Algo ha fallado en la operación",
            "Inténtelo más tarde"
          );
        }
      });
  }

  createForm() {
    if (this.classe) {
      // Modificamos los valores de la hora para que se muestren en pantalla
      const time = this.classe.hora.split(':');
      this.horaClase.setHours(parseInt(time[0]));
      this.horaClase.setMinutes(parseInt(time[1]));
      this.horaClase.setSeconds(parseInt(time[2]));
      // Creamos el formulario
      this.classForm = this.fb.group({
        nombre: [this.classe.nombre, [<any>Validators.required]],
        dias: [this.classe.dias, [<any>Validators.required]],
        hora: [this.classe.hora, [<any>Validators.required]],
        monitores: [this.classe.monitores, [<any>Validators.required]],
        nivel: [this.classe.nivel, [<any>Validators.required]],
        num_plazas: [this.classe.num_plazas, [<any>Validators.required]],
        edad_maxima: [this.classe.edad_maxima, [<any>Validators.required]]
      });
    } else {
      this.classForm = this.fb.group({
        nombre: [, [<any>Validators.required]],
        dias: [, [<any>Validators.required]],
        hora: [, [<any>Validators.required]],
        monitores: [, [<any>Validators.required]],
        nivel: [, [<any>Validators.required]],
        num_plazas: [, [<any>Validators.required]],
        edad_maxima: [, [<any>Validators.required]]
      });
    }
  }

  isValid(event: boolean): void {
    this.valid = event;
    this.horaEnPunto = true;
    const date = new Date(this.classForm.controls.hora.value);
    if ( date.getHours() > 21) {
      this.valid = false;
    } else if (date.getHours() < 16) {
      this.valid = false;
    }
    if (new Date(this.classForm.controls.hora.value).getMinutes() !== 0) {
      this.horaEnPunto = false;
    }
  }

  setMinMaxTime() {
    this.minTime.setHours(15);
    this.minTime.setMinutes(59);
    this.maxTime.setHours(21);
    this.maxTime.setMinutes(0);
  }

  onChange(monitor) {
    let inputValue = '';
    if (this.classForm.controls.monitores.value) {
      inputValue = this.classForm.controls.monitores.value.toString();
    }
    if (monitor) {
      if (monitor.checked) {
        monitor.checked = false;
        if (inputValue.indexOf(',') >= 0) {
          this.classForm.controls.monitores.patchValue((inputValue.replace(',' + monitor.id_monitor, '')).replace(monitor.id_monitor, ''));
        } else {
          this.classForm.controls.monitores.patchValue('');
        }
      } else {
        monitor.checked = true;
        if (inputValue.length >= 1) {
          this.classForm.controls.monitores.patchValue(inputValue + ',' + monitor.id_monitor);
        } else {
          this.classForm.controls.monitores.patchValue(monitor.id_monitor); 
        }
      }
    }   
  }
}
