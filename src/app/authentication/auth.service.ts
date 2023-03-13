import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './User';
import { AuthRequest } from './AuthRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:1005/auth/register`,user);
  }

  login(user: AuthRequest): Observable<any>{
     return this.httpClient.post<any>(`http://localhost:1005/auth/login`, user);
  }

  getUserRole(username: string): Observable<any>{
    return this.httpClient.get<string>(`http://localhost:1005/auth/getRole/${username}`)
  }

  storeToken(token: string){
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token=='' || token == null){
      return false;
    }
    else{
      return true;
    }
  }

  loggedOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("localCart");
    location.reload();
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
