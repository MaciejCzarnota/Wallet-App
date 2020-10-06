import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  userid: number;
  password: string;
  loggedIn: boolean;

  constructor() {
    this.setEverything();
  }

  setEverything(): void {
    if (sessionStorage.getItem('userid')) {
      this.userid = Number(sessionStorage.getItem('userid'));
      this.password = sessionStorage.getItem('password');
      this.loggedIn = true;
    }else {
      this.loggedIn = false;
    }
  }

  getLoggedIn(): boolean {
    return this.loggedIn;
  }

  getId(): number {
    return this.userid;
  }

  getPassword(): string {
    return this.password;
  }

  login(userid, password): void{
    sessionStorage.setItem('userid', userid);
    sessionStorage.setItem('password', password);
    this.setEverything();
  }

  logout(): void {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('password');
    this.userid = 0;
    this.password = '';
    this.loggedIn = false;
  }

}
