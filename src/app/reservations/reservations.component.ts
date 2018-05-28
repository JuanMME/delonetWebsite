import { Component, TemplateRef, OnInit } from '@angular/core';
import { addHours, addDays } from 'date-fns';
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
  eventForm: FormGroup;
  viewDate: Date = new Date();
  submitted = false;

  locale = 'es';
  modalRef: BsModalRef;
  events = [{
    start: new Date('2018-05-28T16:00:00.000Z'),
    end: addHours('2018-05-28T16:00:00.000Z', 1),
    title: 'Aquagym',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
  }];

  events2 = [{
    start: new Date('2018-05-28T18:00:00.000Z'),
    end: addHours('2018-05-28T18:00:00.000Z', 1),
    title: 'Principiantes',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
  }];

  newEventModal = false;
  selectedEvent: CalendarEvent;
  eventGroups = new Array();
  eventDates = new Array();

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    // service
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getCalendarEvents();
  }

  getCalendarEvents() {
    /* this._adminService.getCalendarEvents().subscribe(events => {
      events.forEach((event) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
      });
      this.events = events;
      this.groupCalendarEvents();
    }); */
  }

  createForm() {
    this.eventForm = this.fb.group({
      title: [, [<any>Validators.required]],
      color: [{
        primary: '#ad2121',
        secondary: '#FAE3E3'
      }],
      start: [new Date(), [<any>Validators.required]],
      end: [addHours(new Date(), 1), [<any>Validators.required]]
    });
  }

  openNewEventModal(template: TemplateRef<any>): void {
    this.submitted = false;
    this.newEventModal = true;
    this.createForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  createEvent() {
    /* if (this.eventForm.valid) {
      this.submitted = true;
      this._adminService.createEvent(this.eventForm.value).subscribe( response => {
          const createResponse = response;
          if (createResponse.success === true) {
            this.toastr.success('Evento creado');
          } else {
            this.toastr.error('No se ha podido crear el evento, se ha producido un error');
          }
          this.getCalendarEvents(); // move inside the if when the db is implemented
        },
        error => this._adminService = <any>error
        );
    } else {
      this.toastr.error('Debe rellenar todos los campos');
    } */
  }

  openModifyEventModal(template: TemplateRef<any>, event): void {
    this.submitted = false;
    this.newEventModal = false;
    this.selectedEvent = event;
    this.createFilledForm();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  updateEvent() {
    /* if (this.eventForm.valid) {
      this.submitted = true;
      this._adminService.updateEvent(this.selectedEvent.id, this.eventForm.value).subscribe( response => {
          const createResponse = response;
          if (createResponse.success === true) {
            this.toastr.success('Evento actualizado');
          } else {
            this.toastr.error('No se ha podido actualizar el evento, se ha producido un error');
          }
          this.getCalendarEvents(); // move inside the if when the db is implemented
        },
        error => this._adminService = <any>error
        );
    } else {
      this.toastr.error('Debe rellenar todos los campos');
    }
    this.selectedEvent = <CalendarEvent>{}; */
  }

  createFilledForm () {
    this.eventForm = this.fb.group({
      title: [this.selectedEvent.title, [<any>Validators.required]],
      color: [this.selectedEvent.color],
      start: [this.selectedEvent.start, [<any>Validators.required]],
      end: [this.selectedEvent.end, [<any>Validators.required]]
    });
  }

  deleteEvent() {
    /* this._adminService.deleteEvent(this.selectedEvent.id).subscribe( response => {
      const createResponse = response;
          if (createResponse.success === true) {
            this.toastr.success('Evento actualizado');
          } else {
            this.toastr.error('No se ha podido actualizar el evento, se ha producido un error');
          }
          this.getCalendarEvents(); // move inside the if when the db is implemented
        },
        error => this._adminService = <any>error
    );
    this.selectedEvent = <CalendarEvent>{}; */
  }

}
