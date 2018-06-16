import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: String;
  content: String;
  borrar: Boolean;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {  }

  accept() {
    this.borrar = true;
    this.bsModalRef.hide();
  }
}
