import {Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SubjectsComponent} from "./subjects/subjects.component";
import {TestsComponent} from "./tests/tests.component";
import {TestComponent} from "./test/test.component";
import {ResultsComponent} from "./results/results.component";
import {RepeatComponent} from "./repeat/repeat.component";
import {HomeComponent} from "./home/home.component";
import {CreateTestComponent} from "./admin/create-test/create-test.component";
import {AddQuestionsComponent} from "./admin/add-questions/add-questions.component";
import {AdminComponent} from "./admin/admin.component";
import {AddSubjectComponent} from "./admin/add-subject/add-subject.component";
import {SubjectsListComponent} from "./admin/subjects-list/subjects-list.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tests/:subjectId',
    component: TestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test/:testId',
    component: TestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'repeat/:sessionId',
    component: RepeatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-test',
        component: CreateTestComponent,
      },
      {
        path: 'add-questions/:testId',
        component: AddQuestionsComponent,
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent,
      },
      {
        path: 'subjects',
        component: SubjectsListComponent,
      },
    ]
  },

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];
