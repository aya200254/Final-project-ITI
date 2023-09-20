import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  allUsers: any
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/allUsers')
  }

}
