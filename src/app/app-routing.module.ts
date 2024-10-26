import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnadirTareaComponent } from './components/anadir-tarea/anadir-tarea.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/auth.guard';
import { PenalizaziyuekComponent } from './components/penalizaziyuek/penalizaziyuek.component';
import { PenalizaziyoDanakComponent } from './components/penalizaziyo-danak/penalizaziyo-danak.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'anadir-tarea', component: AnadirTareaComponent , canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'tareas', component: TareasComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'edit-tarea/:id', component: TareaComponent , canActivate: [AuthGuard]},
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'penalizaziyuek', component: PenalizaziyoDanakComponent, canActivate: [AuthGuard] },
  { path: 'penalization', component: PenalizaziyuekComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
