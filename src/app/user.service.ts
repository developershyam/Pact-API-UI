import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl= "http://localhost:9090/PactAPI-UI/api/";
  
  constructor(private http:HttpClient) { }


  public doRegistration(user){
    return this.http.post(this.baseUrl+"register",user,{responseType:'text' as 'json'});
  }

  public getUsers(){
    return this.http.get(this.baseUrl+"getAllUsers");
  }

  public getUserByEmail(email){
    return this.http.get(this.baseUrl+"findUser/"+email);
  }

  public deleteUser(id){
    return this.http.delete(this.baseUrl+"delete/"+id);
  }
}
