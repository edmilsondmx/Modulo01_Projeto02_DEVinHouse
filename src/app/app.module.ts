import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { UnidadesComponent } from './pages/unidades/unidades.component';
import { CadastroComponent } from './pages/cadastro-kw/cadastro.component';
import { CadastroUnidComponent } from './components/cadastro-unid/cadastro-unid.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { GraficoComponent } from './components/grafico/grafico.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditarUnidComponent } from './components/editar-unid/editar-unid.component';

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
      },
      {
        path:'editar-unidades',
        component:EditarUnidComponent
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
    CadastroUnidComponent,
    GraficoComponent,
    FooterComponent,
    EditarUnidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
