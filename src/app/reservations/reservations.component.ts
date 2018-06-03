import { Component, TemplateRef, OnInit } from '@angular/core';
import { addHours, addDays, subDays, isSameHour } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { ReservationsService } from './reservations.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
defineLocale('es', esLocale);

@Component({
  selector: 'app-mycalendar',
  templateUrl: 'reservations.template.html',
  styleUrls: [
    'reservations.styles.scss'
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})

export class ReservationsComponent implements OnInit {
  reservationForm: FormGroup;
  viewDate: Date = new Date();
  submitted = false;
  classes;

  locale = 'es';
  laneEvents = new Array();
  minTime: Date = new Date();
  maxTime: Date = new Date();
  mstep = 60;
  valid = true;
  isAdmin = true;
  newReservation = false;
  alreadyBooked = false;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _reservationsService: ReservationsService,
    private localeService: BsLocaleService,
    private datePipe: DatePipe
  ) {
    this.createForm();
    this.setMinMaxTime();
    this.localeService.use(this.locale);
  }

  ngOnInit() {
    this.getReservations();
    this.getClasses();
  }

  setMinMaxTime() {
    this.minTime.setHours(15);
    this.minTime.setMinutes(59);
    this.maxTime.setHours(21);
    this.maxTime.setMinutes(0);
  }

  getReservations() {
    this._reservationsService.getReservations().subscribe(laneEvents => {
      laneEvents.forEach(lane => {
        lane.events.forEach(event => {
          event.title = event.nombre;
          event.start = new Date(event.fecha);
          event.end = addHours(new Date(event.fecha), 1);
          event.color = {
            primary: '#2F606E',
            secondary: '#377BB5'
          };
        });
      });
      this.laneEvents = laneEvents;
      console.log(laneEvents);
    });
  }

  setTime(event: any) {
    this._reservationsService.getClass(event).subscribe(clase => {
      const classTime = new Date();
      const hour = clase.hora.substring(0, 2);
      classTime.setHours(hour, 0, 0, 0);
      this.reservationForm.controls.time.setValue(classTime);
    });
  }

  getClasses() {
    this._reservationsService.getClasses().subscribe(classes => {
      this.classes = classes;
      console.log(classes);
    });
  }

  createForm() {
    const now = new Date();
    now.setHours(16, 0, 0, 0);
    this.reservationForm = this.fb.group({
      id_socio: [null],
      id_calle: [null, [<any>Validators.required]],
      id_clase: [, [<any>Validators.required]],
      date: [now, [<any>Validators.required]],
      time: [{value: now, disabled: this.isAdmin}],
      fecha: []
    });
  }

  isValid(event: boolean): void {
    this.valid = event;
    if (new Date(this.reservationForm.controls.time.value).getMinutes() !== 0) {
      this.valid = false;
    }
  }

  createReservation() {
    this.combineDates();
    if (this.reservationForm.valid && this.checkAvailability()) {
      this.submitted = true;
      this._reservationsService.createReservation(this.reservationForm.value).subscribe( response => {
        if (response.affectedRows === 1) {
          this.newReservation = true;
          this.getReservations();
        } else {
          this.newReservation = false;
        }
      });
    }
  }

  checkAvailability() {
    const calle = parseInt(this.reservationForm.controls.id_calle.value, 10) - 1;
    this.alreadyBooked = false;
    this.laneEvents[calle].events.forEach(event => {
      if (isSameDay(new Date(event.fecha), new Date(this.reservationForm.controls.date.value)) &&
          isSameHour(new Date(event.fecha), new Date(this.reservationForm.controls.time.value))) {
        this.alreadyBooked = true;
      }
    });
    console.log(this.alreadyBooked);
  }

  combineDates() {
    const date = new Date(this.reservationForm.controls.date.value);
    const time = new Date(this.reservationForm.controls.time.value);
    // reajusta la hora a la hora de guardarla
    date.setHours(time.getHours() - (time.getTimezoneOffset() / 60), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
    this.reservationForm.controls.fecha.setValue(date);
  }

  viewPreviousDay() {
    this.viewDate = subDays(this.viewDate, 1);
  }

  viewToday() {
    this.viewDate = new Date();
  }

  viewNextDay() {
    this.viewDate = addDays(this.viewDate, 1);
  }

}
