import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  token: any;
  constructor(public auth: AuthService, public router: Router) { }
 

  ngOnInit(): void {
    this.auth.currentUserLogin.subscribe((res: any) => {
      this.token = res.token;
    });
    this.assignLoginData();
  }
  
   /* User data set */
  assignLoginData(): void {
    this.token = localStorage.getItem('authToken');
  }

  /* User logout */
  logout() {
    this.auth.logout();
    this.token = null;
  }

  ngOnDestroy(): void {
   this.auth.currentUserLogin.unsubscribe();
  }
}
