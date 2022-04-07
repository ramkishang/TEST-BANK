import { Injectable } from "@angular/core";

const USER_KEY = 'auth-user';
const IS_ADMIN ='is-admin';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() { }
  
    signOut(): void {
      window.sessionStorage.clear();
    }
    public saveUser(user: any): void {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    public saveUserRole(role: any){
      window.sessionStorage.setItem(IS_ADMIN,role);
    }
    public getUserRole(): any {
      const role = window.sessionStorage.getItem(IS_ADMIN);
      return role;
    }
    public getUser(): any {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
      return user;
    }
}
  