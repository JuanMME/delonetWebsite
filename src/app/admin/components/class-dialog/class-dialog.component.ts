import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";
import { Class } from "../../models/class";
import { ClassService } from "../../class.service";

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

  constructor(
    private classService: ClassService,
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService
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
  }

  ngOnInit() {
    this.createForm();
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

}
