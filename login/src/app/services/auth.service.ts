import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  currentUser:BehaviorSubject<any> = new BehaviorSubject(null);
  baseServeUrl = 'https://localhost:44308/api/User';
  jwtHelperService = new JwtHelperService(); 

  registerUser(user:Array<string>)
  {
    return this.http.post(this.baseServeUrl + '/CreateUser',
    {
      FirstName:user[0],
      LastName:user[1],
      Email:user[2],
      Mobile:user[3],
      Gender:user[4],
      Pwd:user[5]
    },{
      responseType : 'text',
    });
  }

  loginUser(loginInfo:Array<string>)
  {
    return this.http.post(
      this.baseServeUrl +'/Loginuser',{
        Email:loginInfo[0],
        Pwd:loginInfo[1],
      },
      {
        responseType : 'text',
      }
    )
  }

  setToken(token:string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }

  removeToken()
  {
    localStorage.removeItem("access_token");
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      id:userInfo.id,
      firstname:userInfo.firstname,
      lastname:userInfo.lastname,
      email:userInfo.email,
      mobile:userInfo.mobile,
      gender:userInfo.gender
    } : null;
    this.currentUser.next(data);
    //console.log(userInfo);
  }

  isLoggedin():boolean{
    return localStorage.getItem("access_token") ? true:false;
  }
}
