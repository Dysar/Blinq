import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsService } from './charts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';
import { LayoutModule } from '@angular/cdk/layout';
import { StatisticsComponent } from './statistics/statistics.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GolangDatatableComponent } from './golang-datatable/golang-datatable.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StatisticsComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    GolangDatatableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'monitoring', component : GolangDatatableComponent},
      { path: 'statistics', component: StatisticsComponent },
      { path: 'sign_in', component: LoginComponent },
      { path: 'sign_up', component: RegisterComponent }
    ]),
    ReactiveFormsModule,
    LayoutModule,
    DemoMaterialModule,
  ],
  providers: [ChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
