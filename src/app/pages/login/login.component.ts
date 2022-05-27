import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'pro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  visualizar:boolean = false;

  email:string = "";
  senha:string = "";

  constructor(
    private router:Router,
    private serviceTitle:Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Login');
  }

  entrar(){
    this.router.navigate(['dashboard']);
  }

  visualizarSenha(){
    let senha = document.getElementById('password')
    if(this.visualizar){
      senha?.setAttribute('type', 'password');
    }else{
      senha?.setAttribute('type', 'text');
    }
    this.visualizar = !this.visualizar;
  }
}
