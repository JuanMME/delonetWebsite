import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MembersService } from "../../members.service";
import { BsModalRef } from "ngx-bootstrap";
import { Member } from "../../models/member";
import { ImageCropperComponent, CropperSettings } from "ng2-img-cropper";

@Component({
  selector: "app-members-dialog",
  templateUrl: "./members-dialog.component.html",
  styleUrls: ["./members-dialog.component.scss"]
})
export class MembersDialogComponent implements OnInit {
  private memberForm: FormGroup;
  private submitted: Boolean;
  member: Member;
  data: any;
  profilePhoto: String;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  cropperSettings: CropperSettings;

  constructor(
    private _membersService: MembersService,
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

  createMember() {
    this.submitted = true;
    this._membersService.createMember(this.memberForm.value).subscribe(data => {
      if (data && data["affectedRows"] > 0) {
        this.toastr.success(
          "Operación realizada con éxito",
          "El socio ha sido añadido"
        );
      } else {
        this.toastr.error(
          "Algo ha fallado en la operación",
          "Inténtelo más tarde"
        );
      }
    });
  }

  modifyMember() {
    this._membersService
      .modifyMember(this.member.id_socio, this.memberForm.value)
      .subscribe(data => {
        if (data && data["affectedRows"] > 0) {
          this.toastr.success(
            "Operación realizada con éxito",
            "El socio ha sido modificado"
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
    if (this.member) {
      this.memberForm = this.fb.group({
        nombre: [this.member.nombre, [<any>Validators.required]],
        apellidos: [this.member.apellidos, [<any>Validators.required]],
        direccion: [this.member.direccion, [<any>Validators.required]],
        fecha_alta: [this.member.fecha_alta, [<any>Validators.required]],
        fecha_baja: [this.member.fecha_baja, [<any>Validators.required]], // cambiar
        telefono: [this.member.telefono, [<any>Validators.required]],
        email: [this.member.email, [<any>Validators.required]],
        id_clase: [this.member.id_clase],
        profile_image: [this.member.profile_image]
      });
      if (this.member.profile_image && this.member.profile_image.length) {
        this.data.image = 'data:image/JPEG;base64,' + this.member.profile_image;
        this.profilePhoto = this.data.image;
      }
    } else {
      this.memberForm = this.fb.group({
        nombre: [, [<any>Validators.required]],
        apellidos: [, [<any>Validators.required]],
        direccion: [, [<any>Validators.required]],
        fecha_alta: [new Date(), [<any>Validators.required]],
        fecha_baja: [new Date(), [<any>Validators.required]], // cambiar
        telefono: [, [<any>Validators.required]],
        email: [, [<any>Validators.required]],
        id_clase: [null],
        profile_image: ['']
      });
    }
  }

  confirmPhoto() {
    this.profilePhoto = this.data.image;
    this.memberForm.controls['profile_image'].patchValue(this.profilePhoto);
    this.memberForm.markAsDirty();
  }

  deleteImage() {
    this.profilePhoto = null;
    this.data.image = null;
    this.data = {};
    this.memberForm.controls['profile_image'].patchValue('');
    this.memberForm.markAsDirty();
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
