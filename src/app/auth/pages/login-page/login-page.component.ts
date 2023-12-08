import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {

  constructor(private authS: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void{
    this.authS.login('pepita@gmail.com', '5666885').subscribe(user => {
      this.route.navigate(['/'])

    })
  }

}
