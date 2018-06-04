import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReservationsModule } from './reservations/reservations.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './admin/containers/members/members.component';
import { ContactComponent } from './contact/contact.component';
import { MembersDialogComponent } from './admin/components/members-dialog/members-dialog.component';
import { MonitorsComponent } from './admin/containers/monitors/monitors.component';

import { MembersService } from './admin/containers/members/members.service';
import { MonitorService } from './admin/monitor.service';
import { MonitorsDialogComponent } from './admin/components/monitors-dialog/monitors-dialog.component';
import { ClassComponent } from './admin/containers/class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MembersComponent,
    ContactComponent,
    MembersDialogComponent,
    ImageCropperComponent,
    MonitorsComponent,
    MonitorsDialogComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ReservationsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    MembersService,
    MonitorService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MembersDialogComponent, MonitorsDialogComponent]
})
export class AppModule { }
