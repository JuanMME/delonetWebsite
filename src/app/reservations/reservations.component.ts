import { Component, OnInit } from '@angular/core';
import { addHours, addDays, subDays, isSameHour } from 'date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReservationsService } from './reservations.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
import { ClassService } from '../admin/class.service';
defineLocale('es', esLocale);

@Component({
  selector: 'app-mycalendar',
  templateUrl: 'reservations.component.html',
  styleUrls: [
    'reservations.component.scss'
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
  isAdmin = false;
  newReservation = false;
  alreadyBooked = false;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _reservationsService: ReservationsService,
    private _classService: ClassService,
    private localeService: BsLocaleService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.checkIsAdmin();
    this.createForm();
    this.setMinMaxTime();
    this.localeService.use(this.locale);
  }

  ngOnInit() {
    this.getReservations();
    this.getClasses();
  }

  checkIsAdmin() {
    if (localStorage.getItem('instructor_id')) {
      this.isAdmin = true;
    }
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
    this._classService.getClass(event).subscribe(clase => {
      console.log(clase);
      const classTime = new Date();
      const hour = parseInt(clase.hora.substring(0, 2), 10);
      classTime.setHours(hour, 0, 0, 0);
      this.reservationForm.controls.time.setValue(classTime);
    });
  }

  getClasses() {
    this._classService.getClasses().subscribe(classes => {
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
      id_clase: [{value: null, disabled: !this.isAdmin}, [<any>Validators.required]],
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
    if (!this.isAdmin) {
      this.reservationForm.controls.id_socio.setValue(localStorage.getItem('member_id'));
      this.reservationForm.controls.id_clase.setValue(null);
    }
    console.log(this.reservationForm.value);
    if (this.reservationForm.valid && !this.isAlreadyBooked()) {
      this.submitted = true;
      this._reservationsService.createReservation(this.reservationForm.value).subscribe( response => {
        if (response.affectedRows === 1) {
          this.toastr.success('La reserva ha sido añadida correctamente');
          this.getReservations();
        } else {
          this.toastr.error('Algo ha salido mal. Inténtelo más tarde');
        }
      });
    }
  }

  isAlreadyBooked() {
    const calle = parseInt(this.reservationForm.controls.id_calle.value, 10) - 1;
    this.alreadyBooked = false;
    this.laneEvents[calle].events.forEach(event => {
      if (isSameDay(new Date(event.fecha), new Date(this.reservationForm.controls.date.value)) &&
          isSameHour(new Date(event.fecha), new Date(this.reservationForm.controls.time.value))) {
        this.alreadyBooked = true;
      }
    });
    if (this.alreadyBooked) {
      this.toastr.error('Ya hay una reserva realizada ese día para la calle y hora seleccionadas.', 'Error');
    }
    return this.alreadyBooked;
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
