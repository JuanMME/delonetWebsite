import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './admin/containers/members/members.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MonitorsComponent } from './admin/containers/monitors/monitors.component';
import { ClassComponent } from './admin/containers/class/class.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'reservas', component: ReservationsComponent},
            { path: 'admin/socios', component: MembersComponent },
            { path: 'admin/monitores', component: MonitorsComponent },
            { path: 'admin/clases', component: ClassComponent },
            { path: 'contacto', component: ContactComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules }) // ,  {enableTracing: true} )
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
