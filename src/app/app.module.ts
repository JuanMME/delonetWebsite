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
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CollapseModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './admin/containers/members/members.component';
import { ContactComponent } from './contact/contact.component';
import { MembersDialogComponent } from './admin/components/members-dialog/members-dialog.component';
import { MonitorsComponent } from './admin/containers/monitors/monitors.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { MonitorsDialogComponent } from './admin/components/monitors-dialog/monitors-dialog.component';
import { ClassDialogComponent } from './admin/components/class-dialog/class-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

import { MembersService } from './admin/members.service';
import { MonitorService } from './admin/monitor.service';
import { ClassComponent } from './admin/containers/class/class.component';
import { ClassService } from './admin/class.service';
import { ClassDetailsComponent } from './admin/components/class-details/class-details.component';
import { ClassAddMemberComponent } from './admin/components/class-add-member/class-add-member.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';


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
    ClassComponent,
    ClassDialogComponent,
    ConfirmDialogComponent,
    ClassDetailsComponent,
    ClassAddMemberComponent,
    LoginComponent
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
    TimepickerModule.forRoot(),
    AlertModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    MembersService,
    MonitorService,
    ClassService,
    LoginService,
    AuthGuardService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MembersDialogComponent,
    MonitorsDialogComponent,
    ClassDialogComponent,
    ConfirmDialogComponent,
    ClassAddMemberComponent]
})
export class AppModule { }
