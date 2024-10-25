import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AnadirTareaComponent } from './components/anadir-tarea/anadir-tarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TareasComponent } from './components/tareas/tareas.component';
import { TareaService } from 'src/servicios/tarea.service';
import { TareaComponent } from './components/tarea/tarea.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AnadirTareaComponent, TareasComponent, TareaComponent, RankingComponent, LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, TareaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
