import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnadirTareaComponent } from './components/anadir-tarea/anadir-tarea.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'anadir-tarea', component: AnadirTareaComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'home', component: HomeComponent },
  { path: 'edit-tarea/:id', component: TareaComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
