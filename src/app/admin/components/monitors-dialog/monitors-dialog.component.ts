import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BsModalRef } from "ngx-bootstrap";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";
import { Monitor } from "../../models/monitor";
import { MonitorService } from "../../monitor.service";

@Component({
  selector: 'app-monitors-dialog',
  templateUrl: './monitors-dialog.component.html',
  styleUrls: ['./monitors-dialog.component.scss']
})
export class MonitorsDialogComponent implements OnInit {
  private monitorForm: FormGroup;
  private submitted: Boolean;
  monitor: Monitor;
  data: any;
  profilePhoto: String;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  cropperSettings: CropperSettings;

  constructor(
    private monitorService: MonitorService,
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

  createMonitor() {
    this.submitted = true;
    this.monitorService.createMonitor(this.monitorForm.value).subscribe(data => {
      if (data && data["affectedRows"] > 0) {
        this.toastr.success(
          "Operación realizada con éxito",
          "El monitor ha sido añadido"
        );
      } else {
        this.toastr.error(
          "Algo ha fallado en la operación",
          "Inténtelo más tarde"
        );
      }
    });
  }

  modifyMonitor() {
    this.monitorService
      .modifyMonitor(this.monitor.id_monitor, this.monitorForm.value)
      .subscribe(data => {
        if (data && data["affectedRows"] > 0) {
          this.toastr.success(
            "Operación realizada con éxito",
            "El monitor ha sido modificado"
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
    if (this.monitor) {
      this.monitorForm = this.fb.group({
        nombre: [this.monitor.nombre, [<any>Validators.required]],
        apellidos: [this.monitor.apellidos, [<any>Validators.required]],
        direccion: [this.monitor.direccion, [<any>Validators.required]],
        telefono: [this.monitor.telefono, [<any>Validators.required]],
        email: [this.monitor.email, [<any>Validators.required]],
        profile_image: [this.monitor.profile_image]
      });
      if (this.monitor.profile_image && this.monitor.profile_image.length) {
        this.data.image = this.monitor.profile_image;
        this.profilePhoto = this.data.image;
      }
    } else {
      this.monitorForm = this.fb.group({
        nombre: ['', [<any>Validators.required]],
        apellidos: ['', [<any>Validators.required]],
        direccion: ['', [<any>Validators.required]],
        telefono: ['', [<any>Validators.required]],
        email: ['', [<any>Validators.required]],
        profile_image: ['']
      });
    }
  }

  confirmPhoto() {
    this.profilePhoto = this.data.image;
    this.monitorForm.controls['profile_image'].patchValue(this.profilePhoto);
  }

  deleteImage() {
    this.profilePhoto = null;
    this.data.image = null;
    this.data = {};
    this.monitorForm.controls['profile_image'].patchValue('');
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

}
