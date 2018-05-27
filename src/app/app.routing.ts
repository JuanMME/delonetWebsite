import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './admin/members/members.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'admin', component: MembersComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules }) // ,  {enableTracing: true} )
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
