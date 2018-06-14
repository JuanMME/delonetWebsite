import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './admin/containers/members/members.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MonitorsComponent } from './admin/containers/monitors/monitors.component';
import { ClassComponent } from './admin/containers/class/class.component';
import { ClassDetailsComponent } from './admin/components/class-details/class-details.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AdminAuthGuardService } from './shared/services/admin-auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'reservas', component: ReservationsComponent, canActivate: [AuthGuardService]},
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
            { path: 'admin/socios', component: MembersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/monitores', component: MonitorsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/clases', component: ClassComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'admin/clases/:id', component: ClassDetailsComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'contacto', component: ContactComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules }) // ,  {enableTracing: true} )
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
