import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const LOGIN_API = `${environment.loginApiUrl}auth-services/`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  currentUserLogin: Subject<any> = new Subject();
  constructor(private http: HttpClient, private router: Router) {
    this.currentUser = localStorage.getItem("authToken");
  }

  // Login User
  login(loginDetail: any) {
    return this.http.post(LOGIN_API + "login", loginDetail).pipe();
  }
  //User logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.currentUserLogin.unsubscribe();
  }

  // get token
  getToken() {
    return localStorage.getItem('authToken');
  }

   // for set local storage value
  setLocalStorage(storageKey: any, storageValue: any) {
    localStorage.setItem(storageKey, storageValue);
  }
}
