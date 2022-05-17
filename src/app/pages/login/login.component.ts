import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string = "";
  senha:string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  entrar(){
    this.router.navigate(['dashboard']);
  }

}
