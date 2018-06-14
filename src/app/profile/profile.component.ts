import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile;
  form: FormGroup;
  data: any;
  profilePhoto: string;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private fb: FormBuilder
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
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      if (this.profile) {
        this.createForm();
      }
    });
  }

  getProfile() {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      id_monitor: [this.profile.id],
      id_socio: [this.profile.id],
      nombre: [this.profile.nombre, [<any>Validators.required]],
      apellidos: [this.profile.apellidos, [<any>Validators.required]],
      direccion: [this.profile.direccion, [<any>Validators.required]],
      telefono: [this.profile.telefono, [<any>Validators.required]],
      email: [this.profile.email, [<any>Validators.required]],
      profile_image: [this.profile.profile_image],
      password: [],
      _password: []
    });
    if (this.profile.profile_image) {
      this.data.image = 'data:image/JPEG;base64,' + this.profile.profile_image;
      this.profilePhoto = this.data.image;
    }
  }

  updateProfile() {
    const pass = this.form.controls.password.value;
    const _pass = this.form.controls._password.value;
    if (pass === _pass) {
      this.profileService.updateProfile(this.form.value, this.profile.id, this.profile.type).subscribe(data => {
        if (pass && _pass) {
          this.profileService.updatePassword(this.form.value, this.profile.id, this.profile.type).subscribe(passwordData => {
            console.log(passwordData);
            if (passwordData) {
              if (passwordData.affectedRows > 0) {
                this.toastr.success('Operación realizada con éxito');
              } else {
                this.toastr.error('Uups, algo ha salido mal. Inténtalo más tarde');
              }
            }
          });
        } else {
          if (data) {
            if (data.affectedRows > 0) {
              this.toastr.success('Operación realizada con éxito');
            } else {
              this.toastr.error('Uups, algo ha salido mal. Inténtalo más tarde');
            }
          }
          this.getProfile();
        }
      });
    } else {
      this.toastr.error('Introduce dos contraseña iguales');
      this.form.setErrors({ incorrect: true });
    }
  }

  confirmPhoto() {
    this.profilePhoto = this.data.image;
    this.form.controls['profile_image'].patchValue(this.profilePhoto);
    this.form.markAsDirty();
  }

  deleteImage() {
    this.profilePhoto = null;
    this.data.image = null;
    this.data = {};
    this.form.controls['profile_image'].patchValue('');
    this.form.markAsDirty();
  }

  /**
   * Modifica el valor del selector de archivos implementado por el
   * modulo de cropper por el valor que tiene nuestro input file
   * @param $event
   */
  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }


}
