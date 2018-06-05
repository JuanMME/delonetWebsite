import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";
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

  private classForm: FormGroup;
  private submitted: Boolean;
  classe: Class;
  data: any;
  profilePhoto: String;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  cropperSettings: CropperSettings;

  private horaClase: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();
  mstep = 10;
  valid = true;

  private monitors: Monitor[];

  constructor(
    private classService: ClassService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private monitorsService: MonitorService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.noFileInput = true;

    this.data = {};

    if (this.horaClase.getHours() < 9) {
      this.horaClase.setHours(9);
    }
  }

  ngOnInit() {
    this.createForm();
    this.setMinMaxTime();
  }

  getMonitors(){
    this.monitorsService.getMonitors().subscribe(data => {
      this.monitors = data;
    });
  }

  createClass() {
    this.submitted = true;
    this.classService.createClases(this.classForm.value).subscribe(data => {
      if (data && data["affectedRows"] > 0) {
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
    this.classService
      .modifyClass(this.classe.id_clase, this.classForm.value)
      .subscribe(data => {
        if (data && data["affectedRows"] > 0) {
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
    if (!event || this.horaClase.getHours() < 9 || this.horaClase.getHours() > 21 ) {
      this.valid = false;
    } else {
      this.valid = event;
    }
  }

  setMinMaxTime() {
    this.minTime.setHours(9);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(21);
    this.maxTime.setMinutes(0);
  }
}
