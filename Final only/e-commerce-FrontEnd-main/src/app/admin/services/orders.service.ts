import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  allOrders: any
  orderItems: any
  constructor(private http: HttpClient) { }
  getAllOrders(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/orderDetails')
  }
  getAllOrdersItems():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/api/orderItems')
  }
}
