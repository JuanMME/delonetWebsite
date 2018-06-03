import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule, BsDatepickerModule, AlertModule } from 'ngx-bootstrap';

import { ReservationsComponent } from './reservations.component';

import { ReservationsService } from './reservations.service';

import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    CalendarModule.forRoot(),
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    DatePipe,
    ReservationsService
  ],
  declarations: [ ReservationsComponent ],
  exports: [ ReservationsComponent ]
})

export class ReservationsModule {}
