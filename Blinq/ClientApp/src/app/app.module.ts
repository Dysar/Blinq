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
import { MonitorComponent } from './monitor/monitor.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { WorkersTableComponent, DialogOverviewExampleDialog } from './workers-table/workers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    StatisticsComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MonitorComponent,
    WorkersTableComponent,
    WorkersTableComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'monitoring', component : MonitorComponent},
      { path: 'statistics', component: StatisticsComponent },
      { path: 'workers', component: WorkersTableComponent },
      { path: 'sign_in', component: LoginComponent },
      { path: 'sign_up', component: RegisterComponent }
    ]),
    ReactiveFormsModule,
    LayoutModule,
    DemoMaterialModule,
    SocialLoginModule
  ],
  providers: [ChartsService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [
    AppComponent,
    WorkersTableComponent
  ],
  entryComponents: [WorkersTableComponent, DialogOverviewExampleDialog],
})
export class AppModule { }

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('890282323453-aviplqnubmcafg9bopqvn7tp3n614f88.apps.googleusercontent.com')
  }
]);
export function provideConfig() {
  return config;
}
