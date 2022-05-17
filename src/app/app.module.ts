import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { UnidadesComponent } from './pages/unidades/unidades.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroUnidComponent } from './components/cadastro-unid/cadastro-unid.component';

const ROUTES:Route[] = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'unidades',
    children:[
      {
        path:'',
        component:UnidadesComponent
      },
      {
        path:'cadastro-unidades',
        component:CadastroUnidComponent
      }
    ]
  },
  {
    path:'cadastro',
    component:CadastroComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    UnidadesComponent,
    CadastroComponent,
    CadastroUnidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
