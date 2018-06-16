import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  moduleId: module.id,
  templateUrl: 'contact.component.html',
  styleUrls: [
    'contact.component.scss'
  ]
})

export class ContactComponent {

  contactForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _contactService: ContactService
  ) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: [, [<any>Validators.required]],
      email: [, [<any>Validators.required, <any>Validators.email]],
      body: [, [<any>Validators.required]],
    });
  }

  sendContactForm() {
    this._contactService.sendContactForm(this.contactForm.value).subscribe(
      response => {
        if (response.success) {
          this.toastr.success('Pronto nos pondremos en contacto contigo.');
          this.submitted = true;
        } else {
          this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
        }
      }
    );
  }
}
