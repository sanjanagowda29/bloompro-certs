import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { CertificationFormComponent } from './components/certification-form/certification-form.component';
import { CertificationListComponent } from './components/certification-list/certification-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { MemberManagementComponent } from './components/member-management/member-management.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { memberGuard } from './guards/member.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
  path: 'admin',
  component: AdminDashboardComponent,
  canActivate: [authGuard, adminGuard]
},

{
  path: 'member',
  component: MemberDashboardComponent,
  canActivate: [authGuard, memberGuard]
},

{
  path: 'members',
  component: MemberManagementComponent,
  canActivate: [authGuard, adminGuard]
},

{
  path: 'certification-form',
  component: CertificationFormComponent,
  canActivate: [authGuard, adminGuard]
},

{
  path: 'certifications',
  component: CertificationListComponent,
  canActivate: [authGuard, adminGuard]
},

{
  path: 'statistics',
  component: StatisticsComponent,
  canActivate: [authGuard, adminGuard]
},

{
path:'profile',
component:ProfileComponent
}


];