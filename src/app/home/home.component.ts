import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../admin/monitor.service';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: [
    'home.component.scss'
  ]
})

export class HomeComponent implements OnInit {

  instructors: any[];

  constructor(
    private _monitorService: MonitorService) {}

  ngOnInit() {
    this._monitorService.getMonitors().subscribe(
      instructors => {
        this.instructors = instructors;
        console.log(instructors);
      }
    );
  }

}
