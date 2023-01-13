import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './auth/guard/authorize.guard';
import { EditorComponent } from './components/editor/editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SelectMemeComponent } from './components/select-meme/select-meme.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthorizeGuard] },
  { path: 'select', component: SelectMemeComponent, canActivate: [AuthorizeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
